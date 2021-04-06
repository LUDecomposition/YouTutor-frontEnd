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
import { TransitionProps } from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import QuestionForm from './QuestionForm'


import ProfilePop from './ProfilePop'
import QuestionCard from './QuestionCard'
var URL = 'http://localhost:8080/user/recom_questions'

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
    const [hasMoreItems, setMore] = useState(true);

    const [OpenProfile, setOpenProfile] = React.useState(false);
    const [selectedPersonId, setPersonId] = React.useState('null');
    const [ask, setAsk] = React.useState(false);

    const [name, setName] = React.useState('null');
    const [title, setTitle] = React.useState('null');
    const [detail, setDetail] = React.useState('null');
    const [attachment, setAttachment] = React.useState('null');
    const [tags, setTags] = useState<string[]>([])

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
    function handleProfileClose() {
        setOpenProfile(false);
        setPersonId('null');
    }
    function handleOpenHelp(
        user_id: string,
        name: string,
        title: string,
        detail: string,
        attachment: string,
        tags: string[]
    ) {
        setAsk(true);
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

    const loader = <LinearProgress color="secondary" />
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
        </Container>
        <ProfilePop
        openStatus={OpenProfile}
        closeFunction={handleProfileClose}
        isDark={true}
        user_id={selectedPersonId}
        editable={false}
        />
        <Dialog
        fullWidth
        classes={{ paperFullWidth: classes.dialogCustomizedWidth }}
        open={ask}
        onClose={handleHelpClose}
        TransitionComponent={Transition}
        >
        <QuestionForm
        isDark={true} 
        ask={false} 
        email={selectedPersonId} 
        name={name}
        title={title}
        detail={detail}
        attachment={attachment}
        tags={tags}
        />
        </Dialog>

        </div>
    )
}