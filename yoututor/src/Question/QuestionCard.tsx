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
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function QuestionCard(props: any) {
    var button:any = null;
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
            background: (props.isTutor)
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
            // marginLeft: (props.isOwner) 
            //             ?('2%')
            //             :('7%')
        },
    avatars: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        },
    }),
    );
    const classes = useStyles();
    
    // console.log(history);
    return (
    <Card className={classes.root}>
        <CardContent>
        <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
            <Grid item xs={4}>
                <Avatar alt={props.information.user} 
                src="/" className={classes.avatars}/>
            </Grid>
            <Grid item xs={5}>
                <Typography gutterBottom variant="subtitle1">
                    {props.information.title}
                </Typography>
            </Grid>
            <Grid item xs={3}>
                {
                    (props.information.tutor != null)
                    ?(<Avatar alt={props.information.tutor}
                        src="/" className={classes.avatars}/>)
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
            <Grid item xs={2}>
            <Typography variant="body2" color="textSecondary">
                    {props.information.time}
            </Typography>
            </Grid>
            <Grid item xs={10}>
            <Typography variant="body2" color="textSecondary">
                    {props.information.status}
                </Typography>
            </Grid>
            
            <Grid item xs={2}>
            {
                (button != null)
                ?(
                    <Button variant="outlined" size="small">{button}</Button>
                )
                :(
                    <div/>
                )
            }
            </Grid>
            
        </Grid>
        </CardContent>
    </Card>
    );
}