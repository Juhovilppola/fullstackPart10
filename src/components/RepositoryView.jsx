import Text from './Text';
import * as React from 'react';
import {useParams} from "react-router"
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import useRepository from '../hooks/useRepository';
import { FlatList, View, StyleSheet, Pressable } from "react-native";

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryView = () => {
  const {id} = useParams();

  const { repository } = useRepository({id});
  //console.log(data)
  
  console.log('reporepo')
  console.log(repository)

  if (repository === undefined){return(<></>);}
  
     


  return (
      
    <FlatList

    
    ItemSeparatorComponent={ItemSeparator}
    keyExtractor={({ id }) => id}
    ListHeaderComponent={() => <RepositoryItem item={repository} single ={true}/>} 
  

/>

        
    
     
    );
}

export default RepositoryView;