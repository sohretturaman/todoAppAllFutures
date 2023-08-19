import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import firebase from "@react-native-firebase/app";
import { GiftedChat } from 'react-native-gifted-chat'
import { Avatar, Button } from "react-native-paper";


const Chat = () => {
  const route = useRoute();
  const [messages,setMessages] =useState([])
  const [userName,setUserName] =useState('');
  const [userId,setUserId]=useState(''); 




useEffect(() => {
  firebase.auth().onAuthStateChanged(user => {
    setUserName(user?.displayName ?? '');
    setUserId(user?.uid);  
   // console.log('my user is here', user);
    
  });

 
}, []);
useEffect(()=>{
  try {
    firebase.firestore().doc('chats/'+route.params.chatId)
    .onSnapshot((onSnapshot)=>{
    //  console.log('chat data',onSnapshot.data());
       setMessages(onSnapshot.data()?.messages);
    })
  } catch (error) {
     console.warn('error exist in chat',error)
     
  }
 
},[])


const onSend=(mes=[])=>{
 firebase.firestore()
 .doc('chats/'+route.params.chatId)
 .set({
  messages:GiftedChat.append(messages,mes)
 },
 {
  merge:true
 })
 
}

  return (
    <View style={{flex:1,backgroundColor:'white'}}>   
      <View style={{position: 'absolute', top: 16, left: 16}}>
        <Avatar.Icon size={24} icon="folder" />
        </View>
       
       <GiftedChat
      messages={messages.map((item)=>({...item,createdAt:item.createdAt?.toDate()}))}
      onSend={message => onSend(message)}
      user={{
        _id: userId,
        name:userName
      }}
    />
     
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
