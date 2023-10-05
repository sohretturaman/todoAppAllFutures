import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const Profiles = () => {
    const route=useRoute();
    const {username}=route.params;
    console.log(' foreign profile data',username);
    
    // note handle set Error on login and signup screen
  return (
    <View>
      <Text>Profiles are here for foreigners </Text>
    </View>
  );
};

export default Profiles;

const styles = StyleSheet.create({});
