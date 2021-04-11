import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Link from '@material-ui/core/Link';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function QuestionCard(props: any) {
    var button:any = null;
    if (props.isRecom) {
        button = 'help'
    } else{
        if (!props.isOwner) {
            if (props.information.status == 'confirmed') {
                button = 'cancel'
            }
        } else {
            if (props.information.status != 'finished' && props.information.status != 'canceled') {
                button = 'cancel'
            } else {
                if (props.information.status == 'canceled') {
                    button = 'repost'
                }
            }
        }
    }
    let chips: Array<any> = [];
    props.information.tags.forEach(
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
            background: (props.isDark)
                        ?((button!=null)
                        ?(
                            (props.isOwner)
                            ?('#333333')
                            :('#424242')
                        ):(
                            '#000000'
                        )
                        )
                        :((button!=null)
                        ?(
                            (props.isOwner)
                            ?('linear-gradient(to right bottom, #e54ce5, #f7cc66)')
                            :('linear-gradient(to right bottom, #817bf7, #ed7bf3)')
                        )
                        :(
                            '#ffffff'
                        )),
        },
    avatars: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        },
    }),
    );
    const classes = useStyles();
    return (
    <Card className={classes.root}>
        <CardContent>
        <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
            <Grid item xs={4}>
                {
                    (props.isRecom || !props.isOwner)
                    ?(
                        <Button
                        size="small"
                        onClick={() => {props.handleProfile(props.information.user_id)}}
                        >
                        <Avatar alt={props.information.user} 
                        src={props.information.user_picture} className={classes.avatars}/>
                        </Button>
                    )
                    :(
                        <Avatar alt={props.information.user} 
                        src={props.information.user_picture} className={classes.avatars}/>
                    )
                }
            </Grid>
            <Grid item xs={5}>
                <Typography gutterBottom variant="subtitle1">
                    {props.information.title}
                </Typography>
            </Grid>
            <Grid item xs={3}>
                {
                    (props.information.tutor != null)
                    ?(
                    <Button
                    size="small"
                    onClick={() => {props.handleProfile(props.information.tutor_id)}}
                    >
                        <Avatar alt={props.information.tutor}
                        src={props.information.tutor_picture}
                        className={classes.avatars}/>
                    </Button>)
                    :(
                        < div/>
                    )
                }
            </Grid>
            <Grid item xs={9}>
                <Typography variant="body1">
                    {props.information.user}
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="body1">
                    {props.information.tutor}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                    {props.information.detail}
                </Typography>
            </Grid>
            <Grid item xs={10}>
                {chips}
            </Grid>
            {
                (props.isRecom)
                ?(
                    <div></div>
                )
                :(
                    <Grid item xs={2}>
                    <Typography variant="body2" color="textSecondary">
                            {props.information.time}
                    </Typography>
                    </Grid>
                )
            }
            
            {
                (props.isRecom)
                ?(
                    <div/>
                )
                :(
                    <Grid item xs={10}>
                <Typography variant="body2" color="textSecondary">
                        {props.information.status}
                    </Typography>
                </Grid>
                )
            }
            <Grid item xs={2}>
            {
                (button != null)
                ?(
                    (button == 'help')
                    ?(
                        <Button 
                        variant="outlined" 
                        size="small"
                        onClick={() => {props.handleHelp(
                            props.information.question_id,
                            props.information.created_at,
                            props.information.user_id,
                            props.information.user,
                            props.information.title,
                            props.information.detail,
                            props.information.attachment,
                            props.information.tags
                            )}}
                        >
                        {button}
                        </Button>
                    )
                    :(
                        <Button 
                        variant="outlined" 
                        size="small"
                        >
                        {button}
                        </Button>
                    )
                )
                :(
                    <div/>
                )
            }
            </Grid>
            {
                (props.information.attachment)
                ?(
                <Grid item xs={12}>
                <Typography variant='body2' color='textSecondary'>
                    <a href={props.information.attachment}>attachment</a>
                </Typography>
                </Grid>
                )
                :(
                    <div/>
                )
            }
        </Grid>
        </CardContent>
    </Card>
    );
}