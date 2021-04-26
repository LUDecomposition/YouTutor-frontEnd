import React, { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InfiniteScroll from 'react-infinite-scroller';
import Container from '@material-ui/core/Container';

import QuestionCard from './QuestionCard'
import ProfilePop from './ProfilePop'
import CancelPop from './CancelPop'

var URL = 'https://gr73qrcwnl.execute-api.us-east-1.amazonaws.com/v1/user/history'

export default function StudentHistory(props: any) {

    const [lastKey, setLast] = useState('null');
    const [data, setData] = useState<any[]>([])

    const [hasMoreItems, setMore] = useState(true)
    const [openUser, setOpenUser] = React.useState(false);
    const [selectedUser, setUser] = React.useState('null');

    const [openQuestion, setOpenQuestion] = React.useState(false);
    const [selectedQuestion, setQuestion] = React.useState('null');

    const [dataKey, setdataKey] = useState<string[]>([]);

    function loadItems() {
        fetch(URL, {
            method:'GET', 
            headers: {
                "Access-Control-Allow-Headers": "*",
                'token': props.token.id_token,
                'access_token': props.token.access_token,
                'is_ask': 'true',
                'last_key': lastKey,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                'Content-Type':  'application/json',
                'Access-Control-Allow-Credentials' : 'true',
            }
        })
        .then(res => res.json())
        .then(datum => 
            { 
            if (datum.data){
                if (hasMoreItems && datum.data.length > 0){
                    if (!dataKey.includes(datum.data[0].user_id)) {
                        const newKey = data.concat(datum.data[0].user_id);
                        setdataKey(newKey)
                        const newData = data.concat(datum.data);
                        setData(newData)
                    }
                }
                if (datum.LastEvaluatedKey){
                    setLast(JSON.stringify(datum.LastEvaluatedKey))
                } else{
                    setMore(false);
                }
            }
            }
        )
    }
    function resetItems(){
        setData([]);
        setdataKey([]);
        setLast('null');
        setLast('null');
        setMore(true);
        setOpenQuestion(false);
    }

    function handleUserOpen(user_id: string) {
        setOpenUser(true);
        setUser(user_id);
    }
    function handleUserClose(user_id: string) {
        setOpenUser(false);
        setUser('null');
    }
    function handleQuestionOpen(question_id: string, created_at: string) {
        setOpenQuestion(true);
        setQuestion(question_id + ' ' + created_at);
    }
    function handleQuestionClose(question_id: string) {
        setOpenQuestion(false);
        setQuestion('null');
    }

    
    const loader = <LinearProgress color="secondary" />

    var items = data.map(
        element => (
            <ListItem key={element.question_id}>
            <QuestionCard 
            information={element}
            isOwner={element.user_id === props.token.email} 
            isDark={false} 
            isRecom={false}
            handleProfile={handleUserOpen}
            handleCancel={handleQuestionOpen}
            token={props.token}
            reload={resetItems}
            />
            </ListItem>
        )
    )

    return(
        <div>
        <Container maxWidth='lg' style={{textAlign: 'center'}}>
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
            openStatus={openUser}
            closeFunction={handleUserClose}
            isDark={false}
            user_id={selectedUser}
            editable={false}
            token={props.token}
        />
        <CancelPop 
        token={props.token}
        question_keys={selectedQuestion}
        openStatus={openQuestion}
        handleClose={handleQuestionClose}
        reload={resetItems}
        />
        </div>
    )
}