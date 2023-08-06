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
import Themes, {customDarkTheme} from '../../components/noteComp/Themes';
//import {customDefaultTheme} from '../../components/Themes';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import { Subheading } from 'react-native-paper';

const Signup = () => {
  const navigation = useNavigation();
  const [logged, setLogged] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error,setError] = useState('');
  const[isLoding,setIsLoading]= useState(false); 



  const handleSignup =async (values) => {
    try {
     if(values.password !==values.rePassword){
        console.log('passwords doesnt match');
        setError('Password dont match'); 
        
      }
      setIsLoading(true);
        const response = await auth().createUserWithEmailAndPassword(values.email,values.password);
       await response.user.updateProfile({ displayName:values.username});

        console.log('User account created & signed in! response',response);
        setIsLoading(false); 
        navigation.navigate('Login')
      
           
} catch (error) {
      setIsLoading(false); 
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
         setError(error.message);

      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        setError(error.message);
      }
      if(values.password !==values.rePassword){
        console.log('password doest match',values.password,values.rePassword);
        setError(error.message)   
      }

      setError(error.message);
      console.log('error exist',error.message);
      
    }
 

  };


  return (
    <KeyboardAvoidingView style={{height: '100%'}}>
      <SafeAreaView style={styles.container}>
      <Subheading style={{color:'red'}}>{error}</Subheading>
       
        {/**header  wrapper */}
        <View style={styles.bodyWrapper}>
          <Image
            source={require('../../components/image/chat.png')}
            style={styles.image}
          />
         {/**<Text style={styles.text}>Focused</Text> */} 
          <Text style={styles.disc}>
            save your notes in english by default, work with your team, call
            your team, share the screen and learn english at the same team.
          </Text>
          <View>{/**configure with  formik !!! */}</View>

          <Formik
            initialValues={{username:'',email: '', password: '',rePassword:''}}
            onSubmit={handleSignup }>
            {({handleChange, handleSubmit, values}) => (
              <View style={styles.bottomWrapper}>
                 <Input
                  placeholder={'please write username'}
                  title={'User Name'}
                  onChangeText={handleChange('username')}
                  value={ values.username}
                />
                <Input
                  placeholder={'please write email'}
                  title={'Email'}
                  onChangeText={handleChange('email')}
                  value={ values.email}
                />
                <Input
                  placeholder={'please write password'}
                  title={'Password'}
                  isSecure={true}
                  onChangeText={handleChange('password')}
                  value={values.password}
                />
                  <Input
                  placeholder={'please write password agin'}
                  title={'Password Again'}
                  isSecure={true}
                  onChangeText={handleChange('rePassword')}
                  value={values.rePassword}
                />
                <AuthButton  title='Go Login' onPress={()=>navigation.navigate('Login')} isLoading={isLoding} />
                <AuthButton  title='Sign Up' onPress={handleSubmit} isLoading={isLoding} />

              </View>
            )}
          </Formik>
          {/**textinput and  button */}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    padding: 2,
  },

  image: {
    resizeMode: 'cover',
    height: '20%',
    width: '40%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 2,
    opacity: 0.7,
  },
  text: {
    color: customDarkTheme.colors.primary,
    fontSize: 18,
    justifyContent: 'center',
    fontSize: 50,
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
    marginTop: 0,
  },
});
