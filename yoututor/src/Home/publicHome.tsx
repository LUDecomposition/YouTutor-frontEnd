import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
const useStyles = makeStyles({
    root: {
        minWidth: 275,
        background: 'linear-gradient(to bottom, #9492ef, #dc95ee)',
        borderRadius: 0,
        boxShadow: "none"
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
        marginTop: '7%'
    },
    pos: {
        marginBottom: 12,
    },
    footer: {
        marginTop: '25%'
    }
});


export default function PublicHome(props: any) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
    <Card className={classes.root}>
        <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            <Box fontWeight="fontWeightBold">
                Your Place to Ask/Answer
            </Box>
        </Typography>
        {/* <Typography variant="h5" component="h2">
            
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
            adjective
        </Typography>
        <Typography variant="body2" component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
        </Typography> */}
        </CardContent>
        <CardActions className={classes.footer}>
        {/* <Button size="large">Learn More</Button> */}
        </CardActions>
    </Card>
    );
}