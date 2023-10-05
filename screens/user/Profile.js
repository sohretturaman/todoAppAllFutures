import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import {firebase} from '@react-native-firebase/auth';
import firestore, {Filter} from '@react-native-firebase/firestore';
import {useState} from 'react';
import {
  Drawer,
  IconButton,
  Menu,
  SegmentedButtons,
  TextInput,
  Tooltip,
} from 'react-native-paper';
import ProfileComp from '../../components/userComps/ProfileComp';

const Profile = (...props) => {
  const navigation = useNavigation(); 
  const [user, setUser] = useState([]);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [pressed2, setPressed2] = useState(false);
  useEffect(() => {
    //needed datas :profile url , gmail , display name , bio
    firebase.auth().onAuthStateChanged(user => {
      console.log('user in profile', user);
      setUser(user);
    });

    const snapshot = firestore()
      .collection('allUsers')
      .where('name', '==', 'sohret ')
      .get()
      .then(x => {
        console.log(
         'snopshot',
          x?.docs.map(x => x?.data()),
        );
      })
      .catch(err => console.log('error on profile screen', err));
  }, []);

  const handlePress = () => {
    setPressed(!pressed);
    // Toggle the state between true and false
  };
  const handlePressed2 = () => {
    setPressed2(!pressed2);
  };

const  handleOnEditButton=()=>{

navigation.navigate('EditUserInfo');
}

  // note handle set Error on login and signup screen and handle spaces while give username
  return (
    <TouchableWithoutFeedback onPress={() => setVisible(false)}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View>
          {/** image and user name , then bio , then edit button(edit profile on profile icon, edit bio) , and share button  */}

          <ProfileComp
            visible={visible}
            setVisible={setVisible}
            user={user.displayName}
            onEditButton={handleOnEditButton}
          />
          {/**your  own feed and posts and and saved  posts at the same page  */}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            style={{backgroundColor: 'white', padding: 2, borderRadius: 10}}
            onPress={handlePress}>
            <Text style={{color: pressed ? 'blue' : 'black', fontSize: 17}}>
              Shared Notes
            </Text>

            <View
              style={{
                width: '100%',
                height: 2,
                backgroundColor: pressed ? 'blue' : 'black',
              }}
            />
          </TouchableOpacity>
          <Pressable onPressIn={handlePressed2}>
            <Text style={{color: pressed2 ? 'blue' : 'black', fontSize: 17}}>
              Saved Notes
            </Text>

            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: pressed2 ? 'blue' : 'black',
              }}
            />
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Profile;

const styles = StyleSheet.create({});

{
  /**
  <View style={{ flex: 1 }}>
    <Menu.Item leadingIcon="redo" onPress={() => {}} title="Redo" />
    <Menu.Item leadingIcon="undo" onPress={() => {}} title="Undo" />
    <Menu.Item leadingIcon="content-cut" onPress={() => {}} title="Cut" disabled />
    <Menu.Item leadingIcon="content-copy" onPress={() => {}} title="Copy" disabled />
    <Menu.Item leadingIcon="content-paste" onPress={() => {}} title="Paste" />
  </View>
 */
}
