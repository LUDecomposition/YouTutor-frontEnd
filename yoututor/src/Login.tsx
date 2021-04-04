import React from 'react';

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
    var token = getUrlVars()['access_token'];
    if (token != ''){
        var headers = {
            "Authorization": 'Bearer ' + token,
        };
        fetch(URL, {method:'get', headers:headers, mode: 'cors'})
        .then(response => response.json())
        .then(data => {
            if (data.email) {
                props.login(data);
                window.sessionStorage.setItem('userToken', JSON.stringify(data));
            }
            window.location.href = '/'
        }
        )
    }
    return (
        <div/>
    )
}