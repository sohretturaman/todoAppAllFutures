import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import Input from '../../components/authComp/Input';
import AuthButton from '../../components/authComp/AuthButton';
import Themes, {customDarkTheme} from '../../components/noteComp/Themes';
//import {customDefaultTheme} from '../../components/Themes';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import {Subheading} from 'react-native-paper';
import {firebase} from '@react-native-firebase/firestore';

const Signup = () => {
  const navigation = useNavigation();
  const [logged, setLogged] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [isLoding, setIsLoading] = useState(false);
  const [findedUser, setFindUser] = useState([]);

  const handleSignup = async values => {
    setError(''); 
     setIsLoading(true);
     findUser('');
  
     let  users = []; 
     const  checkUsers =findUser(values.username);
     users=(await checkUsers).map((x)=>x.name);
     console.log('users value in hadle',users);
     
  
    try {
 
      if (!users.length==0){
        setIsLoading(false); 
           console.log('users  exist , users value',users)
           setError('user name is already exist')
           
      }else  {

        const response = await auth().createUserWithEmailAndPassword(
          values.email,
          values.password,
        );
        await response.user.updateProfile({displayName: values.username});
        console.log('User account created & signed in! response', response);

        await firebase.firestore().collection('allUsers').add({
          name: values.username,
          email: values.email,
        });
        setIsLoading(false);
        navigation.navigate('Login');
      } 
      
     
    
       
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

      setError(error.message);
      console.log('error exist', error.message);
    }
 
  setIsLoading(false); 
  };

  const findUser = async frgnName => {
    setFindUser(''); 
    const citiesRef = firebase.firestore().collection('allUsers');
    const response = await citiesRef
      .where('name', '==',frgnName)
      .get()
      .then(query => {
        let data = query.docs.map(x => x.data());
        return data; 
        
      });

   // console.log(' find use func response value', response);
 return  response; 
   
  };


  return (
    <KeyboardAvoidingView style={{height: '100%'}}>
      <SafeAreaView style={styles.container}>
        <Subheading style={{color: 'red'}}>{error}</Subheading>

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
            initialValues={{
              username: '',
              email: '',
              password: '',
            }}
            onSubmit={handleSignup}>
            {({handleChange, handleSubmit, values}) => (
              <View style={styles.bottomWrapper}>
                <Input
                  placeholder={'please write username'}
                  title={'User Name'}
                  onChangeText={handleChange('username')}
                  value={values.username}
                />
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
             
                <AuthButton
                  title="Go Login"
                  onPress={() => navigation.navigate('Login')}
                  isLoading={isLoding}
                />
                <AuthButton
                  title="Sign Up"
                  onPress={handleSubmit}
                  isLoading={isLoding}
                />
              </View>
            )}
          </Formik>
          {/**textinput and  button */}

          <Button title="Find user " onPress={() => findUser('emma')} />
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
