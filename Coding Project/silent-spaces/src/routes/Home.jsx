import './Home.scss';
import ideaCommons from '@assets/ideaCommons.jpg';
import students from '@assets/students.jpg';
import Lottie from 'lottie-react';
import animationData from '../assets/Animation - 1713849399915.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faLocationDot, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export function Home() {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/signup');
    };

    return (
        <div className="home">
            <section className="hero">
                <h1>Welcome to Silent Spaces</h1>
                <div className="animation">
                    <Lottie animationData={animationData} autoplay loop className="lottie-animation" />
                </div>
                <button className="start-button" onClick={handleGetStartedClick}>Get Started Here</button>
            </section>

            <section className="features">
                <div className="feature-item">
                    <h2>Our Purpose</h2>
                    <p>
                        We want to provide users with a seamless way to find and navigate to silent spaces around them to study, 
                        work, have meetings, gather with friends, and more!
                    </p>
                    <FontAwesomeIcon icon={faCompass} className="icon" />
                </div>

                <div className="feature-item">
                    <h2>Objectives</h2>
                    <p>
                        We aim to show users the noise level information in specific spaces around them. We want to provide 
                        accurate navigation using Google's fantastic navigation API. Providing user reviews and ratings for locations.
                    </p>
                    <FontAwesomeIcon icon={faLocationDot} className="icon" />
                </div>

                <div className="feature-item">
                    <h2>Features</h2>
                    <ul>
                        <li>Google Maps API</li>
                        <li>Posting Found Silent Spaces</li>
                        <li>Rating and Reviews of Locations</li>
                        <li>Community Contributions</li>
                        <li>Reserving Certain Spots</li>
                        <li>User-Friendly Interface</li>
                    </ul>
                    <FontAwesomeIcon icon={faMapLocationDot} className="icon" />
                </div>
            </section>

            <footer className="footer">
                <p>&copy; Silent Spaces. All rights reserved.</p>
            </footer>
        </div>
    );
}
