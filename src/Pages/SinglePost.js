
import React, { useContext,useState } from 'react';
import gql from 'graphql-tag';
import {useQuery,useMutation} from '@apollo/client'
import {Form,Card, Grid,Button,Icon,Label,Image } from 'semantic-ui-react';
import moment from 'moment';
import {useParams} from 'react-router-dom'
import {useNavigate} from 'react-router'

import {AuthContext} from '../Context/auth'
import DeleteButton from '../components/DeleteButton'
import LikeButton from '../components/Likebutton';
import { useRef } from 'react';



const SinglePost = (props) => {
    const {postId} = useParams()
    //const {postId} = props.match.params;
    //console.log(postId)
    const {user} = useContext(AuthContext)
    const commentRef = useRef(null)
    const [comment,setComment] = useState("")

    const {data} = useQuery(FETCH_POST_QUERY,{
        variables:  {postId:postId},
    })
    const navigate = useNavigate()
    function deletePostCallback(){
        navigate('/')
    }
    //console.log(data)
    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION,{
        update(){
           setComment('')
           commentRef.current.blur() 
        },
        variables: {postId,body:comment}
    })
    let postMarkup;
    if(!data){
        postMarkup = <p>Loading Post...</p>
    }else{
        const {id,body,username,createdAt,likes,likeCount,commentCount,comments} = data.getPost;
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                         size='small'
                         float='right'
                        src='https://react.semantic-ui.com/images/avatar/large/molly.png'/>
                          

                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                          <Card.Content>
                          <Card.Header>{username}</Card.Header>
                               <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description> 
                                  {body}
                                </Card.Description>
                          </Card.Content>
                          <Card.Content>
                              <LikeButton user={user} id={id} likes={likes} likeCount={likeCount} />
                              <Button as='div' labelPosition='right' >
                              <Button basic color='blue' width='6px'>
                                 <Icon name='comments' />
        
                             </Button> 
                                  <Label basic color='blue' pointing='left'>
                                  {commentCount}
                                  </Label>
    
                              </Button>
                             {user && user.username === username && (
                                  <DeleteButton postId={id} callback={deletePostCallback}/>
                             )} 
                             
                          </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                 <Form>
                                 <div className="ui action input field">
                                        <input
                                        type="text"
                                        placeholder='Comment...'
                                        name='comment'
                                        value={comment}
                                        onChange={event => setComment(event.target.value)}
                                        ref={commentRef}
                                        />
                                        <Button
                                        type="submit"
                                        className='ui button teal'
                                        disabled={comment.trim() === ''}
                                        onClick={submitComment}
                                        >Submit</Button>
                                    </div>
                                 </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments && comments.map(comment =>(
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                {user && user.username === username && (
                                  <DeleteButton postId={id} commentId={comment.id} />
                             )}
                                    <Card.Header>{comments.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                   
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    return ( 
     <div className='ui container'>
         {postMarkup}
     </div>
     );
}
const SUBMIT_COMMENT_MUTATION = gql`
mutation CreateComment($postId: ID!,$body: String!){
    createComment(postId: $postId, body: $body){
        id 
        comments{
            id username body createdAt
        }
        commentCount
    }
}
`
const FETCH_POST_QUERY = gql`
query GetPost($postId: ID!){
  getPost(postId:$postId){
      id body username createdAt
      likes{
          username
      }
      likeCount
      comments{
         id body username createdAt
      }
      commentCount
  }  
}

`
 
export default SinglePost;