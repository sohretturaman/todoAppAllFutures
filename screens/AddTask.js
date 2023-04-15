import React, { useState } from 'react'
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native'
import { KeyboardAvoidingView, TextInput, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, Text, View, Keyboard } from 'react-native'
import Moment from 'moment'


//in this code block especially touchablewithoutfeedback is important for customer usage
const AddTask = ({navigation, ...props }) => {
  
  const [task,setTask] =useState('');

  handleButton=()=>{
    Moment.locale('EN'); 
   // let d = new Date()
    let formattedDate =  Moment().format('YYYY-MM-DD h:mma')
  
    if(disc.trim().length !== 0){
      props.handleNotes(title,disc,formattedDate);
      navigation.navigate('Note')   
    }else{
      Alert.alert('please write something')
    }
 

  }
  const CreateBox=()=>{
    Keyboard.dismiss()
     console.log('create boxpressed');
     
  }
  return (
    <View style={{height:'20%'}}>
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
          <View style={{ justifyContent: 'space-between' }}> 
            <View style={styles.input}>
            <TextInput style={{fontSize: 20,  height: 250,textAlignVertical:'top'}} placeholder='write a  task ...'
             placeholderTextColor={'grey'}
              multiline={true}
              value={task}
              onChangeText={(value) => setTask(value)}
              onSubmitEditing={()=>CreateBox()}
              allowFontScaling={false}
            />
            </View>

           
            <TouchableOpacity style={styles.buttonWrapper} onPress={()=>{CreateBox()}}>
              <Text style={styles.text}>Add</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>

  )
}

export default AddTask;

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