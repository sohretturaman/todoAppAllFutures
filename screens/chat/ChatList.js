import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { List } from 'react-native-paper';
const ChatList = () => {
  return (
    <View>
        <List.Item
    title="First Item"
    description="Item description"
    left={props => <List.Icon {...props} icon="folder" />}
  />
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({});
