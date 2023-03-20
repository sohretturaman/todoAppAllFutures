import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'


const DeletedNote = () => {
  return (
    <View>
      {/* header comp */}
       <View style={styles.headerContainer}>
           <TouchableOpacity style={styles.buttonWrapper}>
                <Text style={styles.title}>Undo All</Text>
           </TouchableOpacity>
           <Text style={{color:'black',fontSize:16,fontWeight:'500'}}>Total :  </Text>
           <TouchableOpacity style={styles.buttonWrapper}>
             <Text style={styles.title}>Empty</Text>
           </TouchableOpacity>
       </View>
    </View>
  )
}

export default DeletedNote

const styles = StyleSheet.create({
  headerContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    margin:2,
    alignItems:'center'
  },
  buttonWrapper:{
    backgroundColor:'blue',
    padding:8,
    borderRadius:22,
    justifyContent:'center',
    marginHorizontal:5
  },
  title:{
    color:'white',
    fontSize:15,
    fontWeight:500
  },
  titleMiddle:{
    color:'black',
    fontSize:18,
    fontWeight:'500',

  }

})