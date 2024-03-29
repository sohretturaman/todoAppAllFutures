import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const HeaderComp = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Handy Notes...</Text>
      </View>
      <View style={{flexDirection: 'row', marginRight: 2}}>
        <TouchableOpacity  onPress={() => {
                  navigation.navigate('Account');
                }}>
          <Avatar.Icon
            icon={() => (
              <Icon
                name="account"
                size={30}
                color={'black'}
               
              />
            )}
            size={30}
          />
        </TouchableOpacity>

        {/*<Icon name="trash-can-outline" size={30} color={'white'}  onPress={()=>{navigation.navigate('DeletedNote')}}/>*/}
        {/* <Icon name="dots-vertical" size={30} color={'white'} onPress={()=>navigation.navigate('Settings')} /> */}
      </View>
    </View>
  );
};

export default HeaderComp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7E0CF5',
    flexDirection: 'row',
    height: Dimensions.get('window').height * 0.06,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    elevation: 1,
    shadowOpacity: 0.8,
    shadowColor: 'black',
    shadowOffset: {height: 2, width: 1},
    paddingLeft: 15,
    padding: 2,
  },
  title: {
    color: 'white',
    fontSize: 19,
    fontWeight: 500,
  },
});
