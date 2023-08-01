import {StyleSheet, Text, TextInput, View, SafeAreaView, FlatList} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Avatar, Divider, FAB, List} from 'react-native-paper';

import {PaperProvider, Button, Dialog, Portal} from 'react-native-paper';
import {useState} from 'react';
import Firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

function ChatList() {
  const navigation = useNavigation(); 
  const [visible, setVisible] = useState(false);
  const [frgnEmail, setFrgnEmail] = useState('');
  const [myEmail, setMyEmail] = useState('');
  const [myUser,setMyUser]=useState([]);

  const [chatListData, setChatListData] = useState();
  const[newChatLoading,setNewChatLoading]=useState(false); 


  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const HandleCreateChat =  () => {
    if (!myEmail || !frgnEmail) return;
      const savedUsers=  Firestore()
          .collection('chats')
          .add({users: [myEmail, frgnEmail]});
       
         navigation.navigate('Chat')
         setVisible(false);
         setFrgnEmail('');
          
         console.log('data  after creation',savedUsers);
         
  };




  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setMyEmail(user?.email ?? '');
      setMyUser(user); 
   //   console.log('my user is here', user);
      
    });
   
  }, []);


{/**
 useEffect(()=>{
    firebase
    .firestore()
    .collection('chats')
    .where('users', 'array-contains', myEmail)
    .onSnapshot(onSnapShotData => {
      setChatListData(onSnapShotData.docs);
    });
    console.log('**** useEffect worked my data in chatlist',chatListData.map((x)=>x.data().users));
 
  
  },[myEmail]) //Creates an infinite loop */}
 


  const getUsers =  ()=> {
    let users = []; 
   Firestore().collection('chats')
  .where('users','array-contains',myEmail)
  .onSnapshot((snapshot)=>{
      users = snapshot.docs.map((mapVal)=>{
      const   data = mapVal.data(); 
     
      console.log('data from map ',data);
      setChatListData(users);
      return data ; 
    })
     console.log('users',users);
    
  
     
  })
    
  setChatListData(users);
  console.log('data from users what ',users);
  
  }
  
  useEffect(()=>{
    getUsers()

  },[])
  




  
console.log('my data ', chatListData);

  
  return (
    <SafeAreaView style={{flex: 1}}>
   
        <View>


   {/**
    * {chatListData.map((chat,index)=>(
            <React.Fragment key={index}>
               <List.Item
                  title={chat.data().users.filter(x=>x!==myEmail)}
                  description="Item description"
                  left={()=><Avatar.Text  size={50}  style={{marginLeft:5}} label={chat.data().users.find(x=> x!==myEmail).split(' ').reduce((prev,current)=>prev+current[0],'')} />}
               
               onPress={()=>navigation.navigate('Chat',{chatId:chat.id})}/>
                <Divider
                  
                  style={{backgroundColor: 'white', padding:2}}
                />
            </React.Fragment>
          ))}
    
    * 
    */}
   
 
 <FlatList  data={chatListData} keyExtractor={(item)=>item.id}
  renderItem={(item)=>(
  
  <View>
    <Text> hey data {item}</Text>
  </View>
 )}/>
  
         
     
        


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
                <Button onPress={HandleCreateChat} newChatLoading={newChatLoading}  >done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
     

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
