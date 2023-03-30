import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Note from "./screens/Note"
import AddNote from './screens/AddNote'
import DeleteNote from './screens/DeletedNote'
import EditNote from './screens/EditNote'
import ShowOnCalendar from './screens/ShowOnCalendar'
import Moment from 'moment';
import { format } from "date-fns";
import AsyncStorage from '@react-native-async-storage/async-storage'



const Stack = createStackNavigator();
const App = () => {
  const [notes, setNotes] = useState([]);
  const [moveToTrash, setMoveToTrash] = useState([]);

  const handleNotes=(title,disc,time)=>{
    console.log('handle notes worked ',title,disc,time)
    const note ={
      id :Math.random().toString(),
      date:time,
      title:title,
      disc:disc
    }

    let newNotes= [note,...notes];
    setNotes(newNotes); 
  }


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>

      <Stack.Screen name='Note'>
      {props => <Note {...props} setNotes={setNotes} notes={notes} setMoveToTrash={setMoveToTrash} moveToTrash={moveToTrash}
          />}
      </Stack.Screen>
        <Stack.Screen name='AddNote'> 
         {props => <AddNote {...props} setNotes={setNotes} notes={notes} handleNotes={handleNotes}
          />}
          </Stack.Screen>
       
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})


//in this file we defined screen in a different way we can define component in screen commend

/*

 
        <Stack.Screen name='DeletedNote'>
          {props => <DeleteNote {...props}  notes={notes} setNotes={setNotes} date={date} moveToTrash={moveToTrash} setMoveToTrash={setMoveToTrash} />}
        </Stack.Screen>
        <Stack.Screen name='EditNote'  >
          {props => <EditNote {...props} setNotes={setNotes} notes={notes} />}
        </Stack.Screen>
        <Stack.Screen name='ShowOnCalendar' >
          {props => <ShowOnCalendar {...props} note={note} notes={notes} setDate={setDate} date={setDate} />}
        </Stack.Screen>

*/