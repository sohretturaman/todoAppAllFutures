import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const TaskComp = ({EditTask}) => {
  return (
    <TouchableOpacity onPress={EditTask} >
      <View>
        <Text>TaskComp</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TaskComp;

const styles = StyleSheet.create({});
