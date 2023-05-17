import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView,  Dimensions,} from 'react-native';
import {styles} from '../screens/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'react-native-paper';

const NoteComp = ({item,index,handleDelete}) => {
  const theme = useTheme() ; 
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={[styles.noteContainer,{backgroundColor:theme.colors.primary}]}>
        <View style={styles.notePartWrapper}>
          {item.title ? (
            <Text
              style={[styles.text, {fontSize: 20,backgroundColor:theme.colors.onBackground}]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {index + 1}.{item.title ? item.title : item.disc}{' '}
            </Text>
          ) : (
            <Text style={[styles.text,{color:theme.colors.onSecondary}]} numberOfLines={3} ellipsizeMode="tail">
              {index + 1}.{item.disc}{' '}
            </Text>
          )}

          <TouchableOpacity
            style={styles.buttonText}
            onPress={handleDelete}>
            <Text
              style={{
                fontSize: 14,
                color: 'white',
                fontWeight: 500,
              }}>
              X
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
            {item.title ? item.disc : ''}{' '}
          </Text>
        </View>

        <View style={styles.notePartWrapper}>
          <Text
            style={{
              fontSize: 14,
              color: 'gray',
              fontWeight: 500,
              flex: 1,
              margin: 2,
            }}>
            Created at : {item.date}{' '}
          </Text>
          <TouchableOpacity
            style={styles.buttonText2}
            onPress={{}}>
            <Text style={{fontSize: 15, color: 'black'}}> Edit </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NoteComp;
