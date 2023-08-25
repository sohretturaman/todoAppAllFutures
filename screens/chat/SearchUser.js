import { View, Text } from "react-native";
import React, { useEffect } from "react";
import SearchComp from "../../components/noteComp/SearchComp";

const SearchUser = () => {

    useEffect(()=>{
         
    },[])
  return (
    <View>
        <SearchComp iconName={'keyboard-backspace'} text={'search a user...'} handleSearch={()=>{}} onCancel={()=>{}} />
      <Text> welcome to serach user </Text>
    </View>
  );
};

export default SearchUser;
