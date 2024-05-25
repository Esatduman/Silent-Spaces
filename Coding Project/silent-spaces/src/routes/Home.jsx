import "./Home.scss";
import ideaCommons from "@assets/ideaCommons.jpg"
import students from "@assets/students.jpg"
import Lottie from 'lottie-react';
import animationData from '../assets/Animation - 1713849399915.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersViewfinder } from '@fortawesome/free-solid-svg-icons';
import { faCompass } from '@fortawesome/free-solid-svg-icons';




export function Home() {

    return <>

    

    <div class = "div1">
     
        <h1>Welcome to <br></br> Silent Spaces</h1>
        <div className="animation">
        <Lottie animationData={animationData} autoplay loop className="lottie-animation"/>
        </div>
        <button class="Start_Button">Get Started</button>
        
    </div>
    
    
        <div class = "container_attributes">
        <div class = "text_1">
            <h2 class="text-box">Our Purpose</h2>
            <p class = "purpose">
                We want to provide users a seamles ways to find and navigate to silent spaces
                around them to study, work, have meetings, gathering with friends, and more!
            </p>    
            <FontAwesomeIcon icon={faCompass} className="purpose-icon" />
            {/* <img src={ideaCommons} class = "picture1"></img>  */}
        </div>

    
        <div class = "text_2">
            {/* <img src={students} class = "picture2"></img> */}
            <h2 class="text-box">Objectives</h2>
            <p class = "paragraph-right"> 
                
            </p>

        </div>



        <div class = "text_3">
        <h2 class="text-box">Features</h2>


        </div>

    </div>
    
   
    
    </> 
    
}
