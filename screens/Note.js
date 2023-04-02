import React, { useState } from 'react'
import { SafeAreaView, TextInput } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Note = ({ navigation, ...props }) => {
//console.log('in note Screen movetoTrash is 2 D or not ',props.moveToTrash)
  const handleDelete = (index) => {
    let newNotes = [...props.notes];
    let deletedItem =newNotes.splice(index,1)
    let newTrash = [ ...deletedItem,...props.moveToTrash];
     
    //props.setMoveToTrash(newTrash)
    //props.setNotes(newNotes);

    AsyncStorage.setItem('saveNotes',JSON.stringify(newNotes)).then(()=>{
      props.setNotes(newNotes);
    })
    AsyncStorage.setItem('saveTrash',JSON.stringify(newTrash)).then(()=>{
      props.setMoveToTrash(newTrash); 
    }).catch((err)=>console.log(err))

 
  }


  function clearAll() {
    let emptyNotes = [...props.notes];
    let newTrash = [...props.moveToTrash];
    emptyNotes.forEach((item, index) => {
      newTrash.push(item);
    })
    // props.setNotes([]);
     //props.setMoveToTrash(newTrash); 

     AsyncStorage.setItem('saveNotes',JSON.stringify([])).then(()=>{
      props.setNotes([]);
     })

     AsyncStorage.setItem('saveTrash',JSON.stringify(newTrash)).then(()=>{
      props.setMoveToTrash(newTrash);
     }).catch((err)=>console.log(err)
     )
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
          <TouchableOpacity style={styles.iconWrapper} onPress={() => {navigation.navigate('DeletedNote')}}>
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

          <TouchableOpacity style={styles.iconWrapper} onPress={() => {clearAll()}}>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 500 }}>clear </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* body  for note screen  */}
      <View style={{paddingBottom:10,height:'70%',marginTop: 10 }}>
        <ScrollView>
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
                      <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{index + 1}.{item.title} </Text>
                      <TouchableOpacity style={styles.buttonText} onPress={() => handleDelete(index)}>
                        <Text style={{ fontSize: 14, color: 'white', fontWeight: 500 }} >X</Text>
                      </TouchableOpacity>

                    </View>

                    <View style={styles.textWrapper}>
                      <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">{item.disc} </Text>
                    </View>


                    <View style={styles.notePartWrapper} >
                      <Text style={{ fontSize: 14, color: 'gray', fontWeight: 500, flex: 1, margin: 2 }}>Created at : {item.date}  </Text>
                      <TouchableOpacity style={styles.buttonText2} onPress={() => navigation.navigate('EditNote', {
                        index: index,
                        item: item
                      })}>
                        <Text style={{ fontSize: 15, color: 'black' }} > Edit </Text>
                      </TouchableOpacity>
                    </View>

                  </View>

                </View>

              )

            })}
        </ScrollView>
       
      </View>
      <TouchableOpacity style={styles.calendar}
       onPress={()=>navigation.navigate('ShowOnCalendar')}
       >
           <Ionicons name='calendar' size={27} color={'white'}/>
      </TouchableOpacity>

      



    </SafeAreaView>
  )
}

export default Note;


{/**if you use filter function in handle delete
  let filteredData = newArray.filter(obj=>obj.id !==item.id);
    props.setNotes(filteredData);
*/}
   //here the deleted item is an array (handle delete func)
    // that's why you have to configure it as an array if you use as [deletedItem,...props.moveToTrash]
    //it will convert  your moveToTrash array to 2D array


