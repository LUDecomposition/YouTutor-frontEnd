import React, { useState } from 'react';
import { useEffect } from 'react';
import Register from './Register'
import CircularProgress from '@material-ui/core/CircularProgress';

const URL = 'https://ccfinalsy2938.auth.us-east-1.amazoncognito.com/oauth2/userInfo';

const LOGIN = 'https://gr73qrcwnl.execute-api.us-east-1.amazonaws.com/v1/login'

const COGNITO='https://ccfinalsy2938.auth.us-east-1.amazoncognito.com/login?client_id=1d1mb2ktfap98hgif1iigjb9fk&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://sad-lewin-ba81ae.netlify.app/login'



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
// eslint-disable-next-line import/no-anonymous-default-export
export default function (props:any) {

    const [registered, setRegister] = useState(true);
    const [loading, setLoading] = useState(true);
    const [preLoginToken, setToken] = useState({
                                            user_id:'', 
                                            picture:'',
                                            given_name:'',
                                            family_name:''
                                            });
    
    function preLogin(token:string, access_token:string) {
        Promise.all([fetch(LOGIN,
            {
                method:'GET',
                headers: {
                    "Access-Control-Allow-Headers": "*",
                    "token": token,
                    "access_token": access_token,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET",
                    'Content-Type':  'application/json',
                    'Access-Control-Allow-Credentials' : 'true',
                }
            } 
        ).then(res=>res.json()),
        fetch(URL, {method:'get', headers : {
            "Authorization": 'Bearer ' + access_token,
        }}).then(res=>res.json())
        ])
        .then(
            res => {
                const datum = res[1];
                if (datum.email) {
                    datum.user_id = datum.email;
                    datum.id_token = id_token;
                    datum.access_token = access_token;
                    if (res[0]) {
                        props.login(datum);
                        window.location.href = './';
                    } else {
                        setToken(datum);
                        setLoading(false);
                        console.log(loading)
                    }
                } else{
                    props.login('null');
                    window.location.href = COGNITO
                }
            }
        )
    }
    function handleClose(){
    }

    var token = getUrlVars()
    var access_token = token.access_token;
    var id_token = token.id_token

    useEffect(
        () => {
            preLogin(id_token, access_token)
        }
    ,[])
    return (
        <div>
        {
            (loading)
            ?(
                <CircularProgress color="secondary" />
            )
            :(
                <Register 
                openStatus = {!loading}
                closeFunction={handleClose}
                isDark={false}
                profile={{
                    availability: [], 
                    tags:[],
                    first_name: preLoginToken.given_name,
                    last_name: preLoginToken.family_name,
                    user_id: preLoginToken.user_id,
                    tutor: false,
                    school: '',
                    degree: '',
                    picture: preLoginToken.picture,
                    major: '',
                    introduction: '',
                    gender: 'F'
                    }}
                isRegister={true}
                token={preLoginToken}
                close={handleClose}
                reload={()=>{window.location.href='./'}}
            />
            )
        }
        </div>
    )
}