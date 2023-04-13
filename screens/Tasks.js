import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import AddButton from "../components/AddButton";
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from "@react-navigation/native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";


const initialValues = [
  {
  id:1,
  task:'first task'
},{
  id:2,
  task:'task second'
},
{
  id:3,
  task:'third task'
}]

const Tasks = () => {
  const navigation=useNavigation();
  

  const handleDelete =(rowMap,rowKey)=>{
     const newArray = [...tasklist];
    const SwippedItem=  newArray.findIndex(item=>item.key === rowKey)
     newArray.splice(SwippedItem,1);
     setTaskList(newArray);

  }

  
  const [tasklist,setTaskList] =useState(
    //dont put in array this data to can anle to render
    initialValues.map((mapItem,index)=>({
      key:mapItem.id,
      task:mapItem.task
    }
    ))
  )

  const renderItem =(data,rowMap)=>{
    console.log('in render item data',data.item);
    
    return(
      <TouchableHighlight>
      <View style={{borderColor:'black',borderWidth:2,padding:5,margin:5}}>
        <Text>        task is = {data.item.task}</Text>
      </View>
  </TouchableHighlight>

    )
  }

  
    
  const HiddenItemAction =({handleDelete})=>{
    return(
      <View style={{backgroundColor:'red'}}>
           <TouchableOpacity onPress={handleDelete}>
           <Text>Delete</Text>
           </TouchableOpacity>
      </View>
    )
  }
   
  const  renderHiddenItem =(data,rowMap)=>{
    return(
      <HiddenItemAction
      rowMap={rowMap}
       data={data}
       handleDelete={()=>handleDelete(rowMap,data.item.key)}
      />
    )
  }

  return (
    <SafeAreaView style={{backgroundColor:'#F6F5F5'}}>
      
         <View>
            <SwipeListView
              data={tasklist}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-75}
            />
         </View>
       <AddButton onPress={()=>navigation.navigate('AddTask')}/>
    </SafeAreaView>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container :{
    height:'100%',
  }
});



{/* example code block if yu get  data from a file .js 
import MyList from '../mydatas/mylist'
const [list,setList] =useState([ 
  Mylist.map((mylistItem,index)=>{
    key:`${index}`,
    title:mylistItem.title,
    note:mylistItem.note
  })
])


*/}