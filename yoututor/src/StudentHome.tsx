
import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import InfiniteScroll from 'react-infinite-scroller';
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { TransitionProps } from '@material-ui/core/transitions';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import ProfileCard from './ProfileCard'
import ProfileConent from './ProfileContent'
import QuestionForm from './QuestionForm'

var URL = 'http://localhost:8080/user/recom_users'



const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
return <Slide direction="left" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogCustomizedWidth: {
            'max-width': '100%',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            },
        fabStyle:{
            bottom: theme.spacing(2),
            marginLeft: '70%',
            position: 'sticky',
            color:'secondary'
        }
    }))


export default function StudentHome(props:any) {
    const [data, setData] = useState<any[]>([])
    const [page, setPage] = useState(0);
    const [hasMoreItems, setMore] = useState(true)
    const [OpenProfile, setOpenProfile] = React.useState(false);
    const [OpenAsk, setOpenAsk] = React.useState(false);
    const [OpenPost, setOpenPost] = React.useState(false);
    const [selectedPersonId, setPersonId] = React.useState('null');
    const [selectedPersonName, setPersonName] = React.useState('null');
    function loadItems(page: number) {
        fetch(URL, {
            method: 'GET',
            headers:{
                'page': JSON.stringify(page),
                'user_id': JSON.stringify(props.token.email),
            }
        })
        .then(res => res.json())
        .then(datum => {
            const newData = data.concat(datum);
            setData(newData);
            setPage(page+1)
        })
    }
    function handleOpenProfile(user_id: string) {
        setOpenProfile(true);
        setPersonId(user_id);
    }
    function handleAsk(user_id: string, name: string) {
        setOpenAsk(true);
        setPersonId(user_id);
        setPersonName(name)
    }
    function handleOpenPost() {
        setOpenPost(true);
    }
    
    function handleProfileClose() {
        setOpenProfile(false);
        setPersonId('null');
    }
    function handleAskClose(){
        setOpenAsk(false);
        setPersonId('null');
        setPersonName('null');
    }
    function handlePostClose() {
        setOpenPost(false);
    }

    const loader = <LinearProgress color="secondary" />

    var items: Array<any> = []
    data.forEach(element => {
        items.push(
            <ListItem key={element.user_id}>
            <ProfileCard profile={element} handleAsk={handleAsk} handleProfile={handleOpenProfile}/>
            </ListItem>
        )
    })
    const classes = useStyles();
    return(
        <div>
        <Container maxWidth="lg">
        <List>
            {
                <InfiniteScroll
                pageStart={0}
                loadMore={loadItems}
                hasMore={hasMoreItems}
                loader={loader}>
                {items}
                </InfiniteScroll>
            }
        </List>
        <IconButton onClick={handleOpenPost} className={classes.fabStyle}>
            <EditIcon color="secondary"/>
        </IconButton >
        </Container>
        <Dialog
        fullWidth
        classes={{ paperFullWidth: classes.dialogCustomizedWidth }}
        open={OpenProfile}
        onClose={handleProfileClose}
        TransitionComponent={Transition}
        >
        <ProfileConent token={props.token} 
                        isDark={false} 
                        email={selectedPersonId}
                        editable={false}
                        />
        </Dialog>
        <Dialog
        fullWidth
        classes={{ paperFullWidth: classes.dialogCustomizedWidth }}
        open={OpenAsk}
        onClose={handleAskClose}
        TransitionComponent={Transition}
        >
        <QuestionForm email={selectedPersonId} name={selectedPersonName}/>
        </Dialog>
        <Dialog
        fullWidth
        classes={{ paperFullWidth: classes.dialogCustomizedWidth }}
        open={OpenPost}
        onClose={handlePostClose}
        TransitionComponent={Transition}
        >
        <QuestionForm/>
        </Dialog>
        </div>
    )
}