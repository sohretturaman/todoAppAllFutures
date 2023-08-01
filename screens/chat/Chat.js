import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/firestore";
import { GiftedChat } from 'react-native-gifted-chat'


const Chat = () => {
  const route = useRoute();
  const [messages,setMessages] =useState([])
  const [userMail,setUserMail] =useState('');
  const [userId,setUserId]=useState(''); 

console.log('data from chat list',route.params);


const onSend=()=>{}
  
  
  return (
    <View>
      <Text>Chat</Text>
      <Text style={{fontSize:60,color:'black'}}>heey </Text>
      {/**
       *  <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: userId,
        name:userMail
      }}
      placeholder="write a message "
    />
    <GiftedChat/>
       */}
     
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
