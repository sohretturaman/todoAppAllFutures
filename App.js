import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Note from "./screens/Note"
import AddNote from './screens/AddNote'
import DeleteNote from './screens/DeletedNote'
import EditNote from './screens/EditNote'

const Stack = createStackNavigator();
const App = () => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [date, setDate] = useState(new Date().toUTCString());
  const [moveToTrash, setMoveToTrash] = useState([]);

  const handleAddButton = () => {

    if (note.trim().length > 0) {
      const newNote = note;
      const newNotes = [newNote, ...notes];
      setNotes(newNotes);
      setNote('')

    } else {   
      console.log('note didnt add')
    }  
  }


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name='Note' >
          {props => <Note {...props} setNotes={setNotes} notes={notes} note={note} setNote={setNote} date={date} setDate={setDate} moveToTrash={moveToTrash} setMoveToTrash={setMoveToTrash} />}
        </Stack.Screen>
        <Stack.Screen name='AddNote'>
          {props => <AddNote {...props} setNote={setNote} note={note} setNotes={setNotes} notes={notes} handleAddButton={handleAddButton} />}
        </Stack.Screen>
        <Stack.Screen name='DeletedNote'>
          {props => <DeleteNote {...props} note={note} setNote={setNote} notes={notes} setNotes={setNotes} date={date} moveToTrash={moveToTrash} setMoveToTrash={setMoveToTrash} />}
        </Stack.Screen>
        <Stack.Screen name='EditNote'  >
          {props => <EditNote {...props} note={note} setNotes={setNotes} notes={notes} />}
        </Stack.Screen>



      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})


//in this file we defined screen in a different way we can define component in screen commend