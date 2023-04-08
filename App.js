import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Note from './screens/Note';
import AddNote from './screens/AddNote';
import DeleteNote from './screens/DeletedNote';
import EditNote from './screens/EditNote';
import ShowOnCalendar from './screens/ShowOnCalendar';
import Moment from 'moment';
import {format} from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Tasks from './screens/Tasks';
import Translator from './screens/Translator';
import Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5  from "react-native-vector-icons/FontAwesome5";
import { Image } from 'react-native';


const TabStack = createBottomTabNavigator();
const Stack = createStackNavigator();
const App = () => {
  const [notes, setNotes] = useState([]);
  const [moveToTrash, setMoveToTrash] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const data = await AsyncStorage.getItem('saveNotes');
      if (data !== null) {
        let parsed = JSON.parse(data);
        setNotes(parsed);
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const trash = await AsyncStorage.getItem('saveTrash');
      if (trash !== null) {
        let parsed = JSON.stringify(trash);
        setMoveToTrash(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotes = (title, disc, time) => {
    //console.log('handle notes worked ',title,disc,time)
    const note = {
      id: Math.random().toString(),
      date: time,
      title: title,
      disc: disc,
    };

    let newNotes = [note, ...notes];
    AsyncStorage.setItem('saveNotes', JSON.stringify(newNotes))
      .then(() => {
        setNotes(newNotes);
      })
      .catch(err => console.log(err));
    // console.log('new note',newNotes)
  };

  const BottomStack = () => {
    return (
      <TabStack.Navigator>
        <TabStack.Screen name="Note" component={NoteComp} options={{
          tabBarIcon:({focused})=>( 
          <Icon name='note-text-outline' size={30}  color={focused ?'#7E0CF5':'black'}/>
        )}} />
        <TabStack.Screen name="Task" component={Tasks}  options={{
          tabBarIcon:()=>(
            <Image source={require('./assets/checklist.png')}  style={{height:30,width:30}} />
          )
        }}/>
        <TabStack.Screen name="Translator" component={Translator} options={{
          tabBarIcon:({focused})=>(
            <Icon name='translate' size={35}  color={focused ?'#7E0CF5':'black'}/>
            
          )
        }}/>
      </TabStack.Navigator>
    );
  };

  const NoteComp = props => (
    <Note
      {...props}
      setNotes={setNotes}
      notes={notes}
      setMoveToTrash={setMoveToTrash}
      moveToTrash={moveToTrash}
      getNotes={getNotes}
    />
  );
  const AddNoteComp = props => (
    <AddNote
      {...props}
      setNotes={setNotes}
      notes={notes}
      handleNotes={handleNotes}
    />
  );
  const DelNoteComp = props => (
    <DeleteNote
      {...props}
      notes={notes}
      setNotes={setNotes}
      moveToTrash={moveToTrash}
      setMoveToTrash={setMoveToTrash}
    />
  );
  const EditNoteComp = props => (
    <EditNote {...props} setNotes={setNotes} notes={notes} />
  );
  const CalendarComp = props => (
    <ShowOnCalendar {...props} setNotes={setNotes} notes={notes} />
  );
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen name="Bottom" component={BottomStack} />
        <Stack.Screen name="AddNote" component={AddNoteComp} />
        <Stack.Screen name="DeletedNote" component={DelNoteComp} />
        <Stack.Screen name="ShowOnCalendar" component={CalendarComp} />
        <Stack.Screen name="EditNote" component={EditNoteComp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});


//in this file we defined screen in a different way we can define component in screen commend

/*
  <Image source={require('./assets/notes.png')}  style={{height:30,width:30}} />
  for icon of bottom tab 

 
       

*/
