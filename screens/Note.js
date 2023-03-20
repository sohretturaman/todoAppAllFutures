import React, { useState } from 'react'
import { SafeAreaView, TextInput } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NoteComp from '../components/NoteComp';


const Note = ({ navigation, ...props }) => {
  console.log(props.note, 'in note screen')
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
        {props.notes.map((item, index) => {
          return (
            <View key={index}>
              <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'row'}} >
                  <Text>{index}</Text>
                  <Text>{item} </Text>
                </View>
                <TouchableOpacity>
                  <Text>X</Text>
                </TouchableOpacity>
              </View>

            </View>
          )

        })}
      </View>


    </SafeAreaView>
  )
}

export default Note;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 90,
    padding: 5,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'blue',
    borderBottomWidth: 3.5,
    paddingBottom: -10,
    paddingTop: 10,



  },
  iconWrapper: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 22,
    justifyContent: 'center',
    marginHorizontal: 5

  },
  iconContainer: {
    flexDirection: 'row',
    marginHorizontal: 3,
    justifyContent: 'center'
  },
  title: {
    fontSize: 25, color: 'blue',
    marginHorizontal: 5,
    fontWeight: 700

  },
  titleWrapper: {
    marginTop: -5,
    padding: 5,

  },
  total: {
    fontSize: 15,
    margin: 5,
    color: 'blue',
    fontWeight: 500
  },
  serachInput: {
    fontSize: 18
  },
  inputWrapper: {
    width: '70%',
    marginBottom: -5,
    marginHorizontal: 5,
    borderRadius: 10,
    borderColor: 'black',
    borderBottomWidth: 2,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'

  },
  serachContainer: {
    flexDirection: 'row',
    padding: 2,
    paddingTop: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around'

  }
})