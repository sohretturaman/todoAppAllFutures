import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AutocompleteInput from 'react-native-autocomplete-input';
import NoteComp from '../components/NoteComp';
import SearchComp from '../components/SearchComp';
import AddButton from '../components/AddButton';

const Note = ({navigation, ...props}) => {
  const [searchNote, setSearchNote] = useState('');
  const [searchedArray, setSearchedArray] = useState([]);
  console.log('my notes', props.notes);

  const handleDelete = index => {
    let newNotes = [...props.notes];
    let deletedItem = newNotes.splice(index, 1);
    let newTrash = [...deletedItem, ...props.moveToTrash];
    //props.setMoveToTrash(newTrash)
    //props.setNotes(newNotes);

    AsyncStorage.setItem('saveNotes', JSON.stringify(newNotes)).then(() => {
      props.setNotes(newNotes);
    });
    AsyncStorage.setItem('saveTrash', JSON.stringify(newTrash))
      .then(() => {
        props.setMoveToTrash(newTrash);
      })
      .catch(err => console.log(err));
  };

  function clearAll() {
    let emptyNotes = [...props.notes];
    let newTrash = [...props.moveToTrash];
    emptyNotes.forEach((item, index) => {
      newTrash.push(item);
    });
    // props.setNotes([]);
    //props.setMoveToTrash(newTrash);

    AsyncStorage.setItem('saveNotes', JSON.stringify([])).then(() => {
      props.setNotes([]);
    });

    AsyncStorage.setItem('saveTrash', JSON.stringify(newTrash))
      .then(() => {
        props.setMoveToTrash(newTrash);
      })
      .catch(err => console.log(err));
  }

  const handleSearch = value => {
    setSearchNote(value);
    const notes = [...props.notes];

    //   const arraySearched = props.notes.filter(item => {
    //  if (item.title.toLowerCase().includes(searchNote.toLowerCase()))
    //    return item;
    //   });

    for (let item of notes) {
      console.log('my item', item);

      if (
        item.title.toLowerCase().includes(searchNote.toLowerCase()) ||
        item.disc.toLowerCase().includes(searchNote.toLowerCase())
      ) {
        searchedArray.push(item);
      }
      console.log('pushed items', searchedArray);
    }

    // console.log('array searched', arraySearched);

    if (searchedArray.length) {
      console.log('array saved');
      // props.setNotes([searchedArray]); // you have to  give with [...arraysearched it gives error]
    }
  };

  const handleEdit = (item, index) => {
    console.log('handle note çalıştı');

    navigation.navigate('EditNote', {
      index: index,
      item: item,
    });
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      {/*  header buttons   
      <View style={styles.headerWrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Your Notes...</Text>
          <Text style={styles.total}>Total :{props.notes.length} </Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => {
              navigation.navigate('DeletedNote');
            }}>
            <Icon name="delete" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => {
              navigation.navigate('AddNote');
            }}>
            <Icon name="plus" size={28} color={'white'} />
          </TouchableOpacity>
        </View>
      </View> 
     */}

      <View style={styles.bodyWrapper}>
        <ScrollView>
          <SearchComp handleSearch={handleSearch} searchNote={searchNote} />
          {props.notes.length === 0 ? (
            <View
              style={{
                justifyContent: 'center',
                margin: 10,
                width: '70%',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 20, color: 'blue'}}>
                noting to show yet Press plus icon to add a new note ..
              </Text>
            </View>
          ) : (
            props.notes.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleEdit(item, index)}>
                  <NoteComp
                    item={item}
                    index={index}
                    handleDelete={() => handleDelete(index)}
                  />
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </View>

      <AddButton />
    </SafeAreaView>
  );
};

export default Note;

{
  /**if you use filter function in handle delete
  let filteredData = newArray.filter(obj=>obj.id !==item.id);
    props.setNotes(filteredData);
*/
}
//here the deleted item is an array (handle delete func)
// that's why you have to configure it as an array if you use as [deletedItem,...props.moveToTrash]
//it will convert  your moveToTrash array to 2D array
