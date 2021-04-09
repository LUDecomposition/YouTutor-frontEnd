import React, { useState } from 'react';

import Header from './Header'
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InfiniteScroll from 'react-infinite-scroller';
import Container from '@material-ui/core/Container';


import QuestionCard from './QuestionCard'
import ProfilePop from './ProfilePop'

var URL = 'https://gr73qrcwnl.execute-api.us-east-1.amazonaws.com/v1/user/history'

export default function StudentHistory(props: any) {

    const [lastKey, setLast] = useState('null');
    const [data, setData] = useState<any[]>([])

    const [hasMoreItems, setMore] = useState(true)
    const [openUser, setOpenUser] = React.useState(false);
    const [selectedUser, setUser] = React.useState('null');

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
                const newData = data.concat(datum.data);
                setData(newData)
                if (datum.LastEvaluatedKey){
                    setLast(JSON.stringify(datum.LastEvaluatedKey))
                } else{
                    setMore(false);
                }
            }
            )
    }

    function handleUserOpen(user_id: string) {
        setOpenUser(true);
        setUser(user_id);
    }
    function handleUserClose(user_id: string) {
        setOpenUser(false);
        setUser('null');
    }
    
    const loader = <LinearProgress color="secondary" />
    var items: Array<any> = []
    data.forEach(element => {
        var isOwner = (element.user_id === (props.token.email))
        items.push(
            <ListItem key={element.question_id}>
                    <QuestionCard information={element} 
                    isOwner={isOwner} 
                    isDark={false} 
                    isRecom={false}
                    handleProfile={handleUserOpen}
                    handleHelp={handleUserOpen}/>
            </ListItem>
        )
        
    })
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
        </div>
    )
}