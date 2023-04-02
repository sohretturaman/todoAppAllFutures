import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Calendar,CalendarList,Agenda} from 'react-native-calendars';
import Moment from 'moment';
import { format } from "date-fns";
import { FlatList } from 'react-native-gesture-handler';
import { el } from 'date-fns/locale';

const ShowOnCalendar = ({...props}) => {
    const [selected,setSelected]=useState('')
  const [note,setNote]=useState([...props.notes])
  const [dating,setDating]=useState([...props.notes])
  const [myDate,setMyDate]=useState([])
  console.log('note*****', note)
  const newData = [];
  const newData2 = [];
        for (let item of note) {
          newData.push({
            [item.date.slice(0, 10)]:{selected:true,disableTouchEvent:true,selectedDotColor: 'orange'}
          });
        
        }
    const press =()=>{
      for (let item of dating) {
        console.log('item**********//', item.date.slice(0,10))
        console.log('selected/////////***', selected)
        var date =item.date.slice(0,10);
        if(date===selected){
            newData2.push({
              note:item.disc,
              title:item.title,
              clock:item.date.slice(11,15)})
        }else{
          console.log('first')
        }
      }setMyDate(newData2);
    }
    useEffect(()=>{
      },[myDate])
        
        
  return (
    <View>
        <Calendar
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          height: 350
        }}
  // Specify the current date
        current={'2023-03-01'}

        onDayPress={day => {
          console.log('day pressed',day)
        setSelected(day.dateString)
        console.log('seleceted',selected)
        press();
          
        }}
        
        markedDates={newData.data}

      />

<View style={{padding:10}}>
  <Text style={{fontWeight:'700',color:'black'}}>{selected}</Text>
  <FlatList data={myDate} renderItem={(item)=>{
    console.log('************item*****', item)
    return(
      <View style={{flex:1}}>
        <View style={{ flexDirection:'row',justifyContent:'space-between',margin:10}}>
          <Text>{item.item.title}</Text>
          <Text>{item.item.clock}</Text>
        </View>
    <View>
      <Text>{item.item.note}</Text></View> 
    </View>
    )
  }}/>
</View>


    </View>
  )
}

export default ShowOnCalendar;

const styles = StyleSheet.create({})