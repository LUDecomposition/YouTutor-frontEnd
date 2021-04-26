import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import { TransitionProps } from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import { useEffect } from 'react';
import QuestionForm from './QuestionForm'


import ProfilePop from './ProfilePop'
import QuestionCard from './QuestionCard'
var URL = 'https://gr73qrcwnl.execute-api.us-east-1.amazonaws.com/v1/search/question'

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


export default function SearchQuestion(props:any) {
    const [data, setData] = useState<any[]>([])
    const [hasMoreItems, setMore] = useState(true);

    const [OpenProfile, setOpenProfile] = React.useState(false);
    const [selectedPersonId, setPersonId] = React.useState('null');
    const [ask, setAsk] = React.useState(false);

    const [name, setName] = React.useState('null');
    const [title, setTitle] = React.useState('null');
    const [detail, setDetail] = React.useState('null');
    const [attachment, setAttachment] = React.useState('null');
    const [question_id, setQuestion] = React.useState('null');
    const [created_at, setCreatedAt] = React.useState('null');

    const [dataKey, setdataKey] = useState<string[]>([]);

    const [tags, setTags] = useState<string[]>([])

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
    function handleProfileClose() {
        setOpenProfile(false);
        setPersonId('null');
    }
    function handleOpenHelp(
        question_id: string,
        created_at: string,
        user_id: string,
        name: string,
        title: string,
        detail: string,
        attachment: string,
        tags: string[]
    ) {
        setAsk(true);
        setQuestion(question_id);
        setCreatedAt(created_at);
        setPersonId(user_id);
        setName(name);
        setTitle(title);
        setDetail(detail);
        setAttachment(attachment);
        setTags(tags)
    }
    function handleHelpClose() {
        setAsk(false);
        setPersonId('null');
        setName('null');
        setTitle('null');
        setDetail('null');
        setAttachment('null');
        setTags([])
    }
    function reloadPage(){
        setData([]);
        setMore(true);
    }
    useEffect(
        () => {
            setData([]);
            setdataKey([]);
            setMore(true);
        },[props.keywords]
    )
    loadItems();
    var items: Array<any> = []
    data.forEach(element => {
        items.push(
            <ListItem key={element.question_id}>
            <QuestionCard information={element} 
                            isOwner={false} 
                            isDark={true} 
                            isRecom={true} 
                            handleProfile={handleOpenProfile}
                            handleHelp={handleOpenHelp}
                            />
            </ListItem>
        )
    })
    const classes = useStyles()
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
        </Container>
        <ProfilePop
        openStatus={OpenProfile}
        closeFunction={handleProfileClose}
        isDark={true}
        user_id={selectedPersonId}
        editable={false}
        token={props.token}
        />
        <Dialog
        fullWidth
        classes={{ paperFullWidth: classes.dialogCustomizedWidth }}
        open={ask}
        onClose={handleHelpClose}
        TransitionComponent={Transition}
        >
        <QuestionForm
        token={props.token}
        isDark={true} 
        ask={false} 
        email={selectedPersonId} 
        name={name}
        title={title}
        detail={detail}
        attachment={attachment}
        tags={tags}
        question_id = {question_id}
        created_at = {created_at}
        close = {handleHelpClose}
        reload = {reloadPage}
        />
        </Dialog>

        </div>
    )
}