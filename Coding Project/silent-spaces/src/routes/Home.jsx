import "./Home.scss";
import ideaCommons from "@assets/ideaCommons.jpg"

export function Home() {
    return <>

    <div class = "body">
        <h1 class = "title">Silent Spaces Locator</h1>
        <h2 class = "name">By CS440 Group 5: Esat Duman, Jonathan Juarez, Kent Lizardo, Jose Tejeda</h2>
            
            <h3 class = "objective">What is the purpose of Silent Spaces Locator?</h3>
            <p class = "home_purpose_text">
                The objective of this application is to gather GPS, time, and
                self-surveyed user data from smartphones to create a real-time
                network flow of certain locations all around Chicago, specifically 
                quiet work spaces. Our application aims to aid students and every-day 
                workers in finding the perfect location to work or study through a 
                real-time network and user interface. Based on the GPS and time information, 
                we can gather data and create a Headcount Network of users in a certain 
                location and provide an estimate to the user on how crowded a location is. 
                Additionally, through user surveyed data we can declare a space's Ambience 
                Level in a certain location so that the user can understand the noise level 
                at a location and see if it suits their particular needs as a work space 
                before arriving. Using all of this data gathered, we can construct a Space 
                Ambience Rating for each location to display to users looking for a space 
                to work or study.
            </p>

            <img src={ideaCommons} class = "picture1"></img>

            <h4 class = "temp">placeholder texxttt</h4>

    </div>
    </> 
}
