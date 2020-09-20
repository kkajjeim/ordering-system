import React, {Component} from "react"
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ component: Component, ...props }) => {
    return (
        <Route
            {...props}
            render={innerProps => {
                const isAuthenticated = localStorage.getItem("accessToken");
                if (isAuthenticated) {
                    return <Component {...innerProps} />
                } else {
                    return <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: props.location}
                        }}
                    />
                }
            }}
        />
    )
};

export default PrivateRoute;
