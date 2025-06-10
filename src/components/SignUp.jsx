import Text from './Text';
import { View, Pressable, TextInput, StyleSheet} from 'react-native';
import { useFormik } from 'formik';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from "react-router-native";
import { useMutation} from '@apollo/client';

import * as yup from 'yup';
import { CREATE_USER } from '../graphql/mutations';

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
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters long')
    .max(30, 'Username must be less than 30 characters long'),

  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters long')
    .max(50, 'Password must be less than 50 characters long'),

  passwordConfirm: yup
  .string()
  .oneOf([yup.ref('password'), null],'Password confirmation must match the password')
  .required('Password confirm is required')

});

export const SignUpForm = ({onSubmit}) => {

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

       <TextInput style={[styles.textinput, formik.touched.passwordConfirm && formik.errors.passwordConfirm ? styles.textInvalid : styles.textvalid]}
      placeholder="Password confirmation"
      secureTextEntry={true}
      value={formik.values.passwordConfirm}
      onChangeText={formik.handleChange('passwordConfirm')}
      />
        {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={{ color: 'red' , paddingLeft: 15}}>{formik.errors.passwordConfirm}</Text>
          )}
      <Pressable  style={styles.button} onPress={formik.handleSubmit}>
        <Text color='textThird'  fontSize='subheading'>Sign up</Text>
      </Pressable>

    </View>
  )
};

const SignUp = () => {
  console.log('Sign up page')
  const navigate = useNavigate();
  const [mutate, result] = useMutation(CREATE_USER);
  const[signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await mutate({ variables: { user: { username, password } } });
      console.log(data);
     
      const {} = await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log('error code')
      console.log(e);
    }
  };

  return <SignUpForm onSubmit={onSubmit}/>;
}



export default SignUp;