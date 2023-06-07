import {StyleSheet, Text, View, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../components/redux/action/Actions';

const Settings = ({navigation, ...props}) => {
 const [switchDark,setSwitchDark] =useState(false); 
 const dispatch = useDispatch(); 
  const theme =useTheme();
  const currentTheme = useSelector(selector =>selector.changeTheme) //false default value
  console.log('theme selector value',currentTheme);
  
  const handleToggleSwitch = (value) => {
    console.log('value of switch',value);
     setSwitchDark(currentTheme); 
      dispatch(changeTheme(!currentTheme))
    
      
  };

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
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
