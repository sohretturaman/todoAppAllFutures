import React from 'react'
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    headerWrapper: {
      flexDirection: 'row',
      width: '100%',
      height: 90,
      padding: 5,
      backgroundColor: 'white',
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'center',
      borderBottomColor: 'blue',
      borderBottomWidth: 3.5,
      paddingBottom: -10,
      paddingTop: 10,
  
  
  
    },
    iconWrapper: {
      backgroundColor: 'blue',
      padding: 8,
      borderRadius: 22,
      justifyContent: 'center',
      marginHorizontal: 5
  
    },
    iconContainer: {
      flexDirection: 'row',
      marginHorizontal: 3,
      justifyContent: 'center'
    },
    title: {
      fontSize: 25, color: 'blue',
      marginHorizontal: 5,
      fontWeight: 700
  
    },
    titleWrapper: {
      marginTop: -5,
      padding: 5,
  
    },
    total: {
      fontSize: 15,
      margin: 5,
      color: 'blue',
      fontWeight: 500
    },
    serachInput: {
      fontSize: 18
    },
    inputWrapper: {
      width: '70%',
      marginBottom: -5,
      marginHorizontal: 5,
      borderRadius: 10,
      borderColor: 'black',
      borderBottomWidth: 2,
      margin: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  
    },
    serachContainer: {
      flexDirection: 'row',
      padding: 2,
      paddingTop: 5,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'space-around'
  
    },
    noteContainer: {
      flexDirection: 'column',
      backgroundColor: 'white',
      margin: 10,
      padding: 7,
      borderRadius:10,
      width:'80%',
      height:140,
      justifyContent:'space-between',
      borderColor:'black',
      borderWidth:1.5,
      elevation:10
    
      
  
    },
    notePartWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin:2,
       
    },
    textWrapper:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin:2,
    },
    text:{
        fontSize:17,
        flex:5,
        color:'black',
        paddingRight:10
                
    },

    buttonText:{
        padding:1,
        width:26,
        height:26,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'black',
        paddingHorizontal:5,
        borderRadius:15,
        borderColor:'gray',
        marginHorizontal:2,
        borderColor:'black',
        borderWidth:2
 
    },
    buttonText2:{
        padding:1,
        width:50,
        height:26,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:5,
        borderRadius:10,
        borderColor:'gray',
        marginHorizontal:2,
        borderColor:'black',
        borderBottomWidth:2,
        borderTopWidth:2
        

    },
    calendar:{alignSelf:'flex-end',marginRight:10,margin:3,borderRadius:24,
    padding:4,height:50,width:50,backgroundColor:'blue',justifyContent:'center',alignItems:'center'}
  
  })