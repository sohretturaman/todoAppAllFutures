import {StyleSheet, Text, View, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({navigation, ...props}) => {
 

  const handleToggleSwitch = () => {
    setSwitchDark(previousTheme => !previousTheme);  
  };

  return (
    <View
      style={{
        backgroundColor:theme.colors.background,
        flex: 1,
        padding: 16,
      }}>
      <Switch value={switchDark} onValueChange={handleToggleSwitch} />
      <Text style={{color: theme.colors.inverseSurface, marginTop: 16}}>
        Use Dark Theme
      </Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
