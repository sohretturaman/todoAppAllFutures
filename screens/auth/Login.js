import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import Input from '../../components/authComp/Input';
import AuthButton from '../../components/authComp/AuthButton';
import Themes, {customDarkTheme} from '../../components/Themes';
import {customDefaultTheme} from '../../components/Themes';
import auth, { firebase } from '@react-native-firebase/auth';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [logged, setLogged] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [showLoading,setShowLoading]=useState(false); 
console.log('my current user is',user.email,user.emailVerified);


  const handleLogin = async(values) => {
    //const current = auth().currentUser
   // console.log('curretn user',current);   
    setShowLoading(true);
    try {
       const login=  await auth().signInWithEmailAndPassword(values.email, values.password);
        setShowLoading(false);
        if(login.user) {
            navigation.navigate('Bottom');
            AsyncStorage.setItem('user',JSON.stringify(login))
            .then(()=>setUser(login.user))
            .catch((err)=>console.log('error',err))
        
          }else{setUser(null)}
    } catch (e) {
        setShowLoading(false);
        console.log('hata var',e);
   
        }

        //second
        try {
          const  getUser =  await AsyncStorage.getItem('user')
          console.log('json value',getUser != null ? JSON.parse(getUser) : null);
        } catch (e) {
          console.log('errroror',e);
          
        }
      
        

    //redux value == current user login
//const user = auth().currentUser;  
  };

  return (
    <KeyboardAvoidingView style={{height: '100%'}}>
      <SafeAreaView style={styles.container}>
        {/**header  wrapper */}
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
            initialValues={{email: '', password: ''}}
            onSubmit={handleLogin }>
            {({handleChange, handleSubmit, values}) => (
              <View style={styles.bottomWrapper}>
                <Input
                  placeholder={'please write email'}
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
                <AuthButton />
                <Button title="go to note" onPress={handleSubmit} />
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
