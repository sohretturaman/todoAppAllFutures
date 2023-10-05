import { StyleSheet, Text, View ,TextInput,TouchableOpacity,Image} from "react-native";
import React from "react";
import { Button } from "react-native-paper";

const EditUser = () => {
  return (
    <View>
        {/**put pic , update pic option again
         * put username textınput  create rules .it have to be unique
         * put bio text input
         */}
<View style={{justifyContent:'center'}}>
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
          <Button onPress={()=>{}}>Update Photo </Button>
          
</View>
      
      <View style={{padding:2,margin:2,marginBottom:10}}>
      <Text style={{fontWeight:500}}>User Name</Text>
      <TextInput
                style={{fontSize:17, height: 40, textAlignVertical:'bottom',borderBottomColor:'gray',borderBottomWidth:0.5}}
                placeholder="write a new user name"
                placeholderTextColor={'grey'}
                multiline={false}
                value={'Şöhret Turaman'}
                onChangeText={()=>{}}
              />
            
      </View>
     
      <View style={{padding:2,margin:2}}>
            <Text style={{fontWeight:500}}>Biography</Text>
            <TextInput
                style={{fontSize:17, minHeight:50,maxHeight: 150, textAlignVertical: 'top' ,borderBottomColor:'gray',borderBottomWidth:0.5,}}
                placeholder="write a new Bio"
                placeholderTextColor={'grey'}
                multiline={true}
                value={'my biographi'}
                onChangeText={()=>{}}
              />
    </View>

    {/** add a bottom splash screen for camera access */}
    </View>
  );
};

export default EditUser;

const styles = StyleSheet.create({});
