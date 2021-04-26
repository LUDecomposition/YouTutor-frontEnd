import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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
import { useEffect } from 'react';

var URL = 'https://gr73qrcwnl.execute-api.us-east-1.amazonaws.com/v1/search/user'
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
export default function SearchTutor(props:any) {
    const [data, setData] = useState<any[]>([])
    const [hasMoreItems, setMore] = useState(true)
    const [OpenProfile, setOpenProfile] = React.useState(false);
    const [OpenAsk, setOpenAsk] = React.useState(false);
    const [selectedPersonId, setPersonId] = React.useState('null');
    const [selectedPersonName, setPersonName] = React.useState('null');
    const [dataKey, setdataKey] = useState<string[]>([]);
    function loadItems() {
        var headers = {
            "Access-Control-Allow-Headers": "*",
            'token': props.token.id_token,
            'access_token': props.token.access_token,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            'Content-Type':  'application/json',
            'Access-Control-Allow-Credentials' : 'true',
            "keywords": props.keywords
        }
        fetch(URL, {
            method: 'GET',
            headers: headers
        })
        .then(res => res.json())
        .then(datum => {
            if (datum.data) {
                if (hasMoreItems && datum.data.length > 0){
                    if (!dataKey.includes(datum.data[0].user_id)) {
                        const newKey = data.concat(datum.data[0].user_id);
                        setdataKey(newKey)
                        const newData = data.concat(datum.data);
                        setData(newData)
                    }
                }
            }
        })
        .then(
            () => {
                setMore(false);
            }
        )
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
    useEffect(
        () => {
            setData([]);
            setdataKey([]);
            setMore(true);
        },[props.keywords]
    )
    loadItems()
    var items = data.map(
        element => (
            <ListItem key={element.user_id}>
            <ProfileCard profile={element} handleAsk={handleAsk} handleProfile={handleOpenProfile}/>
            </ListItem>
        )
    )
    const classes = useStyles();
    return(
        <div>
        <Container maxWidth="lg">
        <List>
            {items}
        </List>
        {
            (hasMoreItems)
            ?(
                <LinearProgress color="secondary" />
            )
            :(
                <div/>
            )
        }
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
                <QuestionForm 
                aws={props.aws}
                token={props.token}
                email={'Null'} 
                name={'Null'} 
                isDark={false} 
                ask={true}
                close={handleAskClose}
                tags={[]}/>
            )
            :(
                <QuestionForm 
                token={props.token}
                email={selectedPersonId} 
                name={selectedPersonName}
                isDark={false} 
                ask={true}
                close={handleAskClose}
                tags={[]}/>
            )
        }
        
        </Dialog>
        </div>
    )
}