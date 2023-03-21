import React, { useState } from 'react'
import { SafeAreaView, TextInput } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NoteComp from '../components/NoteComp';
import { styles } from './styles'

const Note = ({ navigation, ...props }) => {
  //console.log(props.note, 'in note screen')

  const handleDelete = (index) => {
    let newArray = [...props.notes];
    let trashedArray = newArray.splice(index, 1);
    console.log('new note  items ', newArray[0], newArray[1], newArray[2])
    props.setNotes(newArray);
    props.setMoveToTrash(trashedArray)

    //  console.log('trashed', trashedArray[0])
    let newTrash = [trashedArray, ...props.moveToTrash];
    props.setMoveToTrash(newTrash);
  }
  return (
    <SafeAreaView>

      {/*  header buttons */}
      <View style={styles.headerWrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Your Notes...</Text>
          <Text style={styles.total}>Total :{props.notes.length} </Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('DeletedNote')}>
            <Icon name='delete' size={25} color='white' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => { navigation.navigate('AddNote') }}>
            <Icon name='plus' size={28} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
      {/*input search container */}
      <View style={styles.serachContainer}>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.serachInput} placeholder='search a note...' placeholderTextColor={'black'} />
          <TouchableOpacity style={{ paddingHorizontal: 5 }}>
            <Icon name='note-search-outline' size={25} color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainer}>

          <TouchableOpacity style={styles.iconWrapper}>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 500 }}>clear </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* body  for note screen    <Text>{props.notes[0]}</Text>*/}
      <View>
      <ScrollView style={{ marginTop: 10 }}>
        {props.notes.length === 0 ?
          (
            <View style={{ justifyContent: 'center', margin: 10, width: '70%', alignItems: 'center', }}>
              <Text style={{ fontSize: 20, color: 'blue' }}>noting to show yet Press plus icon to add a new note ..</Text>
            </View>

          ) :
          props.notes.map((item, index) => {
            return (
           
                <View key={index} style={{ justifyContent: 'center', alignItems: 'center', }}>

                  <View style={styles.noteContainer}>
                    <View style={styles.notePartWrapper} >
                      <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">{index + 1}.{item} </Text>
                      <TouchableOpacity style={styles.buttonText} onPress={() => handleDelete(index)}>
                        <Text style={{ fontSize: 14, color: 'white', fontWeight: 500 }} >X</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.notePartWrapper} >
                      <Text style={{ fontSize: 14, color: 'gray', fontWeight: 500, flex: 1, margin: 2 }}>Created at : {props.date}  </Text>
                      <TouchableOpacity style={styles.buttonText2}>
                        <Text style={{ fontSize: 15, color: 'black' }} > Edit </Text>
                      </TouchableOpacity>
                    </View>

                  </View>

                </View>
           
            )

          })}
          </ScrollView>
      </View>



    </SafeAreaView>
  )
}

export default Note;

