import '../css/about.css'
// SpeechToText.js
import g from '../assessts/gemini.jpg'
// import App from './animation'
const about = () =>
{
    return(
        <div className="about">
                  <img className="g" src={g} alt='loading...'/>
<iframe className="i" width="560" height="315" src="https://www.youtube.com/embed/_TVnM9dmUSk?si=r3Sdn65kD1L4gnKu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
           
        </div>
    );

}
export default about;