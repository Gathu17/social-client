import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';

//import {AuthRoute} from './util/AuthRoute'
import {AuthProvider} from './Context/auth'
import Menubar from './components/Menubar'
import Home from './Pages/home';
import Login from './Pages/login';
import Register from './Pages/register';
import { Container } from 'semantic-ui-react';
import  SinglePost from  './Pages/SinglePost'

function App() {
  return (
    <AuthProvider>
       <Menubar/>
       <Container>
         <BrowserRouter>
        <Routes>
      
        
      
      <Route exact path='/' element= {<Home/>}/>
      <Route  exact path='/login' element= {<Login/>}/>
      <Route  exact path='/register' element= {<Register/>}/> 
     <Route  exact path='/posts/:postId' element = {<SinglePost/>}/>
     
    </Routes>
    
    </BrowserRouter>
       </Container>
    
    </AuthProvider>
   
   
    
    
  );
};

export default App;
