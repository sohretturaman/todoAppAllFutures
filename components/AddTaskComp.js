import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const AddTaskComp = ({onPress}) => {
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={onPress} style={styles.iconWrapper}>
      <Text style={{fontSize:32,color:'white',fontWeight:'300',alignSelf:'center',alignItems:'center'}}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTaskComp;

const styles = StyleSheet.create({
  iconContainer: {
    paddingHorizontal:5,
    position: 'absolute',
    marginTop: Dimensions.get('window').height / 1.32,
    alignSelf: 'flex-end',
    marginRight:20,
    justifyContent: 'center',
    alignItems:'center',
    alignContent:'center',
   

    
  },
  iconWrapper: {
    backgroundColor: '#454545',
    width:50,
    height:50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius:50,
    borderColor:'#7E0CF5',
    borderWidth:0.2,
    elevation:5,
    shadowRadius:40,
    shadowColor:'#7E0CF5',
    shadowOffset:{height:2,width:2},
    marginRight:9
   
  
    
  },
});

{/**
       <TextInput style={{backgroundColor:'yellow', 
         marginHorizontal: 5,
        padding:8,
         borderRadius: 22,
         justifyContent: 'center',
         fontSize:25,
         alignItems:'center',
         flex:1
      }}
          placeholder="+"
          placeholderTextColor={'black'}
          textAlign='center'
          contextMenuHidden={false}
          maxLength={0}
          onSubmitEditing={Keyboard.dismiss}
        /> */}