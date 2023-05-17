import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';

const EditNote = ({route, navigation, ...props}) => {
  const {item, index} = route.params;

  const [editDisc, setEditDisc] = useState(item.disc);
  const [editTitle,setEditTitle]= useState(item.title);
  const [editDate, setEditDate] = useState(item.date);

  const hadleEditNote = () => {
    let editNote = [...props.notes];
    editNote[index].disc = editDisc;
    editNote[index].title=editTitle;
    // props.setNotes(editNote);


    AsyncStorage.setItem('saveNotes', JSON.stringify(editNote))
      .then(() => {
        props.setNotes(editNote);
      })
      .catch(err => console.log(err));
  // console.log('after data saved in edit',props.notes[0].disc);  
    navigation.navigate('Note');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{justifyContent: 'space-between'}}>
            <View style={styles.input}>
                {/*title input */}
              <TextInput
                style={{
                  fontSize: 20,
                  borderBottomColor: 'black',
                  borderBottomWidth: 0.2,
                  paddingBottom: 5,
                }}
                placeholder="title"
                placeholderTextColor={'grey'}
                multiline={false}
                maxLength={40}
                value={editTitle ? editTitle :''}
                onChangeText={value => setEditTitle(value)}
              />
           
           
              <TextInput
                style={{fontSize: 20, height: 250, textAlignVertical: 'top'}}
                placeholder="write a note ..."
                placeholderTextColor={'grey'}
                multiline={true}
                value={editDisc}
                onChangeText={value => setEditDisc(value)}
              />
            </View>

            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => {
                hadleEditNote();
              }}>
              <Text style={styles.text}> Edit </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default EditNote;

const styles = StyleSheet.create({
  editContainer: {
    justifyContent: 'space-between',
  },
  input: {
    borderRadius: 10,
    borderColor: 'blue',
    borderWidth: 3,
    margin: 15,
    fontSize: 20,
    height: 300,
    width: '90%',
    paddingBottom: 240,
    paddingHorizontal: 10,
  },
  buttonWrapper: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginHorizontal: 15,
    marginVertical: 10,
    width: 100,
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 500,
  },
});
