import React,{useContext, useState} from 'react';
import {Form,Button} from 'semantic-ui-react'
import {useForm} from '../hooks'
import {gql, useMutation} from '@apollo/client'
import {useNavigate} from 'react-router'

import {AuthContext} from '../Context/auth'

function Login(props) {
    const navigate = useNavigate()
    const context = useContext(AuthContext);
    const[errors, setErrors] = useState({})

    const {onChange,onSubmit,values} = useForm(loginUserCallback, {
        username:'',
        password:'',
      
    })
    

const[loginUser,{loading}] = useMutation(LOGIN_USER,{
    update(_,{data:{login: userData}}){
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
function loginUserCallback(){
    
    loginUser()
    console.log('calling mutation')
}

    return ( 
        <div className='form-container'>
        <Form onSubmit={onSubmit} noValidate className={loading?'loading':''}>
            <h1>Login</h1>
            <Form.Input
            label='Username'
            placeholder='Enter username'
            name='username'
            type='text'
            value={values.username}
            //errors={errors.username?true:false}
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
            </Form>
            <Button type='submit'  primary style={{marginTop:10}} onClick={onSubmit}>Login</Button>
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
    )}
   const LOGIN_USER = gql`
   mutation login($username: String!, $password:String!){
       login(
       username:$username
       password:$password){
           id
           username
           email
           createdAt
           token
       }
   }
   `;
 
export default Login;