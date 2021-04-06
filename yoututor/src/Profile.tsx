import React from 'react';
import Header from './Header'
import ProfileConent from './ProfileContent'
import { makeStyles, createStyles, Theme, ThemeProvider } from '@material-ui/core/styles';

function Profile(props){
    return(
        <div>
            <Header text={
            ''
            }
            isDark={
                props.isDark
            }
            />
            <div style={{marginTop:'2%'}}/>
            <ProfileConent token={props.token} 
                        isDark={props.isDark} 
                        email={props.token.email}
                        editable={true}
                        />
        </div>
    )
}

export default Profile