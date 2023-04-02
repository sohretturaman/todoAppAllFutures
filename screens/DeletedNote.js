import { StyleSheet, Text, View, TouchableOpacity, ScrollView,Alert } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'





const DeletedNote = ({ ...props }) => {

 console.log('in deleted screen',props.moveToTrash)

 {/**
  const deleteTrash = () => {
    let deletedNotes = [...props.moveToTrash]
    deletedNotes = [];
    props.setMoveToTrash([]);

  }

  const undoNote = (index) => {
    let newArray = [...props.moveToTrash];
    let undoNote = newArray.splice(index, 1);
    props.setMoveToTrash(newArray);
    props.setNotes(undoNote);

    let newNotes = [undoNote, ...props.notes]
    props.setNotes(newNotes);

   
  }

  function undoAll() {
    Alert.alert('Undo All Notes', 'are you sure to make all the notes undo',[{
      text: 'no',
      onPress: () => console.log('no it pressed '),
     
    }, {
      text: 'yes',
      onPress: () => {
        let newTrashArray = [...props.moveToTrash];
        let undoNotes = [...props.notes];
        newTrashArray.forEach((item, index) => {
          undoNotes.push(item)
        })

          props.setMoveToTrash([]);
          props.setNotes(undoNotes);
        
      }
    }

    ])

  }

  function deletePermenant(index) {
    let newArray = [...props.moveToTrash];
    let deletedItem = newArray.splice(index, 1);
  
    props.setMoveToTrash(newArray);
    console.log(deletedItem, 'been deleted successfully')
    
  }
 */}

  return (
    <View>
      {/* header comp */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.buttonWrapper} onPress={() => {}}>
          <Text style={styles.title}>Undo All</Text>
        </TouchableOpacity>
        <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Total:{props.moveToTrash.length}  </Text>
        <TouchableOpacity style={styles.buttonWrapper} onPress={()=>{}}>
          <Text style={styles.title}>Empty</Text>
        </TouchableOpacity>
      </View>

       {/**body comp  */}
      <ScrollView style={{ marginTop: 10 }}>
        <View>
          {props.moveToTrash.map((item, index) =>
            <View key={index} style={{ justifyContent: 'center', alignItems: 'center', }}>
              <View style={styles.noteContainer}>
                <View style={styles.notePartWrapper} >
                  <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{index + 1}.{item.title} </Text>
                  <TouchableOpacity style={styles.buttonText2} onPress={() =>{}}>
                    <Text style={{ fontSize: 15, color: 'black' }} >Undo</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.textWrapper}>
                      <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">{item.disc} </Text>
                    </View>

                <View style={styles.notePartWrapper} >
                  <Text style={{ fontSize: 10, color: 'gray', fontWeight: 500, flex: 1, margin: 2 }}>Created at : {item.date}  </Text>
                  <TouchableOpacity style={styles.buttonText2} onPress={() => {}}>
                    <Text style={{ fontSize: 15, color: 'black' }} >Delete</Text>
                  </TouchableOpacity>
                </View>

              </View>

            </View>


          )}
        </View>


      </ScrollView>
      

    </View>
  )
}

export default DeletedNote

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 2,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: 'blue',
    padding: 5,
    paddingBottom: 10
  },
  buttonWrapper: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 22,
    justifyContent: 'center',
    marginHorizontal: 5
  },
  title: {
    color: 'white',
    fontSize: 15,
    fontWeight: 500
  },
  titleMiddle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',

  },
  noteContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    margin: 10,
    padding: 7,
    borderRadius: 10,
    width: '80%',
    height: 120,
    justifyContent: 'space-between',
    borderColor: 'black',
    borderWidth: 1.5,
    elevation: 10



  },
  notePartWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 2,
  },
  textWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 2,
  },
  text: {
    fontSize: 18,
    flex: 5,
    color: 'black',
    paddingRight: 10


  },
  buttonText: {
    padding: 1,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 5,
    borderRadius: 15,
    borderColor: 'gray',
    marginHorizontal: 2,
    borderColor: 'black',
    borderWidth: 2

  },
  buttonText2: {
    padding: 1,
    width: 55,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 10,
    borderColor: 'gray',
    marginHorizontal: 2,
    borderColor: 'black',
    borderBottomWidth: 2,
    borderTopWidth: 2


  }

})