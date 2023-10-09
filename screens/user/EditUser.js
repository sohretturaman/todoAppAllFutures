import { StyleSheet, Text, View ,TextInput,TouchableOpacity,Image, TouchableWithoutFeedback} from "react-native";
import React, { useEffect, useState } from "react";
import { Banner, Button, Modal } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/firestore";



const EditUser = () => {

  const [userName,setUserName]=useState('');
  const [bio ,setBio]=useState(''); 
  const [visible, setVisible] = useState(false);


  
 
  
{/** while taking data with userid in firebase 
    useEffect(()=>{
    firebase.firestore()
    .doc('allUsers/'+route.params.userId)
    .onSnapshot((snapshot)=>{
      console.log('snapshot',snapshot.data());
      setData(snapshot.data());
    })
  },[])


*/}

  const handleSave =()=>{
 
          firebase.firestore().doc('allUsers/'+userId)
          .set({name:userName,biography:bio},{merge:true}).then(()=>console.log('user succesfully saved ')
          ).catch((err)=>console.log('error while update user s  info',err)
          )
    


  }
  return (
    <TouchableWithoutFeedback onPress={() => setVisible(false)}> 
    <View >
  
        {/**put pic , update pic option again
         * put username textınput  create rules .it have to be unique
         * put bio text input
         */}
<View style={{justifyContent:'space-around'}}>
  {/**image and button wrapper */}
  <View >
    <View>
       <TouchableOpacity onPress={handleSave} style={{padding:5,justifyContent:'center',alignSelf:'flex-end',marginHorizontal:5}}>
        <Text style={{fontSize:18,color:'green',fontWeight:'bold',textDecorationLine:'underline'}}>Save</Text>
       </TouchableOpacity>
    </View>
  <TouchableOpacity onPress={()=>{}} style={{alignSelf:'center'}}>
            <Image
              source={{uri: 'https://picsum.photos/200/69'}}
              resizeMode="cover"
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
              }}
            />
          </TouchableOpacity>
          <Button onPress={setVisible(true)}>Update Photo </Button>
          

 </View>

               {/**user info wrapepr */}
  <View> 
  <View style={{padding:2,margin:2,marginBottom:10}}>
      <Text style={{fontWeight:500}}>User Name</Text>
      <TextInput
                style={{fontSize:17, height: 40, textAlignVertical:'bottom',borderBottomColor:'gray',borderBottomWidth:0.5}}
                placeholder="write a new user name"
                placeholderTextColor={'grey'}
                multiline={false}
                value={userName}
                onChangeText={(val)=>{setUserName(val)}}
              
              />
            
      </View>
     
      <View style={{padding:2,margin:2}}>
            <Text style={{fontWeight:500}}>Biography</Text>
            <TextInput
                style={{fontSize:17, minHeight:50,maxHeight: 150, textAlignVertical: 'top' ,borderBottomColor:'gray',borderBottomWidth:0.5,}}
                placeholder="write a new Bio"
                placeholderTextColor={'grey'}
                multiline={true}
                value={bio}
                onChangeText={(val)=>{setBio(val)}}
              />
    </View>

  </View>
</View>
 
    
    {/** add a bottom splash screen for camera access */}
    <View style={{backgroundColor:'blue'}}> 
         {/**Modal to chose  how to change prfile //!!close it when press on space and take primsission for camera */}
         <View style={{width: '80%', alignSelf: 'center', margin: 10}}>
          <Banner
            style={{
              paddingHorizontal: 2,
              backgroundColor: 'gray',
              alignItems: 'center',
              borderRadius: 20,
            }}
            visible={visible}
            actions={[
              {
                onPressOut: () => setVisible(false),
                label: 'Take a photo',
                textColor: 'black',
                icon: () => <Icon2 name="camera" size={20} />,
                onPress: () => setVisible(false),
              },
              {
                label: 'choose from gallery',
                textColor: 'black',
                icon: () => <Icon2 name="image" size={20} />,
                onPress: () => setVisible(false),
              },
            ]}>
            <Text style={{fontSize: 16, color: 'black'}}>
              Edit profile Photo
            </Text>
          </Banner>
        </View>
    </View>
   
    </View>
    </TouchableWithoutFeedback>
  );
};

export default EditUser;

const styles = StyleSheet.create({});
