import React from 'react'
import { TouchableOpacity } from 'react-native'
import { KeyboardAvoidingView, TextInput, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, Text, View, Keyboard } from 'react-native'


//in this code block especially touchablewithoutfeedback is important for customer usage
const AddNote = ({ ...props }) => {
  return (
    <View>
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
          <View style={{ justifyContent: 'space-between' }}>
            <TextInput style={styles.input} placeholder='write a note ...' placeholderTextColor={'black'}
              multiline={true}
              value={props.note}
              onChangeText={(value) => props.setNote(value)}
            />
            <TouchableOpacity style={styles.buttonWrapper} onPress={props.handleAddButton}>
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
    fontSize: 20,
    height: 300,
    width: '90%',
    paddingBottom: 240,
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