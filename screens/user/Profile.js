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
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import ProfileComp from '../../components/userComps/ProfileComp';



const Profile = () => {
  const navigation = useNavigation(); 

  const [user,setUser]=useState([]);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [pressed2, setPressed2] = useState(false); 
  const [data,setData]=useState(null);
const [loading,setLoading] =useState(false); 
const Id =''; 

//const id = data.map((x)=>x.id);

useEffect(()=>{
  firebase.auth().onAuthStateChanged(async (user)=>{
    console.log('current user',user);
  
    setUser(user);
    setLoading(true); 
  })
  setLoading(false); 
   // user.updateProfile({displayName:newValue}) to update value
      
},[user])



useEffect(() => {
  console.log('username',user.displayName);
  if(loading){
    firestore()
    .collection('allUsers').where('name','==',user.displayName)
    .get()
    .then(querySnapshot => {
      let newData=[]; 
     
   
    querySnapshot.forEach(documentSnapshot => {
      newData.push(documentSnapshot);   
      Id=documentSnapshot.id;
      
     });
    
     
      
    });
  }

}, []);

  const handlePress = () => {
    setPressed(!pressed);
    // Toggle the state between true and false
  };
  const handlePressed2 = () => {
    setPressed2(!pressed2);
  };

const  handleOnEditButton=(item)=>{
//console.log('item values in edit',item.id ,'**',item.data());
navigation.navigate('EditUserInfo',
{userId:item,
  data:item
})
}





  // note handle set Error on login and signup screen and handle spaces while give username
  return (
    <TouchableWithoutFeedback onPress={() => setVisible(false)}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View>
          {/** image and user name , then bio , then edit button(edit profile on profile icon, edit bio) , and share button  */}
        
  
    <View> 
        <ProfileComp
            visible={visible}
            setVisible={setVisible}
            user={data}
            onEditButton={handleOnEditButton(data)}
          />
       
    
</View>

           

          
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
