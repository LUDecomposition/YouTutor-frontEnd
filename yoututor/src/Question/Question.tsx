import React, { useState } from 'react';

import Main from '../Main/Main'
import QuestionCards from '../Main/questionCards'
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InfiniteScroll from 'react-infinite-scroller';
import { DataUsage } from '@material-ui/icons';
import QuestionCard from '../Question/QuestionCard'
import Container from '@material-ui/core/Container';

var URL = 'http://localhost:8080/user/questions'


export default function Question(props: any) {
    const userToken = JSON.parse(props.userToken);
    const user_id = userToken.emial;
    const [page, setPage] = useState(0);
    const [data, setData] = useState<any[]>([])
    function loadItems() {
        fetch(URL, {
            method:'GET', 
            headers: {
                'page': JSON.stringify(page),
                'user_id': user_id,
                'first_name': userToken.given_name,
                'last_name': userToken.family_name
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
        var isOwner = (element.user == (userToken.given_name + ' ' + userToken.family_name))
        items.push(
            <ListItem key={element.question_id}>
                <div>
                    <QuestionCard information={element} isOwner={isOwner} isTutor={props.isTutor} />
                </div>
            </ListItem>
        )
        
    })
    return(
        <div>
        <Main text={
            'History'
            }
            isTutor={
                props.isTutor
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