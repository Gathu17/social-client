import React, { useState,useEffect } from 'react';
import {gql,useMutation} from '@apollo/client'
import {Link} from 'react-router-dom'
import {Button,Icon,Label} from 'semantic-ui-react'

import MyPopup from '../util/Popup'


function LikeButton({user,likes,id,likeCount}) {
    const [liked,setLiked] = useState(false)
 
    useEffect(() => {
        if(user && likes && likes.find((like) => like.username===user.username)){
            setLiked(true)
           
        }else setLiked(false)
    },[user,likes])

    const [likePost] = useMutation(LIKE_POST,{
        variables: {postId: id}
    })

    const likeButton = user? liked ? (
        <Button color='red'>
        <Icon name='heart' />
        
      </Button>
    ):(
        <Button color='red' basic>
      <Icon name='heart' />
      
    </Button>
    ) : (
        <Button as={Link} to='/login' color='red' basic>
      <Icon name='heart' />
      
    </Button>
    )
   return (
    <Button as='div' labelPosition='right' onClick={likePost}>
      <MyPopup content={liked?'Unlike':'Like'}>
        {likeButton}
      </MyPopup>
       
    <Label as='a' basic color='red' pointing='left'>
      {likeCount}
    </Label>
  </Button>
   ) 
}
const LIKE_POST = gql`
mutation LikePost($postId:ID!){
    likePost(postId: $postId){
        id
        likes{
            id
            username
        }
        likeCount
    }
}
`;
export default LikeButton;