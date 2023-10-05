import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Account = () => {
    const navigation = useNavigation(); 
  return (
    <View>
      <Text>Account</Text>
      <Button onPress={()=>navigation.navigate('Profile')}>Go to profile</Button>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
