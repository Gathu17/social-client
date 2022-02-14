import React from 'react';
import {Form,Button} from 'semantic-ui-react'
import {useForm} from '../hooks';
import {gql,useMutation } from '@apollo/client'
import {FETCH_POST_QUERY} from '../util/graphql'


function PostForm(){

    const {values, onChange, onSubmit} = useForm(postCallback,{
        body: ''
    });
    let errors = '';

    const [createPost,{error} ] = useMutation(CREATE_POST, {
        variables: values,
        update(cache,{data:{createPost}}){
            console.log(createPost)
         const data = cache.readQuery({
            query: FETCH_POST_QUERY
          })

        //console.log(data)
        let newData= data.getPosts;
         newData = [ ...data.getPosts,createPost]
          cache.writeQuery({query:FETCH_POST_QUERY, 
            data:{...data, getPosts: newData}})
            values.body= '';
        },
        onError(err){
            
             errors = err.graphQLErrors[0].message
            console.log(errors)
        }
    })
    function postCallback(){
        createPost()
        
    }
 if(error){ console.log('error')}

    return(
       <>
        <Form onSubmit={onSubmit}>
           <h2>Create post</h2>
           <Form.Field>
               <Form.Input
               placeholder="Hi world!"
               name='body'
               onChange={onChange}
               value= {values.body}
              error= {errors?true:false}
               />
               <Button type='submit' color='teal'>Submit</Button>
           </Form.Field>
           
        </Form>
         { error && (
            <div className='ui error message'style={{marginBottom:20}}>
                <ul className='list'>
                    <li>{error.graphQLErrors[0].message}</li>
                </ul>
            </div>
         )}  
    
       </>
    )
}
const CREATE_POST = gql`
 mutation createPost($body:String!){
     createPost(body:$body){
         id body createdAt username
         likes{
             id username createdAt
         }
         likeCount
         comments{
             id body username createdAt
         }
         commentCount
     }
 }
`
export default PostForm;