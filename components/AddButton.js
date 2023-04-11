import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const AddButton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => {
          navigation.navigate('AddNote');
        }}>
        <Icon name="plus" size={30} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  iconContainer: {
    marginHorizontal: 2,
    padding: 10,
    position: 'absolute',
    marginTop: Dimensions.get('window').height / 1.31,
    alignSelf: 'flex-end',

  },
  iconWrapper: {
    marginHorizontal: 5,
    backgroundColor: '#7E0CF5',
    padding: 8,
    borderRadius: 22,
    justifyContent: 'center',
  },
});
