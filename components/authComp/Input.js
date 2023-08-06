import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

function Input({onChangeText, value, placeholder, isSecure, title}) {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 15, color: 'black', paddingLeft:10,paddingBottom:5}}>
        {title}
      </Text>
      <View style={styles.inputWrapper}>
        <TextInput
        autoCapitalize='none'
          placeholder={placeholder}
          secureTextEntry={isSecure}
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
        />
      </View>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    paddingHorizontal: 20,
  },
  inputWrapper: {
  borderRadius:10
  },
  input: {
    backgroundColor: '#e0e0e0',
    height: 40,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderRadius:10,
  
  },
});
