
import React from 'react';
import {styles} from '../../screens/styles';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView,  Dimensions,TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchComp = ({searchNote,handleSearch}) => {
  return (
    <View>
      <View style={styles.serachContainer}>
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={{paddingHorizontal: 5}} onPress={() => {}}>
            <Icon name="note-search-outline" size={23} color={'#454545'} />
          </TouchableOpacity>
          <TextInput
            style={styles.serachInput}
            placeholder="search a note..."
            placeholderTextColor={'#454545'}
            value={searchNote}
            onChangeText={handleSearch}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchComp;
