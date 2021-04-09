
import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InfiniteScroll from 'react-infinite-scroller';
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from '@material-ui/core/Container';
import EditIcon from '@material-ui/icons/Edit';
import { TransitionProps } from '@material-ui/core/transitions';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import ProfileCard from './ProfileCard'
import QuestionForm from './QuestionForm'
import ProfilePop from './ProfilePop'

var URL = 'https://gr73qrcwnl.execute-api.us-east-1.amazonaws.com/v1/recommender/user'



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
    const [lastKey, setLast] = useState('null');
    const [hasMoreItems, setMore] = useState(true)
    const [OpenProfile, setOpenProfile] = React.useState(false);
    const [OpenAsk, setOpenAsk] = React.useState(false);
    const [selectedPersonId, setPersonId] = React.useState('null');
    const [selectedPersonName, setPersonName] = React.useState('null');
    function loadItems() {
        var headers = {
            "Access-Control-Allow-Headers": "*",
            'token': props.token.id_token,
            'access_token': props.token.access_token,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            'Content-Type':  'application/json',
            'Access-Control-Allow-Credentials' : 'true',
        }
        if (lastKey != 'null'){
            headers['last_key'] = lastKey
        }
        fetch(URL, {
            method: 'GET',
            headers: headers
        })
        .then(res => res.json())
        .then(datum => {
            // console.log(datum);
            const newData = data.concat(datum.data);
            setData(newData);
            if (datum.LastEvaluatedKey){
                setLast(datum.LastEvaluatedKey.user_id)
            } else{
                setMore(false);
            }
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
    
    function handleProfileClose() {
        setOpenProfile(false);
        setPersonId('null');
    }
    function handleAskClose(){
        setOpenAsk(false);
        setPersonId('null');
        setPersonName('null');
    }
    const loader = <LinearProgress color="secondary" />

    var items: Array<any> = []
    // loadItems()
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
        <IconButton onClick={() => {handleAsk('null', 'null')}} className={classes.fabStyle}>
            <EditIcon color="secondary"/>
        </IconButton >
        </Container>
        <ProfilePop
        openStatus={OpenProfile}
        closeFunction={handleProfileClose}
        isDark={false}
        user_id={selectedPersonId}
        editable={false}
        token={props.token}
        />
        <Dialog
        fullWidth
        classes={{ paperFullWidth: classes.dialogCustomizedWidth }}
        open={OpenAsk}
        onClose={handleAskClose}
        TransitionComponent={Transition}
        >
        {
            (selectedPersonId == 'null')
            ?(
                <QuestionForm email={selectedPersonId} name={selectedPersonName} isDark={false} ask={true} tags={[]}/>
            )
            :(
                <QuestionForm email={selectedPersonId} name={selectedPersonName} isDark={false} ask={true} tags={[]}/>
            )
        }
        
        </Dialog>
        </div>
    )
}