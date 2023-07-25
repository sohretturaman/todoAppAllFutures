import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  FlatList,
  Button
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AutocompleteInput from 'react-native-autocomplete-input';
import NoteComp from '../components/noteComp/NoteComp';
import SearchComp from '../components/noteComp/SearchComp';
import { useDispatch, useSelector } from 'react-redux';
import {  AddNoteToTrash, RemoveNoteItem } from '../components/redux/action/Actions';
import {useTheme} from '@react-navigation/native'
import AddButton from '../components/noteComp/AddButton'
import { firebase } from '@react-native-firebase/auth';


const Note = ({navigation, ...props}) => {
  const [searchNote, setSearchNote] = useState('');
  const [searchedArray, setSearchedArray] = useState([]);
  const [user,setUser]=useState('');
  const theme = useTheme(); 
  const dispatch = useDispatch(); 


  const handleDelete = index => { //!!!!!! 
    let newNotes = [...props.notes];
    let deletedItem = newNotes.splice(index, 1);

    console.log('my trash item before adding dispath',deletedItem);
    
    dispatch(AddNoteToTrash(deletedItem));  // add  trash save trash 

    AsyncStorage.setItem('saveNotes', JSON.stringify(newNotes)).then(() => {
      props.setNotes(newNotes);
    });
   
  };


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

  function handleEdit (item, index) {
    console.log('handle note çalisti');
    navigation.navigate('EditNote', {
      index: index,
      item: item,
    });
  };

  
  
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((userData)=>{
      if(!userData){
        navigation.navigate('Auth',{screen:'Login'})
        console.log('user is not exixt',userData);
        
      }else{
        setUser(userData?.email??'');
      console.log('my user is',userData);
      }
      // chack for firebase store if the user exist or not, based on that send user to login or signup
      
       })
  },[])

  return (
    <SafeAreaView style={[styles.mainContainer,{backgroundColor:theme.colors.backdrop}]}>
    
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
      <Text>you are welcome {user}</Text>
      <Button onPress={()=>navigation.navigate('Root',{screen:'Settings'})} title='go settings'/>

      <AddButton onPress={()=>navigation.navigate('AddNote')} />
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

//here the deleted item is an array (handle delete func)
// that's why you have to configure it as an array if you use as [deletedItem,...props.moveToTrash]
//it will convert  your moveToTrash array to 2D array
