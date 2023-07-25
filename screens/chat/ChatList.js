import {StyleSheet, Text, TextInput, View,SafeAreaView} from 'react-native';
import React from 'react';
import {Avatar, Divider, FAB, List} from 'react-native-paper';

import {PaperProvider, Button, Dialog, Portal} from 'react-native-paper';
import {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import Firestore from '@react-native-firebase/firestore'



function ChatList  () {
  const [visible, setVisible] = useState(false);
  const [frgnEmail,setFrgnEmail]=useState('sohrett@gmail.com');
  const [myEmail,setMyEmail]=useState(''); 

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const HandleCreateChat =()=>{
    Firestore().collection('chats').add({users:['firstemail@gmail.com','second@gmail.com']})
    setVisible(false);
  }
  return (
    <SafeAreaView style={{flex:1}}> 
      <ScrollView >
        <View>

          <List.Item
            title="First Item"
            description="Item description"
            left={props => (
              <List.Icon {...props} icon="folder" />
            )}
          />
          <Divider
            leftInset={40}
            style={{backgroundColor: 'white', padding: 5}}
          />

          <List.Item
            title="First Item"
            description="Item description"
            left={props => <List.Icon {...props} icon="folder" />}
          />
       
    
          {/**chat list , dialog componnet react  native paper */}
          <Button onPress={showDialog}>Show Dialog</Button>
          <Portal>
            <Dialog visible={visible} onDismiss={() => setVisible(false)}>
              <Dialog.Title>Text by Email</Dialog.Title>
              <Dialog.Content>
                  <TextInput  placeholder='write a user name to make a chat' value={frgnEmail} onChangeText={(value)=>setFrgnEmail(value)}/>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Cancel</Button>
                <Button onPress={HandleCreateChat}>done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

          
         
        </View>
        </ScrollView>

      {/**FAB button for  creating new dialog */}
      <FAB
            icon="plus"
            style={{position: 'absolute', bottom: 16, right: 16}}
            onPress={() => console.log('Pressed')}
          />
              
      </SafeAreaView>
  );
};

export default ChatList;

const styles = StyleSheet.create({});
