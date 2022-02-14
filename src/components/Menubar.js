import React, { useContext,useState } from 'react'
import { Menu } from 'semantic-ui-react'
//import {Link} from 'react-router-dom';
import {AuthContext} from '../Context/auth'

function Menubar() {

  const {user, logout} = useContext(AuthContext)
  const [activeItem,setActiveItem] = useState('')

  const handleItemClick = (e, { name }) => setActiveItem( name)
  
  const menubar = user ? (
    <Menu pointing secondary size="massive" color="teal" >
          
            <Menu.Item
            name= {user.username}
            active={activeItem === user.username}
            onClick={handleItemClick}
            as='a'
            href='/'
             
          />
             
          
         <Menu.Menu position='right'>
           
             <Menu.Item 
            name='logout'
            active={activeItem === 'logout'}
            onClick={logout}
            
          
          />
           
          
          
            
          
           
          </Menu.Menu>
        </Menu>
  ):(
    <div>
        <Menu pointing secondary size="massive" color="teal" >
          
            <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as='a'
            href='/'
             
          />
             
          
         <Menu.Menu position='right'>
           
             <Menu.Item 
            name='Login'
            active={activeItem === 'Login'}
            onClick={handleItemClick}
            
            as='a'
            href='/login'
          />
           
          
          
             <Menu.Item
              name='Register'
              active={activeItem === 'Register'}
              onClick={handleItemClick}
              as='a'
              href='/register'
              
            />
          
           
          </Menu.Menu>
        </Menu>
      </div>
  )
  
    return menubar;
  }

export default Menubar;