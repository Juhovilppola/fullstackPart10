import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme'
import { Link } from "react-router-native";

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
const Sing = () => {
  return(
    <Pressable>
      <Link to ="/singIn">
      <Text style = {styles.text}>
      Sing in
      </Text>
      </Link>
    </Pressable>
  )
}

const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView horizontal>
    <Repository/>
    <Sing/>
    </ScrollView>
    </View>;
};

export default AppBar;