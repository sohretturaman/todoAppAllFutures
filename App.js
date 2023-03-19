import { StyleSheet, Text, View ,StatusBar} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Note from "./screens/Note"
import AddNote from './screens/AddNote'
import DeleteNote from './screens/DeleteNote'

const Stack = createStackNavigator(); 
const App = () => {
  return (
     <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen name='Note'>
           {props=><Note {...props}/>} 
         </Stack.Screen>
         <Stack.Screen name='AddNote'>
          {props=><AddNote {...props} />}
         </Stack.Screen>
         <Stack.Screen name='DeleteNote'>
          {props=><DeleteNote {...props}/>}
         </Stack.Screen>
      </Stack.Navigator>
     </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})


//in this file we defined screen in a different way we can define component in screen commend