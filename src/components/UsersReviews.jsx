import Text from './Text';
import useMe from '../hooks/useMe'
import { FlatList, View, StyleSheet, Button, Alert } from 'react-native';
import ReviewItem from './ReviewItem';
import useDeleteReview from '../hooks/useDeleteReview';
//import { Button } from 'react-native-paper';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;



const UsersReviews = () => {

  const {user, refetch} = useMe();
  if(user===undefined){return(<></>)}
  console.log('userreveieses')
  console.log(user.me.reviews)

   const reviews = user.me.reviews
    ? user.me.reviews.edges.map(edge => edge.node)
    : [];

    console.log(reviews)

 
        


      

    const SingleReview = ({review, refetch}) => {
       const [deleteReview] = useDeleteReview();
      
      
      const navigate = useNavigate();

      const createTwoButtonAlert = () =>
        Alert.alert('Delete review',
          'Are you sure you want to delete this review', [{
            text: 'Cancel',
            onPress: () => console.log('Cancel pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => {deleteReview(review.id); navigate(`/`)}}
    
          ],

        )
        return(
          <>
          <ReviewItem review = {review}/>
          <Button onPress={() => navigate(`/repository/${review.repository.id}`)}title = 'View repository'/>
          <Button onPress={createTwoButtonAlert} title='Delete review' color='red'/>
          
          </>
        )

      
    }
  return(
    <FlatList
    data={reviews}
    renderItem={({ item }) => <SingleReview review={item} refetch={refetch} />}
    ItemSeparatorComponent={ItemSeparator}
    keyExtractor={item => item.id}
    />
  )
}

export default UsersReviews