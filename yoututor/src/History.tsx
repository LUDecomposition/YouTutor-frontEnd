import React, { useState } from 'react';

import Header from './Header'
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InfiniteScroll from 'react-infinite-scroller';
import QuestionCard from './QuestionCard'
import Container from '@material-ui/core/Container';

var URL = 'http://localhost:8080/user/questions'

export default function History(props: any) {

    const [page, setPage] = useState(0);
    const [data, setData] = useState<any[]>([])
    function loadItems() {
        fetch(URL, {
            method:'GET', 
            headers: {
                'page': JSON.stringify(page),
                'user_id': props.token.email,
                'first_name': props.token.given_name,
                'last_name': props.token.family_name
            }
        })
        .then(res => res.json())
        .then(datum => 
            {   
                const newData = data.concat(datum);
                setData(newData)
                setPage(page+1)
            }
            )
    }
    const loader = <LinearProgress color="secondary" />
    var items: Array<any> = []
    data.forEach(element => {
        var isOwner = (element.user == (props.token.given_name + ' ' + props.token.family_name))
        items.push(
            <ListItem key={element.question_id}>
                    <QuestionCard information={element} isOwner={isOwner} isDark={props.isDark} />
            </ListItem>
        )
        
    })
    return(
        <div>
        <Header text={
            'History'
            }
            isDark={
                props.isDark
            }
        />
        <Container maxWidth='lg' style={{textAlign: 'center'}}>
            <List>
            {
                <InfiniteScroll
                pageStart={0}
                loadMore={loadItems}
                hasMore={true}
                loader={loader}>
                {items}
                </InfiniteScroll>
            }
            </List>
        </Container>
        </div>
    )
}