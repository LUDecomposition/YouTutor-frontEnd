import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Header from './Header'
import StudentHome from './StudentHome'
import TutorHome from './TutorHome'
function PublicHome(props: any) {
    const useStyles = makeStyles({
        root: {
            minWidth: 275,
            background: 'linear-gradient(to bottom, #9492ef, #dc95ee)',
            borderRadius: 0,
            boxShadow: "none",
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 64,
            fontFamily: 'Amatic SC',
            color: '#ffffff',
            textAlign: 'center',
            marginTop: '20%'
        },
        pos: {
            marginBottom: 12,
        },
        footer: {
            marginTop: '55%'
        }
    });
    
    const classes = useStyles();
    return (
    <Card className={classes.root}>
        <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            <Box fontWeight="fontWeightBold">
                Your Place to Ask/Answer
            </Box>
        </Typography>
        </CardContent>
        <CardActions className={classes.footer}>
        </CardActions>
    </Card>
    );
}


function ClientHome(props: any) {
    return(
        <div>
            <Header text={
                (props.isDark)
                ?('Discover Questions')
                :('Find Tutors')
                }
                isDark={
                    props.isDark
                }
                token={
                    props.token
                }
            />
        {
            (props.isDark)
            ?(
                <TutorHome token={props.token}/>
            )
            :(
                <StudentHome token={props.token}/>
            )
        }
        </div>
    )
}




export default function Home(props: any) {
    const isLogin = (props.token != 'null')
    return(
        <div className="home">
        {
            isLogin?
            (
                <ClientHome isDark={props.isDark} token={props.token}/>
            )
            :(
                <PublicHome/>
            )
        }
        </div>
    )
}