import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {Calendar,CalendarList,Agenda} from 'react-native-calendars';
import Moment from 'moment';
import { format } from "date-fns";

const ShowOnCalendar = ({...props}) => {
    console.log('my date data ',props.dates[0],props.dates[1])
    const [selected,setSelected]=useState('')
    const hadleCalendar=(day)=>{ 
      let dayString= day.dateString;
     // console.log('day pressed',day)
      console.log('pressed day is formatted to datestring ',dayString)
      setSelected(dayString);
      let datesString=[...props.dates]
   
      if(dayString=datesString[0]){
        console.log('it is equal')
      }else{
        console.log('it is not equal ',datesString[0])
      }

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

  onDayPress={day => {
    //console.log('day pressed')
    hadleCalendar(day);
    
  }}
  // Mark specific dates as marked


  markedDates={{
   [props.dates]:{selected:true,disableTouchEvent:true,selectedDotColor: 'orange'},
    [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'},
    '2023-03-17': {marked: true,selectedDotColor:'red'},

  }}

/>

<View>
   <TouchableOpacity >
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