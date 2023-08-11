import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import firebase from "@react-native-firebase/app";
import { GiftedChat } from 'react-native-gifted-chat'
import { Button } from "react-native-paper";


const Chat = () => {
  const route = useRoute();
  const [messages,setMessages] =useState([])
  const [userName,setUserName] =useState('');
  const [userId,setUserId]=useState(''); 

console.log('data from chat list',route.params.chatId);


useEffect(() => {
  firebase.auth().onAuthStateChanged(user => {
    setUserName(user?.displayName ?? '');
    setUserId(user?.uid); 
    
    console.log('my user is here', user);
    
  });

 
}, []);
useEffect(()=>{
  firebase.firestore().doc('chats/'+route.params.chatId)
  .onSnapshot((onSnapshot)=>{
    console.log('chat data',onSnapshot.data());
     setMessages(onSnapshot.data()?.messages);
  })
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
    <View style={{flex:1,backgroundColor:'red'}}>
      <Text>Chat</Text>
      <Text style={{fontSize:60,color:'black'}}>heey </Text>
   
       <Button onPress={()=>{}}> get user to chat</Button>
       <GiftedChat
      messages={messages}
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
