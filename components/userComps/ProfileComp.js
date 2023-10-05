import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Banner, Button} from 'react-native-paper';

{
  /** image and user name , then bio , then edit button(edit profile on profile icon, edit bio) , and share button  */
}
const ProfileComp = ({user, ViewProfile, visible, setVisible,onEditButton}) => {
  return (
    <TouchableWithoutFeedback onPress={() => setVisible(false)}>
      <View style={{padding: 5, backgroundColor: 'white'}}>
        <View
          style={{
            margin: 5,
            flexDirection: 'row',
            backgroundColor: 'white',
          }}>
          <TouchableOpacity onPress={ViewProfile}>
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
          <Icon2
            name={'camera'}
            onPress={() => setVisible(true)}
            size={25}
            color={'white'}
            style={{
              flexDirection: 'row-reverse',
              backgroundColor: 'gray',
              borderRadius: 15,
              padding: 3,
              position: 'absolute',
              alignSelf: 'flex-end',
            }}
          />

          <View style={styles.userPerInfo}>
            <Text style={styles.userName}>{user ? user : 'user Name'}</Text>

            <View style={styles.userBioWrapper}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.userBio}>
                ve inssani ayakta tutan da benlik zanni değil hiçlik bilincidir,
                bir farki olmamali insanin comlekten
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.profileButtonsWrapper}>
          <TouchableOpacity
            onPress={()=>{}}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button onPress={onEditButton}>Edit Profile</Button>
            <Icon name="edit" size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=>{}}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button>Share Profile</Button>

            <Icon name="share" size={20} />
          </TouchableOpacity>
        </View>

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
    </TouchableWithoutFeedback>
  );
};

export default ProfileComp;

const styles = StyleSheet.create({
  userPerInfo: {
    backgroundColor: 'white',
    padding: 2,
    paddingLeft: 5,
  },
  userName: {
    fontSize: 21,
    color: 'black',
    marginLeft: 5,
    paddingBottom: 3,
    marginTop: 7,
  },
  userBio: {
    fontSize: 16,
    color: '#263238',
  },
  userBioWrapper: {
    width: '85%',
    marginLeft: 5,
    backgroundColor: 'white',
    padding: 2,
  },
  profileButtonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    marginTop:2,
  },
});
