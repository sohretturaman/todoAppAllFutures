import { StyleSheet, Text, View,TouchableOpacity } from "react-native";
import React from "react";

const colors={
  blue:'#6495ed',
  green:'#ffc0cb'
}

const AuthButton = ({title='',onPress,isLoading}) => {
  return (
    <View style={styles.container}>
          <TouchableOpacity onPress={onPress} style={styles.buttonWrapper}  isLoading={isLoading}>
             <Text style={styles.text}>{isLoading ? 'loading':title}</Text>
          </TouchableOpacity>
    </View>
  );
};

export default AuthButton

const styles = StyleSheet.create({
  container:{
    backgroundColor:'blue',
    width:'90%',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    margin:5,
    height:40,
    
        
   
  },

  buttonWrapper:{
    backgroundColor:colors.blue,
    height:'100%',
    width:'100%',
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    padding:5,
    
    
 
    
  },
  text:{
    fontSize:20,
    color:'white',
    opacity:1
  }
});
