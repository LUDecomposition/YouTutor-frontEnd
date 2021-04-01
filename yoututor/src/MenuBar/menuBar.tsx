import React from 'react';
import { makeStyles, createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import { Route, Redirect, useHistory} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import { purple } from '@material-ui/core/colors';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import HomeIcon from '@material-ui/icons/Home';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import CreateIcon from '@material-ui/icons/Create';
import Switches from '../Switch/Switch'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Box from '@material-ui/core/Box';
import HelpIcon from '@material-ui/icons/Help';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
const useStyles = makeStyles((theme) => ({
root: {
flexGrow: 1,
},
menuButton: {
marginRight: theme.spacing(2.5),
},
title: {
flexGrow: 1,
},
}));

const Login = () =>{
    window.location.href='https://ccfinalsy2938.auth.us-east-1.amazoncognito.com/login?client_id=1d1mb2ktfap98hgif1iigjb9fk&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:3000/login';}

const Logout = () =>{
    window.sessionStorage.clear()
    window.location.href='/home'
}
// const toProfile = () =>{
//     window.location.href='/profile'
// }

export default function ButtonAppBar(props: any) {
    const classes = useStyles();
    const userToken = (props.userToken != null)
    const isTutor = props.isTutor;
    const history = useHistory();
    var primaryColor = '';
    var secondaryColor = '';
    if (userToken) {
        if (isTutor) {
            primaryColor = '#333333'
            secondaryColor = '#ffffff'
        } else {
            primaryColor = '#dc95ee'
            secondaryColor = '#7687d4'
        }
    } else {
        primaryColor = '#9492ef'
        secondaryColor = '#ffffff'
    }
    const theme = createMuiTheme({
        palette: {
            primary: {
            main: primaryColor,
            },
            secondary: {
            main: secondaryColor,
            },
        },});

    return (
    <ThemeProvider theme={theme}>
        <div className={classes.root}>
            <AppBar position="static">
            <Toolbar>
                <Box m="auto">
                <Button 
                onClick={() => {history.push('/')}}>
                <h2 style={{fontFamily:'Righteous', color:(userToken)?((isTutor)?'#ffffff':'#000000'):'#ffffff'}}>YouTutor</h2></Button> 
                </Box>
                <Typography variant="h6" className={classes.title}>
                </Typography>
                <Box mr={2}>
                {
                    userToken?
                    (
                        <Switches isTutor={isTutor} onChange={props.switchRole}/>
                    )
                    :(
                        <div/>
                    )
                }
                </Box>
                <Box mx="auto">
                {
                    userToken?
                    (
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                        onClick={() => {history.push('/question')}}
                        >
                        <HelpIcon />
                        </IconButton>
                    )
                    :(
                        <div/>
                    )
                }
                {
                    userToken?
                    (<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" 
                    onClick={() => {history.push('/profile')}}>
                    <PersonIcon />
                    </IconButton>)
                    :(<IconButton edge="start" className={classes.menuButton} color="secondary" aria-label="menu" onClick={Login}>
                    <CreateIcon />
                    </IconButton>)
                }
                {
                    userToken?
                    (
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={Logout}>
                        <PowerSettingsNewIcon />
                        </IconButton>
                    )
                    :(<div/>)
                }
                </Box>
                
            </Toolbar>
            </AppBar>
        </div>
    </ThemeProvider>
    );}