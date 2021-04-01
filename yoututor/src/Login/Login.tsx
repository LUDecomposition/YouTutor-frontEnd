import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
const AWS = require("aws-sdk");
AWS.config.region = 'us-east-1'
const URL = 'https://ccfinalsy2938.auth.us-east-1.amazoncognito.com/oauth2/userInfo';
// const client = new AWS.Lambda({ region: "us-east1" });
// import * as jsonwebtoken from 'jsonwebtoken';
// To federated sign in from Google

function getUrlVars() {
    let Token = {
        id_token: '',
        access_token: ''
    }
	var parts = window.location.href.match(/[?#&]+([^=&]+)=([^&]*)/gi)
    if (parts) {
        Token.id_token = parts[0].split('=')[1];
        Token.access_token =  parts[1].split('=')[1];
    }
    return Token
}


class Login extends React.Component {
    componentWillMount() {
        var token = getUrlVars()['access_token'];
        if (token != ''){
            var headers = {
                "Authorization": 'Bearer ' + token,
            };
            fetch(URL, {method:'get', headers:headers, mode: 'cors'})
            .then(response => response.json())
            .then(data => {
                if (data.email) {
                    window.sessionStorage.setItem('userToken', JSON.stringify(data));
                }
                window.location.href = '/'
            }
            )
        }
    }
    render() {
        return (<div></div>)
    }
}

export default Login;