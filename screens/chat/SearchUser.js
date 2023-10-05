import {View, Text, TouchableOpacity, ScrollView, Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchComp from '../../components/noteComp/SearchComp';
import {Avatar, Divider, IconButton, List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchUser = () => {
  const navigaiton = useNavigation();
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);

  useEffect(() => {
    
    firebase
      .firestore()
      .collection('allUsers')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(x => x.data().name);
        setAllUsers(data);
      });
    
      getHistory(); 
    
    // Stop listening for updates when no longer required if you are using  return()=>subscriber();
  }, [result]);

  // search user is done !!!!! :)
  const handleSearch = searchVal => {
    setSearch(searchVal);
    if (searchVal.length == 0) {
      setResult([]);
    }
    if (searchVal.length > 0) {
      firebase
        .firestore()
        .collection('allUsers')
        .onSnapshot(snapshot => {
          setResult([]);
          const dataList = snapshot.docs;
          const query = searchVal.toLowerCase();
          for (let item in dataList) {
            let myUser = dataList[item].data().name.toLowerCase(); // seperated each item in data
            if (myUser.slice(0, query.length).indexOf(query) !== -1) {
               //console.log('result data',dataList[item].data())
              setResult(prevVal => {
                return [...prevVal, dataList[item].data().name];
              });
            }
          }
        });
    }

  
  };

  const onDeleteIcon = () => {
    setSearch('');
    setResult([]);
  };

  const handleOnSubmit = async () => {
    setSearch('');
    if(search.length!==0){
      let newArray = [search, ...savedSearches];
      //console.log('saved serachs ', newArray);
      await AsyncStorage.setItem('saveHistory', JSON.stringify(newArray))
        .then(() => setSavedSearches(newArray))
        .catch(err => console.log('an error accured', err));

    }  
  };

  const getHistory = async () => {
    try {
      const Result = await AsyncStorage.getItem('saveHistory');
        if (result !==null){
          setSavedSearches(JSON.parse(Result));
          
        }
    } catch (error) {
      console.log('error exist', error);
    }
  };


  const onDeleteSearch = async(index)=>{
     let newArray = [...savedSearches];
     let deletedItem= newArray.splice(index,1);
      console.log('deleted Item',deletedItem,'new array',newArray)
         await AsyncStorage.setItem('saveHistory',JSON.stringify(newArray)).then(()=>{
          setSavedSearches(newArray); 
         }).catch((err)=>{
          console.log(err);
          
         })
  }



  return (
    <View style={{padding: 2, flex: 1}}>
      <SearchComp
        iconName={'keyboard-backspace'}
        text={'search a user...'}
        onChangeText={val => {
          handleSearch(val);
        }}
        onCancel={onDeleteIcon}
        value={search}
        onSubmitEditing={handleOnSubmit}
      />

      {/** history comp , if search is not exist show up   */}
{!search&&(
       <View
       style={{
         backgroundColor: '#F2F2F2',
         marginTop:10
       }}>

       <ScrollView>
        <Text style={{padding:5,color:'gray',textDecorationLine:'underline',fontWeight:'bold'}}>Recent Searches </Text>
         {savedSearches?.map((item, index) => (
           <React.Fragment key={index}>
             <List.Item
               title={item}
               description={'searched'}
               onPress={() => {}}
               left={() => (
                 <Avatar.Text
                   size={35}
                   style={{
                     alignSelf: 'center',
                     marginLeft: 3,
                     backgroundColor: 'black',
                     alignItems: 'center',
                   }}
                   label={'H'}
                 />
               )}
               right={() => (
                 <IconButton
                   icon="close"
                   color={'black'}
                   size={20}
                   onPress={() => onDeleteSearch(index)}
                   style={{marginRight: -10}}
                 />
               )}
               style={{height: 60, justifyContent: 'center'}}
             />
             <Divider style={{backgroundColor: 'white', padding: 1}} />
           </React.Fragment>
         ))}
       </ScrollView>
     </View>
)}
    


      {search && (
        <ScrollView>
          {/** suggestion comp after click search comp  */}
          {result.map((item, index) => (
            <React.Fragment key={index}>
              <List.Item
                title={item}
                description={'suggestion'}
                onPress={() => {navigaiton.navigate('Profiles',{username:item})}}
                left={() => (
                  <Avatar.Text
                    size={35}
                    style={{
                      alignSelf: 'center',
                      marginLeft: 3,
                      backgroundColor: 'black',
                      alignItems: 'center',
                    }}
                    label={'T'}
                  />
                )}
            
                style={{height: 60, justifyContent: 'center'}}
              />
              <Divider style={{backgroundColor: 'white', padding: 1}} />
            </React.Fragment>
          ))}
        </ScrollView>
      )}

      {/**!!!!try to give recommendations about users,Change UI make it horizontal not vertical !!, with location,with mutual friends  */}
      {/**put popular people on the top after craeted followers */}
      {/**  
      {!search && (
        <View
          style={{
            flex: 2,
            backgroundColor: '#F2F2F2',
            paddingBottom: 5,
            borderTopWidth: 0.5,
            borderTopColor: 'gray',
          }}>
          <ScrollView>
            <Text style={{fontSize: 16, padding: 10, color: 'purple'}}>
              {' '}
              other users you may interst...
            </Text>
            {allUsers.map((user, index) => (
              <React.Fragment key={index}>
                <List.Item
                  title={user}
                  description={'new user'}
                  onPress={() => {}}
                  left={() => (
                    <Avatar.Text
                      size={40}
                      style={{
                        alignSelf: 'center',
                        marginLeft: 3,
                        backgroundColor: 'black',
                        alignItems: 'center',
                        margin: 2,
                      }}
                      label={'H'}
                    />
                  )}
                  style={{height: 60, justifyContent: 'center'}}
                />
                <Divider
                  style={{
                    backgroundColor: 'gray',
                    opacity: 0.4,
                    padding: 0.1,
                  }}
                />
              </React.Fragment>
            ))}
          </ScrollView>
        </View>
      )}

*/}
    </View>
  );
};

export default SearchUser;
