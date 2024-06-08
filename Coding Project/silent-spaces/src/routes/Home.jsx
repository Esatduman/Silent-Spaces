import "./Home.scss";
import ideaCommons from "@assets/ideaCommons.jpg"
import students from "@assets/students.jpg"
import Lottie from 'lottie-react';
import animationData from '../assets/Animation - 1713849399915.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons';
import {faMapLocationDot} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate



export function Home() {

    const navigate = useNavigate(); // Use useNavigate hook

    const handleGetStartedClick = () => {
        navigate('/signup'); // Navigate to signup page
    }
    return <>

    

    <div className = "div1">
     
        <h1>Welcome to <br></br> Silent Spaces</h1>
        <div className="animation">
        <Lottie animationData={animationData} autoplay loop className="lottie-animation"/>
        </div>
        <button className="Start_Button" onClick= {handleGetStartedClick}>Get Started Here</button>
        
    </div>
    
    
        <div class = "container_attributes">
        <div class = "text_1">
            <h2 class="text-box">Our Purpose</h2>
            <p class = "purpose">
            We want to provide users with a seamless way to find and navigate to silent spaces around them to study, 
            work, have meetings, gather with friends, and more!
            </p>    
            <FontAwesomeIcon icon={faCompass} className="purpose-icon-1" />
            {/* <img src={ideaCommons} class = "picture1"></img>  */}
        </div>

    
        <div class = "text_2">
            {/* <img src={students} class = "picture2"></img> */}
            <h2 class="text-box">Objectives</h2>
            <p class = "paragraph-right"> 
            We aim to show users the noise level information in specific spaces around them. We want to provide 
 accurate navigation using Google's fantastic navigation API. Providing user reviews and ratings for locations.
            </p>
            <FontAwesomeIcon icon={faLocationDot}  className="obj-icon"/>
        </div>



        <div class = "text_3">
        <h2 class="text-box">Features</h2>
            <ul>
                <li>Google Maps API</li>
                <li>Posting Found silent spaces</li>
                <li>Rating and reviews of locations</li>
                <li>Community contributions</li>
                <li>Reserving certain spots</li>
                <li>User friendly interface</li>
            </ul>
            <FontAwesomeIcon icon={faMapLocationDot} className="purpose-icon"/>
        </div>

    </div>
    
    <footer className="footer">
        <div clasName="footer-content">
        <p>&copy; Silent-Spaces. All rights reserved.</p>

        </div>
     </footer>
    
    </> 
    
}
