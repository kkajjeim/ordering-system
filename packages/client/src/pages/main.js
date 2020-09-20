import React from 'react';
import Lottie from 'react-lottie';
import {Link} from 'react-router-dom';
import animationData from '../lotties/food';
import SubmitButton from "../components/submitButton";
import './main.css';


export default function Main()  {
    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div>
            <Lottie
                options={lottieOptions}
                height={400}
                width={400}
            />
            <Link to="/order" style={{ textDecoration: "none" }}>
                <SubmitButton text="Get Started"/>
            </Link>
        </div>
    );

}
