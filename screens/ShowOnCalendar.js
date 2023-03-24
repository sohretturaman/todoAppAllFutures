import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {Calendar,CalendarList,Agenda} from 'react-native-calendars';

const ShowOnCalendar = ({...props}) => {
    console.log('my date data ',props.dates[0],props.dates[1])
    const [selected,setSelected]=useState('')
    const hadleCalendar=(day)=>{ 
      setSelected(day.dateString);
    }
  return (
    <View>
        <Calendar
  // Customize the appearance of the calendar
  style={{
    borderWidth: 1,
    borderColor: 'gray',
    height: 350
  }}
  // Specify the current date
  current={'2023-03-01'}
  // Callback that gets called when the user selects a day
 // onDayPress={day => {
  //  console.log('selected day', day); }}
  onDayPress={day => {
    console.log('day pressed')
    hadleCalendar(day);
    
  }}
  // Mark specific dates as marked


  markedDates={{
    [props.dates]:{selected:true,disableTouchEvent:false,selectedDotColor:'red'},
    [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}

  }}

/>

<View>
   <TouchableOpacity onPress={()=>hadleCalendar()}>
     <Text> data will be here from calendar {selected}</Text>
     <Text>informtation aboout dates {props.dates} and  my note is </Text>
   </TouchableOpacity>
   <Text> n{props.note}</Text>
</View>


    </View>
  )
}

export default ShowOnCalendar;

const styles = StyleSheet.create({})