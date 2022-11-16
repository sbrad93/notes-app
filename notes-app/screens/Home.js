import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Caption, List, Snackbar } from "react-native-paper";
import { IconButton } from 'react-native-paper';

export default function HomeScreen ({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes()
    const load = navigation.addListener('focus', () => {
      loadNotes();
    });
    return load;
  }, [])

  const loadNotes = () => {
    axios.get('/api/notes')
      .then(({ data }) => {
        setNotes(data.data);
        setLoading(false);
      }).catch((e) => {
        console.error(e);
        setMessage('An error occurred, please try again later.');
        setLoading(false);
      });
  }

  return (
    <View>
      {!loading && !notes.length && <Caption style={{textAlign: 'center', marginTop: 20}}>Press the + to create a note</Caption>}
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <List.Item 
            key={item.id}
            title={item.attributes.title}
            description={new Date(item.attributes.date).toDateString()}
            right={props => <IconButton icon='chevron-right'/>}
            onPress={() => navigation.navigate('NoteEditor', {
                note: item
            })}/>
        )}      
        refreshing={loading}
        onRefresh={loadNotes}
        style={{width: '100%', height: '100%'}}/>
      <Snackbar visible={message.length > 0} onDismiss={() => setMessage('')}>{message}</Snackbar>
    </View>
  )
}