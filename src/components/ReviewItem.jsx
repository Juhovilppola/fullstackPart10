import Text from './Text';
import * as React from 'react';
import {useParams} from "react-router"
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import useRepository from '../hooks/useRepository';
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { format, compareAsc } from "date-fns";

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
    padding: 5,
  
  },
  text: {
    marginBottom: 1,
    marginTop: 1,
    marginLeft: 15,
  }
  });

const ReviewItem = ({review}) => {
  //console.log(review.node)
  let date =  format(new Date(review.createdAt), "dd/MM/yyyy");
  let header = ''
    try {
    header = review.repository.fullName
    } catch {
    header = review.user.username
    }
  




  

  //console.log(date)
  return(
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.rating}>
      {review.rating}
      </Text>
      <View>
      <Text style={{fontWeight: 'bold', paddingLeft: 15}}>
      {header}
      </Text>
      <Text style={styles.text}>
      {date}
      </Text>
      <Text>
      
      </Text>
      </View>
      </View>
      <View style={{paddingLeft: 70}}>
        <Text>
      {review.text}
      </Text>
      </View>

    </View>
    
  )
}

export default ReviewItem