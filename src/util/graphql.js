//import {gql} from '@apollo/client'
import gql from 'graphql-tag'
export const FETCH_POST_QUERY= gql`
query GetPosts{
    getPosts{
       id body createdAt username 
   likes{
       username
   }
   likeCount 
   comments{
       id body createdAt
   }
   commentCount
    }
   
}
`