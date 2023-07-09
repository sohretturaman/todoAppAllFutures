import {StyleSheet, Text, View, StatusBar, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  useTheme,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Note from './Note';
import AddNote from './AddNote';
import DeleteNote from './DeletedNote';
import EditNote from './EditNote';
import ShowOnCalendar from './ShowOnCalendar';
import Moment from 'moment';
import {format} from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Tasks from './Tasks';
import Translator from './Translator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HeaderComp from '../components/HeaderComp';
import {Dimensions} from 'react-native';
import Settings from './Settings';
import HeaderTask from '../components/HeaderTask';
import AddTask from './AddTask';
import {customDarkTheme, customDefaultTheme} from '../components/Themes';
import {useSelector} from 'react-redux';
import Login from './auth/Login';
import Signup from './auth/Signup';
import {firebase} from '@react-native-firebase/auth';

const TabStack = createBottomTabNavigator();
const Stack2 = createStackNavigator();
const Stack = createStackNavigator();
const MainStack =createStackNavigator();

const NavigationPage = () => {
  const [authUser, setAuthUser] = useState('');
  const [user, setUser] = useState('');
  const [notes, setNotes] = useState([]);
  const[loading,setLoading] =useState(false); 
  //  const [moveToTrash, setMoveToTrash] = useState([]);

  useEffect(() => {
    getNotes();
    getUserItem();
    firebase.auth().onAuthStateChanged(userData => {
      setAuthUser(userData?.email ?? '');
    });
  }, []);

  const getUserItem = async () => {
    try {
      const getUser = await AsyncStorage.getItem('user');
      if (getUser !== null) {
        let parsed = JSON.parse(getUser);
        setUser(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNotes = async () => {
    setLoading(true);
    try {
      const data = await AsyncStorage.getItem('saveNotes');
      if (data !== null) {
        let parsed = JSON.parse(data);
        setNotes(parsed);
     
      }
    } catch (error) {
      console.log(error);
  
    }
    setLoading(false)
    /*
    try {
      const trash = await AsyncStorage.getItem('saveTrash');
      if (trash !== null) {
        let parsed = JSON.stringify(trash);
        setMoveToTrash(parsed);
      }
    } catch (error) {
      console.log(error);
    }
    */
  };

  const handleNotes = (title, disc, time) => {
    //console.log('handle notes worked ',title,disc,time)
    const note = {
      id: Math.random().toString(),
      date: time,
      title: title,
      disc: disc,
    };

    let newNotes = [note, ...notes];

    AsyncStorage.setItem('saveNotes', JSON.stringify(newNotes))
      .then(() => {
        setNotes(newNotes);
      })
      .catch(err => console.log(err));
    // console.log('new note',newNotes)
  };

  const BottomStack = () => {
    return (
      <TabStack.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopColor: '#454545',
            borderTopWidth: 0.2,
            padding: 2,
            height: Dimensions.get('window').height * 0.07,
            elevation: 0.02,
            shadowOffset: {height: 5, width: 1},
          },
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {position: 'relative'},
        }}>
        <TabStack.Screen
          name="Note"
          component={NoteComp}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="note-text-outline"
                size={35}
                color={focused ? '#7E0CF5' : '#454545'}
              />
            ),
            header: () => <HeaderComp />,
          }}
        />
        <TabStack.Screen
          name="Calendar"
          component={CalendarComp}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="calendar-month-outline"
                size={30}
                color={focused ? '#7E0CF5' : '#454545'}
              />
            ),
            header: () => <HeaderComp />,
          }}
        />
        <TabStack.Screen
          name="Task"
          component={Tasks}
          options={{
            tabBarIcon: ({focused}) => (
              <FontAwesome
                name="tasks"
                size={30}
                color={focused ? '#7E0CF5' : '#454545'}
              />
            ),
            header: () => <HeaderTask />,
          }}
        />
        <TabStack.Screen
          name="Translator"
          component={Translator}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="translate"
                size={33}
                color={focused ? '#7E0CF5' : '#454545'}
              />
            ),
          }}
        />
      </TabStack.Navigator>
    );
  };

  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    );
  };
  
  const CalendarComp = props => (
    <ShowOnCalendar {...props} setNotes={setNotes} notes={notes} />
  );
  const NoteComp = props => (
    <Note {...props} setNotes={setNotes} notes={notes} getNotes={getNotes} />
  );
  const AddNoteComp = props => (
    <AddNote
      {...props}
      setNotes={setNotes}
      notes={notes}
      handleNotes={handleNotes}
    />
  );
  const DelNoteComp = props => (
    <DeleteNote {...props} notes={notes} setNotes={setNotes} />
  );
  const EditNoteComp = props => (
    <EditNote {...props} setNotes={setNotes} notes={notes} />
  );

  const SettingScreenComp = props => <Settings {...props} />;

  let currentTheme = useSelector(selector => selector.changeTheme);


const MainStackComp = ()=>{
    return(
      <MainStack.Navigator>
         <MainStack.Screen
          name="Bottom"
          component={BottomStack}
          options={{headerShown: false}}
        />

        <MainStack.Screen name="AddNote" component={AddNoteComp} />
        <MainStack.Screen name="DeletedNote" component={DelNoteComp} />
        <MainStack.Screen name="EditNote" component={EditNoteComp} />
        <MainStack.Screen name="Settings" component={SettingScreenComp} />
        <MainStack.Screen name="AddTask" component={AddTask} />
      </MainStack.Navigator>
    )
  }

  if(loading){
    return(
      <View>
               <ActivityIndicator size={50} style={{shadowColor:'black'}}/>
      </View>
   )
  }
  return (
    <NavigationContainer
      theme={currentTheme ? customDarkTheme : customDefaultTheme}>
                      
    <Stack2.Navigator> 
      
        <Stack2.Screen name="Auth" component={AuthStack} options={{headerShown: false}}/>
         
         <Stack2.Screen name='Root' component={MainStackComp}  options={{headerShown: false}} />
        
  </Stack2.Navigator>
    </NavigationContainer>
  );
};
export default NavigationPage;

const styles = StyleSheet.create({});

//in this file we defined screen in a different way we can define component in screen commend

/*
  <Image source={require('./assets/notes.png')}  style={{height:30,width:30}} />
  for icon of bottom tab 

 
       

*/
