import { StyleSheet, View, Image, Pressable } from 'react-native';
import Text from './Text';
import { useNavigate } from 'react-router-native';
import * as Linking from 'expo-linking';


const styles = StyleSheet.create({
  container : {
    backgroundColor: 'white',
    display: 'flex',
    
  },
  image : {
    width: 50,
    height: 50,
    padding: 30,
    marginRight: 15
  },
  rowWithImage: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
  
  },
  rowitem: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-evenly',
    flex: 1 ,
    flexWrap: 'wrap',
    alignContent: 'flex-start'
    
    
},
 firstColumn: {
  flexDirection: 'column',
  padding: 1,
  alignItems: 'baseline',
  flexWrap: 'wrap',
  flex: 1
 },
 column: {
  flexDirection: 'column',
  padding: 1,
 },
 item: {
  textAlign: 'center',
  
  
 },
 button: {
  backgroundColor: '#0366d6',
  borderRadius: 5,
  margin: 10,
  padding: 15,
},
});



const RepositoryItem = ({item, single}) => {
  const navigate = useNavigate();
  //console.log(item);

  const rounder =  (number) => {
    if(number > 999) {
    const roundedNumber = number / 1000
    return roundedNumber.toFixed(1) + 'k'
    }
    return number

  }

 return(
  <Pressable onPress={() => { {item.id && navigate(`/repository/${item.id}`)} }}>
      <View style={styles.container} testID="repositoryItem">
      <View style={styles.rowWithImage}>
        <Image 
        style={styles.image}
        source={{uri: item.ownerAvatarUrl}}/>
        <View style={styles.firstColumn}>
        <Text fontWeight='bold'>{item.fullName}</Text>
      <Text style={{ flexShrink: 1 }} color='textSecondary'>{item.description}</Text>
      <Text color='textThird' backgroundColor='#0366d6' >{item.language}</Text>
        </View>
        </View>
        <View style={styles.rowitem}>
          <View style={styles.column}>
          <Text  style={styles.item} fontWeight="bold">{rounder(item.stargazersCount)}</Text>
          <Text color='textSecondary'>Stars</Text> 
          
          </View>
          <View style={styles.column}>
          <Text style={styles.item} fontWeight="bold">{rounder(item.forksCount)}</Text>
          <Text color='textSecondary'>Forks</Text> 
          </View>
          <View style={styles.column}>
          
          <Text style={styles.item} fontWeight="bold">{item.reviewCount}</Text>
          <Text color='textSecondary'>Reviews</Text> 
          </View>
          <View style={styles.column}>
           
          <Text style={styles.item} fontWeight="bold">{item.ratingAverage}</Text>
          <Text color='textSecondary'>Rating</Text>
          </View>
     </View> 
     {single == true? <Pressable onPress={() => { Linking.openURL(item.url) }}>
                <View style={styles.button}>
                    <Text style={styles.item} color='textThird'>Open in GitHub</Text>
                </View>
            </Pressable>: null }
   </View>
   </Pressable>
      
     
 );
    
  
};

export default RepositoryItem;