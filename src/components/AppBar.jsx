import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme'
import { Link } from "react-router-native";
import { useQuery } from '@apollo/client';
import { LOGGEDIN } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import {useApolloClient } from '@apollo/client';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.barBackground,
    flexDirection: 'row',
    padding: 10,
    display: 'flex',
    // ...
  },
  text : {
    color: theme.colors.textThird,
    fontSize: theme.fontSizes.subheading,
    padding: 10
  
  }
});

const Repository = () => {
  return(
    <Pressable>
      <Link to ="/">
      <Text style={styles.text}>
        Repositories
      </Text>
      </Link>
      </Pressable>
  )
}
const SingIn = () => {
  return(
    <Pressable>
      <Link to ="/singIn">
      <Text style = {styles.text}>
      Sign in
      </Text>
      </Link>
    </Pressable>
  )
}

const SignUp = () => {
  return(
    <Pressable>
      <Link to ="/signUp">
      <Text style = {styles.text}>
      Sign Up
      </Text>
      </Link>
    </Pressable>
  )
}
const SingOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient()
  const clearUser = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();


  } 
  return(
    <Pressable onPress={clearUser}>
      <Text style={styles.text}>
        Sing out
      </Text>
    </Pressable>
  )
}
const Review = () => {
  return(
    <Pressable>
      <Link to ="/review">
      <Text style={styles.text}>
        Create a review
      </Text>
      </Link>
      </Pressable>
  )
}
const UsersReviews = () => {
  return(
    <Pressable>
      <Link to ="/UsersReviews">
      <Text style={styles.text}>
        My reviews
      </Text>
      </Link>
      </Pressable>
  )
}



const AppBar = () => {
  const {data} = useQuery(LOGGEDIN);
  let loggedIn = false ;
  
  loggedIn = !data?.me ? false : true

  //console.log(loggedIn)
  return <View style={styles.container}>
    <ScrollView horizontal>
    <Repository/>
    {!loggedIn &&
    <>
      <SingIn/>
      <SignUp/>
      </>
    }
    {loggedIn &&
    <>
      <Review/>
      <UsersReviews/>
      <SingOut/>
      </>
}
    

    </ScrollView>
    </View>;
};

export default AppBar;