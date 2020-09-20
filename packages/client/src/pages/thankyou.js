import React, {Component} from 'react';
import Lottie from 'react-lottie';
import animationData from '../lotties/celebrate';
import SubmitButton from "../components/submitButton";
import './thankyou.css';

const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

export default class Thankyou extends Component  {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout ()  {
        localStorage.clear();
        this.props.history.push("/");
    };

    render() {
        return (
            <div>
                <div className="background">
                    <Lottie
                        options={lottieOptions}
                        width={300}
                    />
                </div>
                <div onClick={this.logout} className="message">
                    <SubmitButton text={"Logout and try again !"}/>
                </div>
            </div>
        );
    }
}
