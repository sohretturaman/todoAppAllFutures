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
    let newArray = [...props.notes];
   // let myTrash=[...props.moveToTrash]
    let deletedItem =newArray.splice(index,1)
   
     
    let newTrash = [ ...deletedItem,...props.moveToTrash];
    let pushedData= newTrash.push(deletedItem);
    console.log('new trash',newTrash)
    console.log('pushed data',pushedData)
    console.log('deleted item',deletedItem)
    props.setMoveToTrash(newTrash)

    {/** 
    try {
      const data =  await AsyncStorage.getItem('saveNotes')
      if (data!==null){
        let parsed =[]
        parsed =  JSON.parse(data);
       
       // console.log('parsed data here in delete',parsed)
        let newData= parsed.filter(obj=>obj.id !==item.id);
       // console.log('new data after filter',newData)
        await AsyncStorage.setItem('saveNotes',JSON.parse(newData)).catch((err)=>console.log(err))    
       
      }
      
     } catch (error) {
       console.log(error)
     }

     */}

  }



  function clearAll() {
    let emptyNotes = [...props.notes];
    let newTrash = [...props.moveToTrash];
    emptyNotes.forEach((item, index) => {
      newTrash.push(item);
    })

    props.setNotes([]);
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

          <TouchableOpacity style={styles.iconWrapper} onPress={() => { }}>
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
      <TouchableOpacity style={{alignSelf:'flex-end',marginRight:10,margin:3,borderRadius:24,
       padding:4,height:50,width:50,backgroundColor:'blue',justifyContent:'center',alignItems:'center'}}
       onPress={()=>navigation.navigate('ShowOnCalendar')}
       >
           <Ionicons name='calendar' size={27} color={'white'}/>
      </TouchableOpacity>

      



    </SafeAreaView>
  )
}

export default Note;

