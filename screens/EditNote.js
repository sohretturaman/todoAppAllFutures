import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import {
    KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, TouchableOpacity,
    TextInput, Platform, Keyboard

} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';



const EditNote = ({route,navigation, ...props }) => {
    const {item,index}=route.params;
    const [editNote,setEditNote] = useState(item.title,item.disc);

    const hadleEditNote= async()=>{
       let editedNotes = [...props.notes];
       editedNotes[index]=editNote;
       //props.setNotes(editedNotes);

     await AsyncStorage.setItem('savedNotes',JSON.stringify(editedNotes)).then(()=>{
        props.setNotes(editedNotes)
     }).catch((err)=>console.log(err))
        
       navigation.navigate('Note');
    }
    
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.editContainer}>
                        <TextInput placeholder='write a note...' 
                        style={styles.input}multiline={true}
                         placeholderTextColor={'black'} 
                         value={editNote.toString()} 
                         onChangeText={(text)=>setEditNote(text)}
                         />
                        <TouchableOpacity style={styles.buttonWrapper} onPress={()=>hadleEditNote()}>
                            <Text style={styles.text}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default EditNote

const styles = StyleSheet.create({
    editContainer: {
        justifyContent: 'space-between'
    },
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