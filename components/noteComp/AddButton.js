import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const AddButton = ({onPress}) => {
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity style={styles.iconWrapper} onPress={onPress}>
        <Icon name="plus" size={30} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  iconContainer: {
    marginHorizontal: 2,
    paddingHorizontal:10 ,
    position: 'absolute',
    marginTop: Dimensions.get('window').height / 1.32,
    alignSelf: 'flex-end',
   
    
  },
  iconWrapper: {
    marginHorizontal: 5,
    backgroundColor: '#7E0CF5',
    padding: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems:'center',
    elevation:1,
    shadowColor:'#7E0CF5',
    shadowOffset:{height:2,width:2},
  
  },
});
