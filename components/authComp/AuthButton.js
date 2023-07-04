import { StyleSheet, Text, View,TouchableOpacity } from "react-native";
import React from "react";



const AuthButton = ({title='here'}) => {
  return (
    <View>
          <TouchableOpacity>
             <Text> {title}</Text>
             
          </TouchableOpacity>
    </View>
  );
};

export default AuthButton

const styles = StyleSheet.create({});
