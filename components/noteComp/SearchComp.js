import React from 'react';
import {styles} from '../../screens/styles';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

//  <Icon name="note-search-outline" size={23} color={'#454545'} />
const SearchComp = ({value, onChangeText, text, iconName,onCancel,onSubmitEditing}) => {
  const navigation = useNavigation();
  return (
    <View style={{alignSelf:'center'}}>
      <View style={styles.serachContainer}>
        <View style={styles.inputWrapper}>
          <TouchableOpacity
            style={{paddingHorizontal: 5}}
            onPress={() => {
              navigation.navigate('ChatList');
            }}>
            <Icon name={iconName} size={23} color={'#454545'} />
          </TouchableOpacity>
          <View style={{width:'90%',flexDirection:'row',justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
            <TextInput
              style={styles.serachInput}
              placeholder={text}
              placeholderTextColor={'#454545'}
              value={value}
              onChangeText={onChangeText}
              onSubmitEditing={onSubmitEditing}
              enablesReturnKeyAutomatically={true}
            />
            <TouchableOpacity
              style={{paddingHorizontal: 5, flexDirection:'row',alignSelf:'center'}}
              onPress={onCancel}>
              <Icon name={'close'} size={23} color={'#454545'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchComp;
