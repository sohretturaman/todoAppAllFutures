import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const Profile = () => {
    const route=useRoute();
    const {username}=route.params;
    console.log('profile data',username);
    
    // note handle set Error on login and signup screen
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
