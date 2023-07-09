import {StyleSheet, Text, View, Switch,Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../components/redux/action/Actions';
import { firebase } from '@react-native-firebase/auth';

const Settings = ({navigation, ...props}) => {
 const [switchDark,setSwitchDark] =useState(false); 
 const [user,setUser] =useState('');
 const dispatch = useDispatch(); 
  const theme =useTheme();
  const currentTheme = useSelector(selector =>selector.changeTheme) //false default value
  console.log('theme selector value',currentTheme);
  
  const handleToggleSwitch = (value) => {
    console.log('value of switch',value);
     setSwitchDark(currentTheme); 
      dispatch(changeTheme(!currentTheme))
    
      
  };

  useEffect(()=>{
    firebase.auth().onAuthStateChanged((userData)=>{
      setUser(userData?.email? userData.email:'');
      
    })
  },[])

const handleSignout= ()=>{
 AsyncStorage.removeItem("user")
  .then(() => {
   firebase.auth()
    .signOut()
    .then(() => {
    navigation.navigate("Auth");
 
    })
    .catch(error => {
     Alert.alert("Logout Error FB");
    });
  })
  .catch(error => {
   Alert.alert("Logout Error Storage");
  });
}
 
  return (
    <View
      style={{
        backgroundColor:theme.colors.primary,
        flex: 1,
        padding: 16,
      }}>
      <Switch  value={currentTheme} onValueChange={(val)=>handleToggleSwitch(val)} />
      <Text style={{color: theme.colors.text, marginTop: 16}}>
        Use Dark Theme
      </Text>
      <Text>you are welcome {user}</Text>
      <Button title='got to login' onPress={()=>navigation.navigate('Login')} />
      <Button title='Sign Out' onPress={handleSignout} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
