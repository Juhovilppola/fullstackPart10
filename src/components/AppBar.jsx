import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.barBackground,
    // ...
  },
  text : {
    color: theme.colors.textThird,
    font: theme.fontSizes.subheading,
    padding: 10
  }
});

const Press = () => {
  return(
    <Pressable>
      <Text style={styles.text}>
        Repositories
      </Text>
      </Pressable>
  )
}

const AppBar = () => {
  return <View style={styles.container}>
    <Press/>
    </View>;
};

export default AppBar;