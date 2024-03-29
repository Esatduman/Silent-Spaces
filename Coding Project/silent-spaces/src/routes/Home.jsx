import "./Home.scss";
import ideaCommons from "@assets/ideaCommons.jpg"
import students from "@assets/students.jpg"

export function Home() {
    return <>

    <div class = "div1">
        <h1 class = "title">Silent Spaces Locator</h1>
        <h2 class = "name">By CS440 Group 5: Esat Duman, Jonathan Juarez, Kent Lizardo, Jose Tejeda</h2>
        <h3 class = "objective">What is the purpose of Silent Spaces Locator?</h3>
    </div>

    <div class = "div2">
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
    </div>

    <h4 class = "header-right">Who is Silent Spaces for?</h4>
    
    <div class = "div3">
        <img src={students} class = "picture2"></img>

        <p class = "paragraph-right"> 
            High school and higher education students, looking for a place to attend their online
            classes or study and do their homework will download this application. Additionally,
            adults who work remotely or travel for work can benefit in downloading this mobile
            application. Silent Spaces Locator will aid students and workers in finding the best
            quiet location for their needs. The role of the user in our application is to update the
            ratings of the location by helping us gather information through their smartphone
            devices. The technical requirement to use the application is minimal with a basic
            understanding of how to use a smartphone device
        </p>

    </div>

    <></>
    </> 
}
