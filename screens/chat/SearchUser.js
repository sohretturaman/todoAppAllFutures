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
    getHistory();
    firebase
      .firestore()
      .collection('allUsers')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(x => x.data().name);
        setAllUsers(data);
      });
    // Stop listening for updates when no longer required if you are using  return()=>subscriber();
  }, [savedSearches]);

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
              setResult(prevVal => {
                return [...prevVal, dataList[item].data().name];
              });
            }
          }
        });
    }

    console.log('result is ', result);
  };

  const onDeleteIcon = () => {
    console.log('on delete icon worked');
    setSearch('');
    setResult([]);
  };

  const handleOnSubmit = async () => {
    setSearch('');
    console.log('search value', search);
    if(search.length!==0){
      let newArray = [search, ...savedSearches];
      console.log('saved serachs ', newArray);
      await AsyncStorage.setItem('saveHistory', JSON.stringify(newArray))
        .then(() => setSavedSearches(newArray))
        .catch(err => console.log('an error accured', err));

    }  
  };

  const getHistory = async () => {
    try {
      const Result = await AsyncStorage.getItem('saveHistory').then(() => {
        setSavedSearches(JSON.parse(Result));
        console.log('result from async storage', JSON.parse(Result));
      });
    } catch (error) {
      console.log('error exist', error);
    }
  };

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

      {/** after submit on search component  */}
{!search&&(
       <View
       style={{
         backgroundColor: '#F2F2F2',
         marginTop:10
       }}>

       <ScrollView>
        <Text style={{padding:5,color:'gray',textDecorationLine:'underline',fontWeight:'bold'}}>Recent Searches </Text>
         {savedSearches.map((item, index) => (
           <React.Fragment key={index}>
             <List.Item
               title={item}
               description={'new user'}
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
                   label={'Ş'}
                 />
               )}
               right={() => (
                 <IconButton
                   icon="close"
                   color={'black'}
                   size={20}
                   onPress={() => navigaiton.navigate('ChatList')}
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
          {/** after click on search component */}
          {result.map((item, index) => (
            <React.Fragment key={index}>
              <List.Item
                title={item}
                description={'new user'}
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
                    label={'Ş'}
                  />
                )}
                right={() => (
                  <IconButton
                    icon="close"
                    color={'black'}
                    size={20}
                    onPress={() => navigaiton.navigate('ChatList')}
                    style={{marginRight: -10}}
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
