import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function Header(props:any) {
    const useStyles = makeStyles({
        root: {
            borderRadius: 0,
            boxShadow: "none",
        },
        header:{
            fontSize: 24,
            fontFamily: 'New Tegomin',
            marginTop: '15%',
            marginLeft: '1%'
        }
        });
    const classes = useStyles();
    return (
    <Card className={classes.root} style={{background:(props.isDark)
                                            ?'#333333'
                                            :'linear-gradient(to bottom, #dc95ee, #ffffff)'}}>
        <Container maxWidth="lg">
        <CardContent>
        <Typography component='header' className={classes.header}>
            <h2>{props.text}</h2>
        </Typography>
        </CardContent>
        </Container>
    </Card>
);}