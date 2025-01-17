import '../css/nav.css'
import t from '../assessts/t.png'
import l from '../assessts/login.png'
import a from '../assessts/about.png'
import h from '../assessts/house.png'
// import g from './gemini.jpg'
import { Link } from 'react-router-dom';


const Nav = () =>
{
    return (
        <div className="nav">
            <div className='head'><img className='logo' src={t} alt='loading...'/><p className='heading'>CODER'S CREED</p></div>
          
<div>
                <ul className='navList'>
                   
                    <li><Link className='lis' to='/'> <img className="h" src={h} alt='loading...'  />
                        </Link>
                    </li>
                    <li><Link className='lis' to='/about'>
                    <img className="a" src={a} alt='loading...'  /></Link>
                    </li>
                    <li><Link className='lis' to='/login'>
                    <img className="l" src={l} alt='loading...'  /></Link>
                    </li>
                <p className='greet'>Gemini AI is Google's most advanced AI model, designed to understand and interact with multiple data types including text, images, audio, and video. </p>
               
                </ul></div>

           
        </div>

    );
}
export default Nav;