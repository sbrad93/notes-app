import axios from 'axios';
import { useLayoutEffect, useRef, useState } from 'react';
import { RichEditor, RichToolbar, actions, defaultActions } from "react-native-pell-rich-editor";
import { StyleSheet, Keyboard, Share, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { IconButton, Button, Snackbar, TextInput } from 'react-native-paper';

export default function EditorScreen ({ route, navigation }) {
  const editor = useRef();
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState(route.params && route.params.note ? route.params.note.attributes.title : '');
  const [content, setContent] = useState(route.params && route.params.note ? route.params.note.attributes.content : '');

  const saveNote = () => {
    const titleStr = title.trim();
    const contentStr = content.trim();
    if (!titleStr.length) {
      setMessage('Please title your note.');
      return;
    } else if (!contentStr.length) {
      setMessage('Your note has no content');
      return;
    }

    axios({
      method: route.params && route.params.note ? 'PUT' : 'POST',
      url: '/api/notes' + (route.params && route.params.note ? '/' + route.params.note.id : ''),
      data: {
        data: {
          title,
          content,
          date: Date.now()
        }
      }
    }).then(() => {
      setMessage('Saved!');
      editor.current.blurContentEditor();
      Keyboard.dismiss();
      console.log(content);
    })
    .catch((e) => {
      console.error(e);
      setMessage('An error occurred, please try again later.')
    });
  }

  const deleteNote = () => {
    axios.delete('/api/notes/' + route.params.note.id)
      .then(() => {
      navigation.goBack();
      })
      .catch((e) => {
        console.error(e);
        setMessage('An error occurred, please try again later.');
      });
  }

  const share = async () => {
    try {
        const result = await Share.share({
          // shares current title/content without saving
          // remove html tags and convert <br> to newline
          message: title.replace(/<[^>]+>/g, '') + '\n\n' + content.replace(/<br\s*[\/]?>/gi, "\n").replace(/<[^>]+>/g, ''),
        });
        if (result.action === Share.sharedAction) {
          console.log("shared");
          setMessage('Shared!');
        } else if (result.action === Share.dismissedAction) {
          console.log("share dismissed");
        }
      } catch (error) {
        console.log(error.message);
      }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#89cff0',
      },
      headerRight: route.params && route.params.note ? () => (
        <IconButton icon='delete' onPress={deleteNote}/>
      ) : () => (<></>),
      headerTitle: content.length == 0 ? 'New Note' : 'Edit Note',
    });
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: 'white'
    },
    title: {
      marginTop: 16,
      marginBottom: 10,
      margin: 10,
      backgroundColor: 'white'
    },
    editor: {
      backgroundColor: 'white',
      flex: 1, 
      minHeight: 500,
      margin: 7,
      marginTop: 0
    },
    editorTools: {
      backgroundColor: 'white'
    },
    btn: {
      marginTop: 0,
      marginBottom: 5,
      margin: 30,
      borderColor: '#89cff0',
      borderRadius: 10,
    },
  });

  return (
    <View style={styles.container}>
      <TextInput label="Title" 
                  value={title} 
                  onChangeText={setTitle} 
                  mode="outlined" 
                  style={styles.title}
                  theme={{ colors: { placeholder: 'gray', 
                                      text: 'black', 
                                      primary: '#89cff0', 
                                      underlineColor:'transparent'}}}/>
      <RichToolbar editor={editor}
                   selectedIconTint={"black"}
                   style={styles.editorTools}
                   actions={[
                      ...defaultActions,
                      actions.setStrikethrough,
                   ]}/>
      <ScrollView keyboardDismissMode='interactive'>
        <KeyboardAvoidingView behavior={"padding"}>
            <RichEditor
              ref={editor} 
              onChange={setContent}
              initialContentHTML={content} 
              style={styles.editor}
              initialFocus={true}
              placeholder='Start typing...'/>
        </KeyboardAvoidingView>
      </ScrollView>
      <Button onPress={saveNote} 
                          style={styles.btn}
                          mode="contained" 
                          color="#89cff0">
                    Save
      </Button>
      <Button onPress={async () => {await share()}} 
                          style={[styles.btn, { marginBottom: 40 }]}
                          mode="outlined" 
                          color="#89cff0">
                    Share
      </Button>
      <Snackbar visible={message.length > 0} onDismiss={() => setMessage('')}>{message}</Snackbar>
    </View>
  )
}