
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
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

import ProfileConent from './ProfileContent'

import QuestionCard from './QuestionCard'

var URL = 'http://localhost:8080/user/recom_questions'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogCustomizedWidth: {
            'max-width': '100%',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            }
    }))
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
return <Slide direction="left" ref={ref} {...props} />;
});

export default function StudentHome(props:any) {
    const [data, setData] = useState<any[]>([])
    const [page, setPage] = useState(0);
    const [hasMoreItems, setMore] = useState(true)
    const [open, setOpen] = React.useState(false);
    const [selectedQuestion, setQuestion] = React.useState('null');
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
    function handleHelpOpen(user_id: string) {
        setOpen(true);
        setQuestion(user_id);
    }
    function handleHelpClose(user_id: string) {
        setOpen(false);
        setQuestion('null');
    }
    const loader = <LinearProgress color="secondary" />
    var items: Array<any> = []
    data.forEach(element => {
        items.push(
            <ListItem key={element.question_id}>
            <QuestionCard information={element} isOwner={false} isDark={true} isRecom={true} handleHelp={handleHelpOpen}/>
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
        </Container>
        <Dialog
        fullWidth
        classes={{ paperFullWidth: classes.dialogCustomizedWidth }}
        open={open}
        onClose={handleHelpClose}
        TransitionComponent={Transition}
        >
        <ProfileConent token={props.token} 
                        isDark={true} 
                        email={selectedQuestion}
                        editable={false}
                        />
        </Dialog>

        </div>
    )
}