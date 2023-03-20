import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'


const NoteComp = () => {
  return (
    <View style={styles.noteWrapper}>
      <View>
      <View>
          <Text>1 index</Text>
           <Text>
             note
           </Text>
        </View>
        <TouchableOpacity>
           <Text>X</Text>
        </TouchableOpacity>

      </View>
      {/* second row in note container */}
      <View>
          <Text>Date </Text>
            <TouchableOpacity >
               <Text>Edit</Text>
            </TouchableOpacity>
      </View>
        
    </View>
  )
}

export default NoteComp

const styles = StyleSheet.create({})