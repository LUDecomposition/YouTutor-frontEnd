import React, { useState } from 'react';
import Register from './Register'


export default function RegisterPage(props: any) {
    function handleClose(){
        window.location.href='/'
    }
    return (
        <div>
        <Register 
                    openStatus = {true}
                    closeFunction={handleClose}
                    isDark={false}
                    profile={{
                        availability: [], 
                        tags:[],
                        first_name: '',
                        last_name: '',
                        user_id: '',
                        tutor: false,
                        school: '',
                        degree: '',
                        picture: '',
                        major: '',
                        introduction: '',
                        gender: 'male'
                        }}
                    isRegister={false}
                    token={props.location.state.token}
                    close={handleClose}
                    reload={()=>{window.location.href='./'}}
        />
        </div>
    )
}