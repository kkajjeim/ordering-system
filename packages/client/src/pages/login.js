import React, {Component} from 'react';
import './form.css';
import SubmitButton from "../components/submitButton";
import FormLabel from "../components/formLabel";
import api from '../helper/api';
import { alertMessage } from '../helper/message';
import {Link} from "react-router-dom";

export default class Login extends Component {
    state = {
        email: '',
        password: '',
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = async (e) => {
        try {
            const response = await api('POST', '/login', this.state, 'application/json');
            const { accessToken } = await response.json();
            localStorage.setItem("accessToken", accessToken);
            this.props.history.push('/order');
        } catch(e) {
            const message = e === 401
                ? alertMessage.loginFailed
                : alertMessage.common;
            alert(message);
        }
    };

    render () {
        return (
            <div>
                <div className="auth_form">
                    <div className="form_inputs">
                        <FormLabel text="email"/>
                        <input
                            className="form_input"
                            value={this.state.email}
                            onChange={this.handleChange}
                            name="email"
                        />
                        <FormLabel text="password"/>
                        <input
                            className="form_input"
                            value={this.state.password}
                            onChange={this.handleChange}
                            name="password"
                            type="password"
                        />
                    </div>
                    <div onClick={this.handleSubmit}>
                        <SubmitButton text="Log In"/>
                    </div>
                    <div className="link">
                        <Link to="/signup" className="link">
                            New to Tacocat ? <i className="fas fa-cat"></i> Create an account </Link>
                    </div>
                </div>
            </div>
        )
    }
}
