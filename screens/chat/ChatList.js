import {StyleSheet, Text, TextInput, View, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {Avatar, Divider, FAB, List} from 'react-native-paper';

import {PaperProvider, Button, Dialog, Portal} from 'react-native-paper';
import {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import Firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

function ChatList() {
  const navigation = useNavigation(); 
  const [visible, setVisible] = useState(false);
  const [frgnEmail, setFrgnEmail] = useState('');
  const [myEmail, setMyEmail] = useState('');
  const [chatListData, setChatListData] = useState([]);
  const[newChatLoading,setNewChatLoading]=useState(false); 

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const HandleCreateChat = async () => {
    // console.log('my data',myEmail);
    // console.log('*******************');
    // console.log('and second data',frgnEmail);
    try {
      if (frgnEmail && myEmail) {
        setNewChatLoading(true); 
       const result = await Firestore()
          .collection('chats')
          .add({users: [myEmail, frgnEmail]});
        setVisible(false);
         navigation.navigate('Chat',{resultId:result.id})
         console.log('result id', result);
         
      }
    } catch (error) {
      console.log('error', error);
    }
    setFrgnEmail('');
    setNewChatLoading(false); 
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setMyEmail(user?.email ?? '');
    });
  
  }, []);


  useEffect(()=>{
   firebase
    .firestore()
    .collection('chats')
    .where('users', 'array-contains', myEmail)
    .onSnapshot(onSnapShotData => {
      setChatListData(onSnapShotData.docs);
    });
  },[myEmail])



 // console.log('data ',chatListData.map((x)=>x.data().users));
  
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View>
          {chatListData?.map((item,index) => {
            return (
              <View key={index}>
                <List.Item
                  title={item.data().users.filter(x=>x!==myEmail)}
                  description="Item description"
                  left={()=><Avatar.Text  size={50}  style={{marginLeft:5}} label={item.data().users.find(x=> x!==myEmail).split(' ').reduce((prev,current)=>prev+current[0],'')} />}
               
               onPress={()=>navigation.navigate('Chat',{chatId:item.id})}/>
                <Divider
                  
                  style={{backgroundColor: 'white', padding:2}}
                />
              </View>
            );
          })}

          {/**chat list , dialog componnet react  native paper */}
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
                <Button onPress={hideDialog}>Cancel</Button>
                <Button onPress={HandleCreateChat} >done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </ScrollView>

      {/**FAB button for  creating new dialog */}
      <FAB
        icon="plus"
        style={{position: 'absolute', bottom: 16, right: 16}}
        onPress={showDialog}
      />
    </SafeAreaView>
  );
}

export default ChatList;

const styles = StyleSheet.create({});
