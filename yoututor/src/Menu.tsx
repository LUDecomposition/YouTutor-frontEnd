import React, { useState } from 'react';
import {fade, makeStyles, createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import { Redirect, useHistory} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import CreateIcon from '@material-ui/icons/Create';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { useEffect } from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Switch from '@material-ui/core/Switch';
import ForumIcon from '@material-ui/icons/Forum';
const Login = () =>{
    window.location.href='https://ccfinalsy2938.auth.us-east-1.amazoncognito.com/login?client_id=1d1mb2ktfap98hgif1iigjb9fk&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://sad-lewin-ba81ae.netlify.app/login';
}

function Switches(props: any) {
    return (
        <div>
            <Switch
            checked={props.isDark}
            onChange={props.onChange}
            name="isDark"
            inputProps={{ 'aria-label': 'primary checkbox'}}
            id='switch'
            />         
        </div>
    );
}


export default function Menu(props: any) {
    const [toShow, setShow] = useState(true);
    useEffect(() => {
        setShow(true);
    },[])
    const handleNavigation = (e: { currentTarget: any; }) => {
        const window = e.currentTarget
        if (window.scrollY == 0) {
            setShow(true)
        } else{
            setShow(false)
        }
    }
    window.addEventListener('scroll', e => handleNavigation(e));
    const isLogin = (props.token != 'null')
    const isDark = props.isDark;
    const useStyles = makeStyles((theme) => ({
        root: {
        border: 'None',
        flexGrow: 1,
        },
        menuButton: {
        marginRight: theme.spacing(2.5),
        },
        title: {
        flexGrow: 1,
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        }},
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
        color: 'inherit',
        },
        inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
        },
    }));
    const classes = useStyles();
    const history = useHistory();
    var primaryColor = '';
    var secondaryColor = '';
    if (isLogin) {
        if (isDark) {
            primaryColor = '#333333'
            secondaryColor = '#ffffff'
        } else {
            primaryColor = '#dc95ee'
            secondaryColor = '#000000'
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
    const [searchWords, setSearch] = useState('');

    
    return (
    <ThemeProvider theme={theme}>
        <div className={classes.root}>
            <AppBar position="fixed" elevation={0} color="transparent">
            <Container maxWidth="lg">
            <Toolbar>
                {
                    toShow
                    ?(
                        <Box display="inline">
                        <Button 
                        onClick={() => {setSearch('');history.push('/')}}>
                        <h2 style={{fontFamily:'Righteous', color:(isLogin)?((isDark)?'#ffffff':'#000000'):'#ffffff'}}>YouTutor</h2></Button> 
                        </Box>
                    )
                    :(
                        <div/>
                    )
                }
                {
                    (isLogin && toShow)?
                    (
                    <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <form onSubmit={
                        (e) => {
                            if (searchWords !== ''){
                                history.push(
                                    {
                                        pathname: '/search',
                                        search: '?q='+searchWords,
                                        state:{
                                            q:searchWords
                                        }
                                    }
                                );
                                e.preventDefault();
                            }
                        }
                    }>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                            }}
                            value={searchWords}
                            onChange={(e) => {setSearch(e.target.value)}}
                        />
                    </form>
                    </div>
                    )
                    :(
                        <div/>
                    )
                }
                <Typography variant="h6" className={classes.title}>
                </Typography>
                <Box display="inline">
                {
                    isLogin?
                    (
                        <Switches isDark={isDark} onChange={props.switchRole}/>
                    )
                    :(
                        <div/>
                    )
                }
                </Box>
                <Box mx="auto" display="inline">
                {
                    isLogin?
                    (
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                        onClick={() => {setSearch('');history.push('/history')}}
                        >
                        <ForumIcon />
                        </IconButton>
                    )
                    :(
                        <div/>
                    )
                }
                {
                    isLogin?
                    (<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" 
                    onClick={() => {setSearch('');history.push('/profile')}}>
                    <PersonIcon />
                    </IconButton>)
                    :(<IconButton edge="start" className={classes.menuButton} color="secondary" aria-label="menu" 
                        onClick={Login}>
                    <CreateIcon />
                    </IconButton>)
                }
                {
                    isLogin?
                    (
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                        onClick={() => {
                            props.logout();
                            <Redirect to='/'/>
                        }}>
                        <PowerSettingsNewIcon />
                        </IconButton>
                    )
                    :(<div/>)
                }
                </Box>
                
            </Toolbar>
            </Container>
            </AppBar>
        </div>
    </ThemeProvider>
    );}