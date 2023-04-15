import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import AddButton from '../components/AddButton';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useNavigation} from '@react-navigation/native';
import SearchComp from '../components/SearchComp';

const initialValues = [
  {
    id: 1,
    task: 'first task',
  },
  {
    id: 2,
    task: 'task second',
  },
  {
    id: 3,
    task: 'third task',
  },
  {
    id: 4,
    task: 'third task',
  },
  {
    id: 5,
    task: 'third task',
  },
  {
    id: 6,
    task: 'third task',
  },
  {
    id: 7,
    task: 'third task',
  },
  {
    id: 8,
    task: 'third task',
  },
  {
    id: 9,
    task: 'nine task',
  },
  {
    id: 10,
    task: 'ten task',
  },
  {
    id: 11,
    task: 'eleven task',
  },
  {
    id: 12,
    task: ' twelve task',
  },
  {
    id: 13,
    task: 'last task',
  },
];

const Tasks = () => {
  const navigation = useNavigation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  
   useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
              setKeyboardVisible(true);
          },
      );
      const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
              setKeyboardVisible(false);
          },
      );

      return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
      };
  }, []);
 
 



  const handleDelete = (rowMap, rowKey) => {
    const newArray = [...tasklist];
    const SwippedItem = newArray.findIndex(item => item.key === rowKey);
    newArray.splice(SwippedItem, 1);
    setTaskList(newArray);
  };

  const [tasklist, setTaskList] = useState(
    initialValues.map((mapItem, index) => ({
      key: mapItem.id,
      task: mapItem.task,
    })),
  );

  const onRowDidOpen = rowKey => {
    console.log('on row did open presed ', rowKey);
    handleDelete(rowKey);
  };

  const renderItem = (data, rowMap) => {
    return (
      <TouchableHighlight>
        <View
          style={{
            borderColor: 'black',
            borderWidth: 2,
            padding: 20,
            margin: 5,
            backgroundColor: 'white',
          }}>
          <Text> task is = {data.item.task}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const HiddenItemAction = ({handleDelete}) => {
    return (
      <TouchableHighlight onPress={handleDelete}>
        <View
          style={{
            backgroundColor: 'red',
            margin: 5,
            padding: 5,
            alignContent: 'flex-end',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text>{''}</Text>
          <Text>Delete</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <HiddenItemAction
        rowMap={rowMap}
        data={data}
        handleDelete={() => handleDelete(rowMap, data.item.key)}
      />
    );
  };




  return (
    <SafeAreaView style={{backgroundColor: '#F6F5F5', paddingBottom: 90}}>
      <View>
        <SearchComp />
      </View>

      {/**invisible textinput  */}
{isKeyboardVisible?(
  <View style={{position:'absolute',zIndex:2,marginTop:50,backgroundColor:'red',width:'100%'}}>
  <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <TextInput
                style={{fontSize: 20, height: 250, textAlignVertical: 'top'}}
                placeholder="write a  task ..."
                placeholderTextColor={'grey'}
                multiline={true}
                onSubmitEditing={()=>setKeyboardVisible(false)}
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
  </View>
):

(
  <Text>o gitti ben geldim </Text>
)}

    

      <View>
        <SwipeListView
          style={{backgroundColor: 'green', paddingBottom: 30}}
          data={tasklist}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          onRowDidOpen={onRowDidOpen}
          leftOpenValue={75}
          rightOpenValue={-100}
          disableRightSwipe={true}
        />
      </View>

      <AddButton onPress={() => {}} />
    </SafeAreaView>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

{
  /* example code block if yu get  data from a file .js 
import MyList from '../mydatas/mylist'
const [list,setList] =useState([ 
  Mylist.map((mylistItem,index)=>{
    key:`${index}`,
    title:mylistItem.title,
    note:mylistItem.note
  })
])


*/
}
