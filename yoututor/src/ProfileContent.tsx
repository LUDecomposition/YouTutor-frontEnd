import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
var URL = 'http://localhost:8080/user/get_user'
export default function ProfileContent(props) {
    const [profile, setProfile] = useState({
        availability: [], 
        tags:[],
        first_name: 'null',
        last_name: 'null',
        user_id: 'null',
        tutor: false,
        school: 'null',
        degree: 'null',
        picture: 'null',
        major: 'null',
        introduction: 'null'
        });
    const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card:{
            background: (props.isDark) ?('#333333') :('#ffffff'),
        },
        picContainer: {
        display: 'flex',
        '& > *': {
            marginLeft: theme.spacing(4),
            marginTop: theme.spacing(4),
        },},
        icon: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        },
        name: {
            marginTop: theme.spacing(6)
        },
        details: {
            background: (props.isDark) ?('#303030') :('#f2f3f5'),
            margin: theme.spacing(4)
        },
        content:{
            margin: theme.spacing(2)
        },
        contexHeader: {
            marginLeft: theme.spacing(4),
            marginTop: theme.spacing(.5)
        },
        contexBody: {
            marginLeft: theme.spacing(8),
            marginRight: theme.spacing(8),
            marginTop: theme.spacing(.5)
        },
        button:{
            margin: theme.spacing(4)
        }
    }),
    );
    const classes = useStyles();
    const [value, setValue] = useState(new Date)
    useEffect( () => {
        fetch(URL, {
            method:'GET', 
            headers: {
                'user_id': props.email,
            }
        })
        .then(resp => resp.json())
        .then(datum => {
            setProfile(datum)
        });
        // return () ={}; 
    },[])
    let availabilities: Array<any> = [];
    if (profile.availability) {
        profile.availability.forEach(
            function(timeslot: string) {
                availabilities.push(
                    <Grid item xs={3}>
                    <Chip 
                    label={timeslot} 
                    variant="outlined" 
                    color="primary"
                    /></Grid>)
            }
        )
    }
    let tags: Array<any> = [];
    if (profile.tags){
        profile.tags.forEach(
            function(tag: string){
                tags.push(
                    <Grid item xs={2}>
                    <Chip 
                    label={tag} 
                    variant="outlined" 
                    color="secondary"
                    /></Grid>
                )
            }
        )
    }
    return (
        <div>
        <Container maxWidth='md'>
        <Card className={classes.card}>
            <Grid container spacing={2}>
            <Grid item xs={2}>
                <div className={classes.picContainer}>
                    <Avatar 
                    alt = {profile.first_name + ' ' + profile.last_name}
                    src = {profile.picture}
                    className={classes.icon}
                    />
                </div>
            </Grid>
            
            <Grid item xs={8}>
                <Typography variant="h4" className={classes.name}>
                {profile.first_name + ' ' + profile.last_name}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Container maxWidth='md'>
                    <Card className={classes.details}>
                        <Grid container spacing={2} direction="row" className={classes.content}>
                            <Grid item xs={12}>
                                <Typography variant="body2" className={classes.contexHeader} color="textSecondary">
                                    email / user id
                                </Typography>
                                <Typography variant="body1" className={classes.contexBody}>
                                    {profile.user_id}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" className={classes.contexHeader} color="textSecondary">
                                    school
                                </Typography>
                                <Typography variant="body1" className={classes.contexBody}>
                                    {profile.school}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" className={classes.contexHeader} color="textSecondary">
                                    degree
                                </Typography>
                                <Typography variant="body1" className={classes.contexBody}>
                                    {profile.degree}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" className={classes.contexHeader} color="textSecondary">
                                    major
                                </Typography>
                                {<Typography variant="body1" className={classes.contexBody}>
                                    {(profile.major == null) ?('N/A') :(profile.major)}
                                </Typography>}
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" className={classes.contexHeader} color="textSecondary">
                                    discovered as tutor
                                </Typography>
                                <Typography variant="body1" className={classes.contexBody}>
                                    {(profile.tutor)?('Yes'):('No')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" className={classes.contexHeader} color="textSecondary">
                                    introduction
                                </Typography>
                                <Typography variant="body1" className={classes.contexBody}>
                                    {profile.introduction}
                                </Typography>
                            </Grid>
                            {
                                (profile.tutor)
                                ?(
                                <Grid item xs={12}>
                                <Typography variant="body2" className={classes.contexHeader} color="textSecondary">
                                    weekly availabilities
                                </Typography>
                                <Typography variant="body1" className={classes.contexBody}>
                                    <Grid container spacing={1}>
                                    {availabilities}
                                    </Grid>
                                </Typography>
                                </Grid>
                                )
                                :(
                                    <div/>
                                )
                            }
                            <Grid item xs={12}>
                                <Typography variant="body2" className={classes.contexHeader} color="textSecondary">
                                    tags
                                </Typography>
                                <Typography variant="body1" className={classes.contexBody}>
                                    {
                                        (tags.length>0)
                                        ?(
                                            <Grid container alignItems="flex-start" justify="flex-start">
                                            {tags}
                                            </Grid>
                                        )
                                        :(
                                            <div>{'N/A'}</div>
                                        )
                                    }
                                    
                                </Typography>
                            </Grid>
                            
                        </Grid>
                    </Card>
                    <Grid container className={classes.button}>
                        <Grid item xs={10}/>
                            {
                                (props.editable)
                                ?(
                                    <div/>
                                )
                                :(
                                    <div/>
                                )
                            }
                        <Grid item xs={2}>
                            {
                                (props.editable)
                                ?(
                                <Button variant="outlined" size="small">
                                    edit
                                </Button>
                                )
                                :(
                                <Button variant="outlined" size="small">
                                    ask
                                </Button>
                                )
                            }
                            
                        </Grid>
                    </Grid>

                </Container>
            </Grid>
            </Grid>
        </Card>
        </Container>


        </div>
    )
}