import axios from "axios";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';
import EditorScreen from './screens/NoteEditor';
import HomeScreen from './screens/Home';

// use machine's IP
// <IP>:1337
axios.defaults.baseURL = 'http://192.168.1.186:1337';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="My Notes" 
                      component={HomeScreen} 
                      options={({navigation}) => ({
                        headerRight: () => (
                          <IconButton icon='plus' onPress={() => navigation.navigate('NoteEditor')} />
                        ),
                        headerStyle: {
                          backgroundColor: '#89cff0'
                        },
                      })} />
        <Stack.Screen name="NoteEditor" 
                      component={EditorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}