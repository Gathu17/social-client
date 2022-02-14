import React,{useContext} from 'react';
import { useQuery} from '@apollo/client'
import { Grid,Transition } from 'semantic-ui-react';
import PostCard from '../components/Postcard'
//import  from 'graphql-tag';
import {AuthContext} from '../Context/auth'
import PostForm from '../components/Postform'
import {FETCH_POST_QUERY} from '../util/graphql'

function Home() {
    const {user} = useContext(AuthContext)
    const {loading, data} = useQuery(FETCH_POST_QUERY);

    return ( 
        
    <Grid columns={3} divided>
    <Grid.Row className='page-title'>
        <h1>Recent Posts</h1>
    </Grid.Row>
    <Grid.Row>
        {user && (
            <Grid.Column>
                <PostForm/>
            </Grid.Column>
        )}
        {loading?(<h1>Loading...</h1>):(<Transition.Group>{data&& data.getPosts.map(post => 
       ( <Grid.Column key={post.id} style={{marginBottom:20}}>
        <PostCard post={post}/>
     </Grid.Column>))
     }</Transition.Group>)}
    </Grid.Row>
   </Grid>
     );
};

 
export default Home;