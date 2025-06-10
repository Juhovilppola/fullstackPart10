//import Text from './Text';
//import * as React from 'react';
import {useParams} from "react-router"
import RepositoryItem from "./RepositoryItem";
//import { useQuery } from "@apollo/client";
import useRepository from '../hooks/useRepository';
import { FlatList, View, StyleSheet, Pressable } from "react-native";
//import { format, compareAsc } from "date-fns";
import ReviewItem from "./ReviewItem"

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container : {
    backgroundColor: 'white',
    display: 'flex',
    
  },
  rating : {
    width: 50,
    height: 50,
    textAlign: "center",
    fontWeight: 'bold',
    paddingTop: 10,
    color: '#0366d6',
    borderWidth: 1,
    borderRadius: 50 / 2,
    padding: 10,
    borderColor: '#0366d6',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
  
  },
  text: {
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 15,
  }
  });

const ItemSeparator = () => <View style={styles.separator} />;



const RepositoryView = () => {


  const {id} = useParams();

  const { repository, fetchMore } = useRepository({id});
  //console.log(data)
  
  console.log('reporepo')
  console.log(repository)

  if (repository === undefined){return(<></>);}
  
     
  const reviews = repository.reviews
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  const onEndReach = () => {
    console.log('end')
    fetchMore();
  };
  console.log('koira')
  console.log(reviews)

  return (
      
    <FlatList

    data={reviews}
    renderItem={({ item }) => <ReviewItem review={item} />}
    ItemSeparatorComponent={ItemSeparator}
    keyExtractor={({ id }) => id}
    onEndReached={onEndReach}
    onEndReachedThreshold={0.5}
    ListHeaderComponent={() => <RepositoryItem item={repository} single ={true}/>} 
  

/>

        
    
     
    );
}

export default RepositoryView;