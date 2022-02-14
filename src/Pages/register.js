import React, {useContext,useState} from 'react';
import {Form,Button} from 'semantic-ui-react'
import {gql, useMutation} from '@apollo/client'
import {useForm} from '../hooks'
import {AuthContext} from '../Context/auth'
import {useNavigate} from 'react-router'
//import {onError} from '@apollo/client/link/error'

function Register(props) {
    const navigate = useNavigate();
    const context = useContext(AuthContext)
const[errors, setErrors] = useState({})

    const {onChange,onSubmit,values} = useForm(registerUser, {
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    

const[addUser,{loading}] = useMutation(REGISTER_USER,{
    update(_,{data: {register: userData}}){
        console.log(userData)
        context.login(userData)
        navigate('/')
    },
    onError(err){
        
           console.log(err.graphQLErrors[0].extensions.errors)
            setErrors(err.graphQLErrors[0].extensions.errors)
        
    },
    variables: values
})
function registerUser(){
    
    addUser()
}

    return ( 
        <div className='form-container'>
        <Form onSubmit={onSubmit} noValidate className={loading?'loading':''}>
            <h1>Register</h1>
            <Form.Input
            label='Username'
            placeholder='Enter username'
            name='username'
            type='text'
            value={values.username}
          // errors={errors.username?true:false}
            onChange={onChange}
            />
            <Form.Input
            label='Email'
            placeholder='Enter email'
            name='email'
            type='email'
            value={values.email}
           // errors={errors.email?true:false}
            onChange={onChange}
            />
            <Form.Input
            label='Password'
            placeholder='Enter password'
            name='password'
            type='password'
            value={values.password}
            //errors={errors.password?true:false}
            onChange={onChange}
            />
            <Form.Input
            label='Confirm Password'
            placeholder='confirm password'
            name='confirmPassword'
            type='password'
            value={values.confirmPassword}
            //errors={errors.confirmPassword?true:false}
            onChange={onChange}
            />
        <Button type='submit' primary>Register</Button>
        </Form>
        {Object.keys(errors).length > 0 && 
        <div className='ui error message'>
            <ul className='list'>
                {Object.values(errors).map((value)=>(
                <li key={value}>{value}</li>
                ))}
            </ul>
        </div>
        }
        </div>
     );
};
const REGISTER_USER = gql`
mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
){
    register(
        registerInput:{
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        }
    ){
        id email username createdAt token
    }
}
`
 
export default Register;