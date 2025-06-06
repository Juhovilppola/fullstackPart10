import Text from './Text';
import { View, Pressable, TextInput, StyleSheet} from 'react-native';
import { useFormik } from 'formik';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from "react-router-native";

import * as yup from 'yup';
import useReview from '../hooks/useReview';

const styles = StyleSheet.create({
  container : {
    backgroundColor: 'white',
    display: 'flex',
    padding: 4
  },
  textinput : {
    borderStyle: 'solid',
    borderRadius: 10,
    margin:15,
    padding: 10,
    borderWidth: 1
  },
  textvalid : {
    borderColor:'#e1e4e8',
  },
  textInvalid: {
    borderColor:'#d73a4a'
  },
   button: {
    backgroundColor:'#0366d6',
    alignItems: 'center',
    padding: 15,
    margin:15,
    borderRadius: 10
   },
   

});

const initialValues = {
  repositoryName: '',
  repositoryOwner: '',
  rating: '',
  review:''

};

const validationSchema = yup.object().shape({
  repositoryOwner: yup
    .string()
    .required('Repository owner name is required is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number().min(0).max(100)
    .required('Rating is required'),
  review: yup
  .string()

    

});

const ReviewForm = ({onSubmit}) => {

    const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  
 return (
    <View style={styles.container}>
      <TextInput style={[styles.textinput, formik.touched.repositoryOwner && formik.errors.repositoryOwner ? styles.textInvalid : styles.textvalid]}
      placeholder="Repository owner name"
      value={formik.values.repositoryOwner}
      onChangeText={formik.handleChange('repositoryOwner')}
      />
        {formik.touched.repositoryOwner && formik.errors.repositoryOwner && (
        <Text style={{ color: 'red', paddingLeft: 15 }}>{formik.errors.repositoryOwner}</Text>
      )}
       <TextInput style={[styles.textinput, formik.touched.repositoryName && formik.errors.repositoryName ? styles.textInvalid : styles.textvalid]}
      placeholder="Repository name"
      value={formik.values.repositoryName}
      onChangeText={formik.handleChange('repositoryName')}
      />
        {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: 'red' , paddingLeft: 15}}>{formik.errors.repositoryName}</Text>
      )}
       <TextInput style={[styles.textinput, formik.touched.rating && formik.errors.rating ? styles.textInvalid : styles.textvalid]}
      placeholder="rating"
      value={formik.values.rating}
      onChangeText={formik.handleChange('rating')}
      />
        {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: 'red' , paddingLeft: 15}}>{formik.errors.rating}</Text>
      )}
       <TextInput style={[styles.textinput, formik.touched.review && formik.errors.review ? styles.textInvalid : styles.textvalid]}
      placeholder="review"
      value={formik.values.review}
      onChangeText={formik.handleChange('review')}
      />
        {formik.touched.review && formik.errors.review&& (
        <Text style={{ color: 'red' , paddingLeft: 15}}>{formik.errors.review}</Text>
      )}
      <Pressable  style={styles.button} onPress={formik.handleSubmit}>
        <Text color='textThird'  fontSize='subheading'>Create a review</Text>
      </Pressable>

    </View>
  )

}

const Review = () => {
  console.log('reviewpage')
  const navigate = useNavigate();
  const [reviewItem] = useReview();

  const onSubmit = async (values) => {
    const { repositoryOwner, repositoryName, rating, review } = values;

    try {
      const {data} = await reviewItem({ repositoryOwner, repositoryName, rating, review});
      console.log(data.createReview.repositoryId);
      console.log("??????")
      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewForm onSubmit={onSubmit}/>;
}


export default Review;