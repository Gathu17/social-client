import React,{ useContext} from 'react';
import {Card,Image,Button, Icon,Label} from 'semantic-ui-react';
import moment from 'moment';
import {Link} from 'react-router-dom'
import {AuthContext} from '../Context/auth'
import LikeButton from './Likebutton'
import DeleteButton from './DeleteButton'
import MyPopup from '../util/Popup'

 function Postcard({post: {id,body,username,createdAt,likes,likeCount,commentCount}}){
const {user} = useContext(AuthContext);
  
 
  return(
    <Card fluid>
    <Card.Content>
      <Image
        floated='right'
        size='mini'
        src='https://react.semantic-ui.com/images/avatar/large/molly.png'
      />
      <Card.Header>{username}</Card.Header>
      <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
      <Card.Description>
        {body}
      </Card.Description>
    </Card.Content>
    <Card.Content extra className='buttons'>
      <div className='ui two buttons'>
     <LikeButton user={user} id={id} likes={likes} likeCount={likeCount}/>
    <MyPopup content='Comment on post'>
    <Button  labelPosition='right' as={Link} to={`/posts/${id}`}>
      <Button basic color='blue' width='6px'>
        <Icon name='comments' />
        
      </Button>
      <Label basic color='blue' pointing='left'>
        {commentCount}
      </Label>
    </Button>
    </MyPopup>
      </div>
      {user&&user.username===username&&(
      <DeleteButton postId={id}/>
    )}
    </Card.Content>
  </Card>
  )
    
}
export default Postcard;

