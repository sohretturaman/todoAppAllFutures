import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import Input from '../../components/authComp/Input';
import AuthButton from '../../components/authComp/AuthButton';
import Themes, {customDarkTheme} from '../../components/noteComp/Themes';
import {customDefaultTheme} from '../../components/Themes';
import auth, { firebase } from '@react-native-firebase/auth';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Subheading } from 'react-native-paper';

const Login = () => {
  const navigation = useNavigation();
 // const [loggedIn, setLoggedIn] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState({});
  const [loading,setLoading]=useState(false); 
  const [error,setError]=useState('');

   //const current = auth().currentUser  
 // console.log('my current user is',user?.email ,'firebase way',current?.email);

useEffect(()=>{
  getUserItem();
},[])

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

  const handleLogin = async(values) => {
    console.log('values',values);
    setLoading(true);
    try {
       const login=  await auth().signInWithEmailAndPassword(values.email,values.password);
        console.log('login worked',login);
      //  navigation.navigate('Root',{screen:'Bottom'})
        navigation.navigate('Note'); 
        setUser(login.user)

      if(login){
         console.log('login is succesful, my user is',login.user);
          
        }
        setLoading(false);
        /*
         if(login.user) {
            AsyncStorage.setItem('user',JSON.stringify(login.user))
            .then(()=>
            {setUser(login.user) 
              })
            .catch((err)=>console.log('error',err))

            navigation.navigate("Root",{screen:'Bottom'});
        
          }*/
    } catch (e) {
        setLoading(false);
        console.log('hata var',e.message);
        setError(e.message);
        }
          
    setLoading(false); 
  };



  if(loading){
    return(
      <View>
        <ActivityIndicator size={60} color={'Red'}/>
      </View>
    )
  }
 
  return (
    <KeyboardAvoidingView style={{height: '100%'}}>
      <SafeAreaView style={styles.container}>
        {/**header  wrapper */}
        {!!error&& <Subheading style={{color:'red'}}>{error}</Subheading>}
        <View style={styles.bodyWrapper}>
          <Image
            source={require('../../components/image/chat.png')}
            style={styles.image}
          />
          <Text style={styles.text}>Focused</Text>
          <Text style={styles.disc}>
            save your notes in english by default, work with your team, call
            your team, share the screen and learn english at the same team.
          </Text>
          <View>{/**configure with  formik !!! */}</View>

          <Formik
            initialValues={{email:'', password:''}}
            onSubmit={handleLogin }>
            {({handleChange, handleSubmit, values}) => (
              <View style={styles.bottomWrapper}>
                <Input
                  placeholder={'please write username or email'}
                  title={'Email'}
                  onChangeText={handleChange('email')}
                  value={values.email}
                />
                <Input
                  placeholder={'please write password'}
                  title={'Password'}
                  isSecure={true}
                  onChangeText={handleChange('password')}
                  value={values.password}
                />
                <AuthButton title='Login' onPress={handleSubmit}  isLoading={loading}/>
               
              </View>
            )}
          </Formik>
          {/**textinput and  button */}
        </View>
        <Button title='go signupp' onPress={()=>navigation.navigate('Signup')}/>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    padding: 2,
  },

  image: {
    resizeMode: 'cover',
    height: '30%',
    width: '50%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 2,
    opacity: 0.7,
  },
  text: {
    color: customDarkTheme.colors.primary,
    fontSize: 18,
    justifyContent: 'center',
    fontSize: 60,
    fontWeight: '500',
    alignSelf: 'center',
  },
  disc: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: 'black',
    paddingHorizontal: 2,
    paddingBottom: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 10,
  },
  bodyWrapper: {
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  bottomWrapper: {
    backgroundColor: 'white',
    marginTop: 20,
  },
});
