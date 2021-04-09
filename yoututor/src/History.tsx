import React, { useState } from 'react';

import Header from './Header'
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InfiniteScroll from 'react-infinite-scroller';
import Container from '@material-ui/core/Container';


import StudentHistory from './StudentHistory'
import TutorHistory from './TutorHistory'

var URL = 'https://gr73qrcwnl.execute-api.us-east-1.amazonaws.com/v1/user/history'

export default function History(props: any) {

    return(
        <div>
        <Header text={
            'History'
            }
            isDark={
                props.isDark
            }
        />
        {
            (props.isDark)
            ?(
                <TutorHistory token={props.token}/>
            )
            :(
                <StudentHistory token={props.token}/>
            )
        }
        </div>
    )
}