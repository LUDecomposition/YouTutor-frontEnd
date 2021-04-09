import React from 'react';
import { Router, Route, Switch , Redirect} from 'react-router-dom';
const URL = 'https://ccfinalsy2938.auth.us-east-1.amazoncognito.com/oauth2/userInfo';

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
export default function (props:any) {
    var token = getUrlVars()
    var access_token = token.access_token;
    var id_token = token.id_token
    if (access_token != ''){
        var headers = {
            "Authorization": 'Bearer ' + access_token,
        };
        fetch(URL, {method:'get', headers:headers, mode: 'cors'})
        .then(response => response.json())
        .then(data => {
            if (data.email) {
                data.id_token = id_token
                data.access_token = access_token
                props.login(data);
                window.sessionStorage.setItem('accessToken', access_token)
                window.sessionStorage.setItem('idToken', access_token)
                // window.sessionStorage.setItem('credential', JSON.stringify(id_token));
                // window.sessionStorage.setItem('userToken', JSON.stringify(data));
            }
            // window.location.href = '/'
        }
        )
    }
    return (
        <Redirect to='/'/>
    )
}