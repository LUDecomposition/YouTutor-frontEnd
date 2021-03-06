
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

export default function ProfileCard(props: any) {
    
    let chips: Array<any> = [];
    props.profile.tags.forEach(
        function(value: any) {
            chips.push(<Chip label={value} size="small" variant="outlined"/>)
            if (chips.length > 5) {
                chips.shift();
            }
        }
    )
    const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width:'60%',
        },
    avatars: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        },
    button: {

    }
    }),
    );
    const classes = useStyles();
    // console.log(history);
    return (
    <Card className={classes.root}>
        <CardContent>
        <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
            <Grid item xs={2}>
            <Button size="small" onClick={() => {props.handleProfile(props.profile.user_id)}}>
                <Avatar alt={props.profile.first_name + ' ' + props.profile.last_name} 
                src={props.profile.picture} className={classes.avatars}/>
            </Button>
            </Grid>
            <Grid item xs={7}>
                <Typography gutterBottom variant="subtitle1">
                    {props.profile.first_name + ' ' + props.profile.last_name}
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="body2" gutterBottom>
                {props.profile.school}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2" gutterBottom>
                    <div>
                        {
                        (props.profile.degree == 'K12' || props.profile.degree ==  'Others')
                        ?(
                            props.profile.degree
                        )
                        :(
                            props.profile.degree + ' in ' + props.profile.major
                        )}
                    </div>
                    
                </Typography>
            </Grid>
            <Grid item xs={12} >
                <Typography variant="body2" color="textSecondary">
                    {props.profile.introduction}
                </Typography>
            </Grid>
            <Grid container justify="flex-start" xs={11} alignItems="center">
                {chips}
            </Grid>
            <Grid container justify="flex-end" xs={1} alignItems="flex-end">
                    <CardActions>
                    <Button variant="outlined" size="small" 
                    onClick={() => {props.handleAsk(props.profile.user_id, props.profile.first_name + ' ' + props.profile.last_name)}}>{'ask'}</Button>
                    </CardActions>
                </Grid>
        </Grid>
        </CardContent>
    </Card>
    );
}