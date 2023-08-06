import {StyleSheet, Text, TextInput, View, SafeAreaView, FlatList,TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Avatar, Divider, FAB, List} from 'react-native-paper';

import {PaperProvider, Button, Dialog, Portal} from 'react-native-paper';
import {useState} from 'react';
import Firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import  database ,{getDatabase,get}from '@react-native-firebase/database';


function ChatList() {
  const navigation = useNavigation(); 
  const [visible, setVisible] = useState(false);
  const [frgnEmail, setFrgnEmail] = useState('');
  const [myEmail, setMyEmail] = useState('');
  const [myUser,setMyUser]=useState([]);
  const [isLoading,setIsLoading]=useState(false)

  const [chatListData, setChatListData] = useState();
  const[newChatLoading,setNewChatLoading]=useState(false); 


  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);



  const HandleCreateChat =  () => {
    if (!myEmail || !frgnEmail) return;
   const myColluctor =  createNewUser(frgnEmail); 
   console.log('here teh colluctor',myColluctor.userName);
  
   
   if(myColluctor.userName !== myEmail){
   const newChatRoom= database()
    .ref('chatrooms/')
    .push({
      firstUser: myEmail,
      secondUser:frgnEmail,
      messages:[]
    })
    .then((data) => console.log('Data set.',data));
   
    const chatRoomKey = newChatRoom.key;
    console.log('here is the key',chatRoomKey);
    

   }
 
         
   
  };

 const handleNewChatRoom=()=>{
 
  const myColluctor =  createNewUser(frgnEmail); 
  console.log('here the colluctor',myColluctor.userName);
 
  
  if(myColluctor.userName !== myEmail){
  const newChatRoom= database()
   .ref('chatrooms/')
   .push({
     firstUser: myEmail,
     secondUser:frgnEmail,
     messages:[]
   })
   .then((data) => console.log('Data seted.',data));
  
   const chatRoomKey = newChatRoom.key;
   console.log('here is the key',chatRoomKey);
   

  }
 
 }


  const createNewUser=(newCollocutor)=>{
  
   
      setIsLoading(true); 
      const newContent = [{
        userName:newCollocutor,
        profile:'https://i.pravatar.cc/300',
        friends:[]
  
      }]
    
      database().ref('users/').push(newContent); 
      setIsLoading(false);
       setVisible(false);
       setFrgnEmail('');

   
    return newContent;
  }


  const findUser = (frgnUserame)=>{
    console.log('myuser ',myEmail);
    
    try {
       database().ref(`users/`).on('value',snapshot=>{
        console.log('here is the snapshor from user list',snapshot.val());
        
       })
   
    } catch (error) {
       console.log('new eror',error);
       
    } 
   
  }




  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setMyEmail(user?.email ?? '');
      setMyUser(user); 
     // console.log('my user is here', user.email);
      
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
 



  
 





  
  return (
    <SafeAreaView style={{flex:1}}>
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
   
 

  
         <TouchableOpacity onPress={findUser }>
          <Text style={{marginTop:20 , color:'red',fontSize:40}}> here it is </Text>
         </TouchableOpacity>
     
        


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
