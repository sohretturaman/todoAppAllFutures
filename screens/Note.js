import React from 'react'
import { SafeAreaView, TextInput } from 'react-native';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Note = () => {
  return (
    <SafeAreaView>
         {/*  header buttons */}
         <View style={styles.headerWrapper}>
            <View style={styles.inputWrapper}>
               <TextInput placeholder='search a note ....'  placeholderTextColor={'blue'} style={styles.serachInput}/>
            </View>
            <View style= {styles.iconContainer}>
            <TouchableOpacity style={styles.iconWrapper}>
                  <Icon name='delete' size={28} color='white' />
             </TouchableOpacity>
             <TouchableOpacity style={styles.iconWrapper}>
                 <Icon name='plus' size={25} color={'white'}/>
             </TouchableOpacity>
            </View>
           
         </View>
    </SafeAreaView>
  )
}

export default Note ; 

const styles = StyleSheet.create({
  headerWrapper:{
    flexDirection:'row',
    width:'100%',
    height:70,
    backgroundColor:'white',
    justifyContent:'space-between',
    alignContent:'center',
    alignItems:'flex-end',
    borderBottomColor:'blue',
    borderBottomWidth:2,
    paddingBottom:10

  

  },
  iconWrapper:{
    backgroundColor:'blue',
    padding:8,
    borderRadius:22,
    justifyContent:'center',
    marginHorizontal:5

  },
  iconContainer:{
    flexDirection:'row',
    marginHorizontal:3
  },
  serachInput:{
    fontSize:18
  },
  inputWrapper:{
    width:'65%',
    marginBottom:-5,
    marginHorizontal:5,

  }
})