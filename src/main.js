import App from './App';
import Nav from './components/nav';
import Login from './login';
import About from './components/about';

import {
    BrowserRouter as Router,
    Routes,
    Route,
   }from "react-router-dom";

const Main = () =>
{
    return (

      
        <Router className="nav">
            <Nav />
            <Routes>

                <Route path="/" element={<App />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/login" element={<Login />}/>
               
                    
                
            </Routes>

        
        </Router>

    );
}

export default Main;