import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Avatar, Divider, FAB, List} from 'react-native-paper';

import {PaperProvider, Button, Dialog, Portal} from 'react-native-paper';
import {useState} from 'react';
import firebase from '@react-native-firebase/app';
import {useNavigation} from '@react-navigation/native';
import database, {getDatabase, get} from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import {set} from 'date-fns';

function ChatList() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [frgnEmail, setFrgnEmail] = useState('');
  const [myEmail, setMyEmail] = useState('');
  const [myUser, setMyUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [chatListData, setChatListData] = useState([]);

  {/** 
   const HandleCreateChat = async () => {
    if (!myEmail || !frgnEmail) return;

    setIsLoading(true);
    const createChat = await firebase
      .firestore()
      .collection('chats')
      .add({
        users: [myEmail, frgnEmail],
        messages: [],
      })
      .then(query => {
        console.log('looking for id', query.id ?? 'there is no id');
        setFrgnEmail('');
        setIsLoading(false);
        setVisible(false);
      })
      .catch(err => {
        console.log('error exist while saving id', err.message);
        setIsLoading(false);
      });

    console.log('after crating chat', createChat);
  };
*/}
  

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setMyEmail(user?.email ?? '');
      setMyUser(user);
      // console.log('my user is here', user.email);
    });
  }, []);

  useEffect(() => {
    // beacuse of Query , when you create a new user there is no chat at the beginning
    try {
      firestore()
        .collection('chats')
        .where('users', 'array-contains', myEmail)
        .onSnapshot(onSnapShotData => {
          const data = onSnapShotData.docs;
          setChatListData(data);
          // console.log('data id',data.map((chat)=>chat.id));
          console.log('data here for chatlistdata', data);
        });
    } catch (error) {
      console.log('error', error);
    }
  }, [myEmail]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        {chatListData?.map((chat, index) => (
          <React.Fragment key={index}>
            <List.Item
              title={chat.data().users.filter(x => x !== myEmail)}
              description={chat.data().messages[0]?.text}
              left={() => (
                <Avatar.Text
                  size={50}
                  style={{marginLeft: 5}}
                  label={chat
                    .data()
                    .users.find(x => x !== myEmail)
                    .split(' ')
                    .reduce((prev, current) => prev + current[0], '')}
                />
              )}
              onPress={() => navigation.navigate('Chat', {chatId: chat.id})}
            />
            <Divider style={{backgroundColor: 'white', padding: 2}} />
          </React.Fragment>
        ))}

        {/**chat list , dialog componnet react  native paper 
        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Title>Text by Email</Dialog.Title>
            <Dialog.Content>
              <TextInput
                placeholder="write a user name to make a chat"
                value={frgnEmail}
                onChangeText={value => setFrgnEmail(value)}
                style={{borderColor: 'black', borderWidth: 0.5}}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setVisible(false)}>Cancel</Button>
              <Button onPress={HandleCreateChat} loading={isLoading}>
                done
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        */}
      </View>

      {/**FAB button for  creating new dialog */}
      <FAB
        icon="plus"
        style={{position: 'absolute', bottom: 16, right: 16}}
        onPress={() => navigation.navigate('SearchUser')}
      />
    </SafeAreaView>
  );
}

export default ChatList;

const styles = StyleSheet.create({});
