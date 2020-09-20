import React, {Component} from 'react';
import './form.css';
import SubmitButton from "../components/submitButton";
import FormLabel from "../components/formLabel";
import api from '../helper/api';
import { alertMessage } from '../helper/message';

export default class Singup extends Component {
    state = {
        email: '',
        password: '',
        username: ''
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = async (e) => {
        try {
            await api('POST', '/signup', this.state, 'application/json');
            alert(alertMessage.singupSuccess);
            this.props.history.push('/login');
        } catch(e) {
            const message = e === 409
                ? alertMessage.duplicateEmail
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
                        <FormLabel text="username"/>
                        <input
                            className="form_input"
                            value={this.state.username}
                            onChange={this.handleChange}
                            name="username"
                        />
                    </div>
                    <div onClick={this.handleSubmit}>
                        <SubmitButton text="Create Account"/>
                    </div>
                </div>
            </div>
        )
    }
}
