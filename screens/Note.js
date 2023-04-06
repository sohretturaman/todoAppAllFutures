import React, {useEffect, useState} from 'react';
import {SafeAreaView, TextInput, FlatList, ScrollView} from 'react-native';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AutocompleteInput from 'react-native-autocomplete-input';

const Note = ({navigation, ...props}) => {
  const [searchNote, setSearchNote] = useState('');
  const [searchedArray,setSearchedArray]=useState([]);

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



  const handleSearch =  (value) => {
    setSearchNote(value);  
   const  arraySearched = props.notes.filter(item => {
      if (
        item.title.toLowerCase().includes(searchNote.toLowerCase())) 
        return item;
    });
    
     console.log('array searched',arraySearched);

    if (arraySearched.length) {
      console.log('array saved');
       setSearchedArray([...arraySearched]); // you have to  give with [...arraysearched it gives error]
    }
  };

  return (
    <SafeAreaView>
      {/*  header buttons */}
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
      {/*input search container */}
      <View style={styles.serachContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.serachInput}
            placeholder="search a note..."
            placeholderTextColor={'black'}
            value={searchNote}
            onChangeText={handleSearch}
          />

          <TouchableOpacity
            style={{paddingHorizontal: 5}}
            onPress={() => {}}>
            <Icon name="note-search-outline" size={25} color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => {
              clearAll();
            }}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: 500}}>
              clear{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/**
      <View style={{marginTop:40}}>
      <AutocompleteInput
      data={[...props.notes]}
      value={searchNote}
      onChangeText={handleSearch}
      flatListProps={{
        keyExtractor: (_, idx) => idx,
        renderItem: ({ item }) => <Text>{item.title}</Text>,
      }}
    />
     </View>
 */}
  {searchedArray.length ==0? 
  '':(
    searchedArray.map((item,index)=>{
      return(
        <View key={item}>
           <Text>my item{item.title}</Text>
        </View>
      )
    })
  )}

      {/* body  for note screen  */}
      <View style={{paddingBottom: 10, height: '70%', marginTop: 10}}>
        <ScrollView>
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
                <View
                  key={index}
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View style={styles.noteContainer}>
                    <View style={styles.notePartWrapper}>
                      {item.title ? (
                        <Text
                          style={[styles.text, {fontSize: 20}]}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {index + 1}.{item.title ? item.title : item.disc}{' '}
                        </Text>
                      ) : (
                        <Text
                          style={styles.text}
                          numberOfLines={3}
                          ellipsizeMode="tail">
                          {index + 1}.{item.disc}{' '}
                        </Text>
                      )}

                      <TouchableOpacity
                        style={styles.buttonText}
                        onPress={() => handleDelete(index)}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: 'white',
                            fontWeight: 500,
                          }}>
                          X
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.textWrapper}>
                      <Text
                        style={styles.text}
                        numberOfLines={2}
                        ellipsizeMode="tail">
                        {item.title ? item.disc : ''}{' '}
                      </Text>
                    </View>

                    <View style={styles.notePartWrapper}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: 'gray',
                          fontWeight: 500,
                          flex: 1,
                          margin: 2,
                        }}>
                        Created at : {item.date}{' '}
                      </Text>
                      <TouchableOpacity
                        style={styles.buttonText2}
                        onPress={() =>
                          navigation.navigate('EditNote', {
                            index: index,
                            item: item,
                          })
                        }>
                        <Text style={{fontSize: 15, color: 'black'}}>
                          {' '}
                          Edit{' '}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.calendar}
        onPress={() => navigation.navigate('ShowOnCalendar')}>
        <Ionicons name="calendar" size={27} color={'white'} />
      </TouchableOpacity>
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
