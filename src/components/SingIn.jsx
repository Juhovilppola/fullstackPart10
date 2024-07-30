
import Text from './Text';
import { View, Pressable, TextInput, StyleSheet} from 'react-native';
import { useFormik } from 'formik';

import * as yup from 'yup';

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
  username: '',
  password: '',

};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignInForm = ({onSubmit}) => {

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  
  return (
    <View style={styles.container}>
      <TextInput style={[styles.textinput, formik.touched.username && formik.errors.username ? styles.textInvalid : styles.textvalid]}
      placeholder="Username"
      value={formik.values.username}
      onChangeText={formik.handleChange('username')}
      />
        {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red', paddingLeft: 15 }}>{formik.errors.username}</Text>
      )}
       <TextInput style={[styles.textinput, formik.touched.password && formik.errors.password ? styles.textInvalid : styles.textvalid]}
      placeholder="Password"
      secureTextEntry={true}
      value={formik.values.password}
      onChangeText={formik.handleChange('password')}
      />
        {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red' , paddingLeft: 15}}>{formik.errors.password}</Text>
      )}
      <Pressable  style={styles.button} onPress={formik.handleSubmit}>
        <Text color='textThird'  fontSize='subheading'>Sing in</Text>
      </Pressable>

    </View>
  )
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return <SignInForm onSubmit={onSubmit}/>;
}


export default SignIn;