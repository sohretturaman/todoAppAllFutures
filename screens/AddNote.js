import React, { useState } from 'react'
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native'
import { KeyboardAvoidingView, TextInput, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, Text, View, Keyboard } from 'react-native'
import Moment from 'moment'


//in this code block especially touchablewithoutfeedback is important for customer usage
const AddNote = ({navigation, ...props }) => {
  
  const [title,setTitle]=useState('');
  const [disc,setDisc]=useState('');

  handleButton=()=>{
    Moment.locale('EN'); 
   // let d = new Date()
    let formattedDate =  Moment().format('YYYY-MM-DD h:mma')
  
    if(title.trim().length!==0 && disc.trim().length !== 0){
      props.handleNotes(title,disc,formattedDate);
      navigation.navigate('Note')   
    }else{
      Alert.alert('please write something')
    }
 

  }
  return (
    <View>
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
          <View style={{ justifyContent: 'space-between' }}> 
            <View style={styles.input}>
            <TextInput style={{fontSize:20,borderBottomColor:'black',borderBottomWidth:0.2,paddingBottom:5,}} placeholder='title' placeholderTextColor={'black'}
              multiline={false}
              maxLength={40}
              value={title}
              onChangeText={(value) => setTitle(value)}
            />
            <TextInput style={{fontSize: 20,  height: 250,textAlignVertical:'top'}} placeholder='write a note ...' placeholderTextColor={'black'}
              multiline={true}
              value={disc}
              onChangeText={(value) => setDisc(value)}
            />
            </View>

           
            <TouchableOpacity style={styles.buttonWrapper} onPress={()=>{handleButton()}}>
              <Text style={styles.text}>Add</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>

  )
}

export default AddNote

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderColor: 'blue',
    borderWidth: 3,
    margin: 15,
    textAlignVertical:'top',
    height: 300,
    width: '90%',
    paddingHorizontal: 10,
  },
  buttonWrapper: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginHorizontal: 15,
    marginVertical: 10,
    width: 100,
    backgroundColor: 'blue',


  },
  text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 500
  }
})