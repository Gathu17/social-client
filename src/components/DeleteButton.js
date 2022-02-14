import React, {useState } from 'react';
import {gql,useMutation} from '@apollo/client'
import {Button,Icon,Confirm} from 'semantic-ui-react'
//import gql from 'graphql-tag'
import {FETCH_POST_QUERY} from '../util/graphql'
import MyPopup from '../util/Popup'

function DeleteButton({postId,commentId, callback}) {
    const[confirmOpen,setConfirmOpen] = useState(false)
    const mutation = commentId ? DELETE_COMMENT: DELETE_POST;
const [deletePost] = useMutation(mutation,{
  update(cache){
    console.log('deletePost')
    setConfirmOpen(false);
    if(callback) callback();
    if(!commentId){
      const data = cache.readQuery({
        query: FETCH_POST_QUERY
      })
  
    
    
    
    let newData = data.getPosts
      newData = data.getPosts.filter(p => p.id !== postId)
      cache.writeQuery({query:FETCH_POST_QUERY, 
        data:{getPosts:newData}})
    }
   
      //if(cache.writeQuery({query:FETCH_POST_QUERY, 
        //data:{getPosts:{data.getPosts.filter(p => p.id !== postId)}}})){console.log('writen')}}
  },
    variables: {postId,commentId} 
});
  return(
      <>
      <MyPopup content={commentId?'Delete comment':'Delete post'}>
      <Button as='div' color='red' size="small" floated='right' style={{marginRight: 10}} onClick={()=> setConfirmOpen(true)}>
        <Icon name='trash' style={{margin:0}}/>
      </Button>
      </MyPopup>
      <Confirm
      open={confirmOpen}
      onCancel={()=>setConfirmOpen(false)}
      onConfirm={deletePost}
      />
      </>
  )
};
const DELETE_POST = gql`
mutation deletePost($postId: ID!){
    deletePost(postId: $postId)
}
`;
const DELETE_COMMENT =gql`
mutation deleteComment($commentId: ID! $postId: ID!){
  deleteComment(commentId: $commentId postId: $postId){
    id
    commentCount
    comments{
      id username createdAt body
    }
  }
}
`
export default DeleteButton;