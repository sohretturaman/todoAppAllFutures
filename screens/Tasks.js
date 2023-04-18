//main color #7E0CF5
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
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import AddButton from '../components/AddButton';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useNavigation} from '@react-navigation/native';
import SearchComp from '../components/SearchComp';
import AddTaskComp from '../components/AddTaskComp';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

const initialValues = [
  {
    id: 1,
    task: 'first task first task first taskfirst taskfirst taskfirst task first taskfirst task first task first task first taskfirst taskfirst taskfirst task first taskfirst task ',
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
    task: 'fourth task',
  },
  {
    id: 5,
    task: 'fifth task',
  },
  {
    id: 6,
    task: 'sixth task',
  },
  {
    id: 7,
    task: 'seventh task',
  },
  {
    id: 8,
    task: 'eight task',
  },
  {
    id: 9,
    task: 'nineth task',
  },
  {
    id: 10,
    task: 'tenth task',
  },
  {
    id: 11,
    task: 'eleventh task',
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
   const [task,setTask] =useState(''); 

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
    //Iam  gonna add animated api to delete item
    console.log('on row did open presed ', rowKey);
    const newArray = [...tasklist];
    const SwippedItem = newArray.findIndex(item => item.key === rowKey);
    console.log('on did opend this item deleted ', SwippedItem);
    newArray.splice(SwippedItem, 1);
    setTaskList(newArray);
  };

  const handleStrikeOut = index => {  // later after adding task 
    //change squential
    const array = [tasklist];
    const strikedItem = array.filter(item => item.id == index);
    console.log('my pressed ite ', strikedItem);
    setStrikedList(...strikedList, strikedItem);
  };

  const renderItem = (data, rowMap) => {
    return (
      <TouchableHighlight style={styles.renderItemContainer}>
        <View style={styles.renderItemWrapper}>
          <Text numberOfLines={3} style={styles.taskText}>
            {data.item.task}
          </Text>
          <TouchableOpacity
            style={styles.boxWrapper}
            onPress={() => handleStrikeOut(data.item.id)}></TouchableOpacity>
        </View>
      </TouchableHighlight>
    );
  };

  const HiddenItemAction = ({handleDelete}) => {
    return (
      <TouchableHighlight onPress={handleDelete}>
        <View style={styles.hideItemContainer}>
          <Text>{''}</Text>
          <Icon name="delete" size={25} color={'white'} />
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

  onPressBack = () => {
    setKeyboardVisible(false);
  };


  const HandleTask =()=>{
    console.log('handleTask pressed  my items area that ' ,task)
    setKeyboardVisible(false)
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.searchWrapper}>
        <SearchComp />
      </View>


      {/**invisible textinput ADD TASK !!! styles configured to keyboard   */}
      {isKeyboardVisible ? (
        <View
          style={styles.invisibleAddTask}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.innerContainer}>
                {/**add task icon wrapper */}
                <TouchableOpacity style={styles.doneWrapper} onPress={()=>HandleTask()}>
                    <Text style={{color:'#7E0CF5',fontSize:20}}> Done </Text>
                </TouchableOpacity>
                <TextInput
                  style={{fontSize:18, height: 250, textAlignVertical: 'top'}}
                  placeholder="write a  task ..."
                  placeholderTextColor={'grey'}
                  multiline={true}
                  autoFocus={true}
                  value={task}
                  onChangeText={(value)=>setTask(value)}
                 // onSubmitEditing={() => setKeyboardVisible(false)}
                />
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      ) : null}




    

      <View style={{paddingBottom: 2, height: '90%', paddingHorizontal: 20}}>
        <SwipeListView
          data={tasklist}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          onRowDidOpen={onRowDidOpen}
          leftOpenValue={75}
          rightOpenValue={-100}
          disableRightSwipe={true}
        />
      </View>

      <AddTaskComp
        onPress={() => {
          setKeyboardVisible(true);
        }}
      />
    </SafeAreaView>
  );
};

// as striked as a  property okay 

export default Tasks;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F6F5F5',
    height: '100%',
    flex:1
  },
  searchWrapper: {
    paddingTop: 15,
    paddingBottom: 5,
  },

  renderItemContainer: {
    borderColor: 'white',
    borderWidth: 1,
    padding: 2,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    maxHeight: 200,
  },
  renderItemWrapper: {
    flexDirection: 'row',
    padding: 18,
    justifyContent: 'space-between',
  },
  boxWrapper: {
    borderRadius: 6,
    borderColor: '#454545',
    borderWidth: 2,
    width: 20,
    height: 20,
    backgroundColor: '#7E0CF5',
    opacity: 0.9,
  },
  taskText: {
    fontSize: 17,
    color: 'black',
    width: '90%',
  },

  strikedOutText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },

  hideItemContainer: {
    backgroundColor: 'red',
    padding: 15,
    margin: 5,
    borderRadius: 20,
    alignContent: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  invisibleAddTask :{
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'white',
    width: '100%',
    bottom:0,
    minHeight:100,
    maxHeight:200,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    borderColor:'#454545',
    borderWidth:0.5,
    borderBottomWidth:0
    
  },
  innerContainer:{
    padding:5,
  },
  doneWrapper:{alignSelf:'flex-end',marginRight:10}
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
