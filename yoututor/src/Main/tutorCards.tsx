import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useAsync } from 'react-async';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ProfileCard from '../Profile/ProfileCard'
import Divider from '@material-ui/core/Divider';
import InfiniteScroll from 'react-infinite-scroller';
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from '@material-ui/core/Container';

var URL = 'http://localhost:8080/user/recom_users'

// export default function TutorCards(props: any) {
//     const userToken = JSON.parse(props.userToken);
//     const user_id = userToken.emial;
//     const [page, setPage] = useState(0);
//     const [data, setData] = useState<any[]>([])
//     function loadItems() {
//         fetch(URL, {
//             method:'GET', 
//             headers: {
//                 'page': JSON.stringify(page),
//                 'user_id': user_id,
//                 'first_name': userToken.given_name,
//                 'last_name': userToken.family_name
//             }
//         })
//         .then(res => res.json())
//         .then(datum => 
//             {   
//                 const newData = data.concat(datum);
//                 setData(newData)
//                 setPage(page+1)
//             }
//             )
//     }
//     const loader = <LinearProgress color="secondary" />
//     var items: Array<any> = []



// }
type state_type = {
    data:Array<any>, 
    hasMoreItems: boolean,
}

class TutorCards extends React.Component<{}, state_type> {

    constructor(props:any) {
        super(props);
        this.state = { 
            data: [],
            hasMoreItems: true,
            // items: []
        };
    }

    loadItems(page:number) {
        fetch(URL, {
            method:'GET', 
            headers: {'page': '10'},
        })
        .then(res => res.json())
        .then(datum => this.setState({data: this.state.data.concat(datum)}))
    }
    // componentDidCatch(){
    //     this.loadItems()
    // }
    render(){
        const loader = <LinearProgress color="secondary" />
        var items: Array<any> = []
        this.state.data.forEach(element => {
            items.push(
                <ListItem key={element.email}>
                    <ProfileCard profile={element} />
                </ListItem>
            )
        })
        // might be change promise in API deployment
        // var items: Array<any> = []
        // this.state.data.map(
        //     function(item: any) {
        //         items.push(
        //         <ListItem key={item.email}>
        //             <ProfileCard profile={item} />
        //         </ListItem>
        //         )
        //     }
        // )
        return (
            <Container maxWidth="lg">
            <List>
            {
                <InfiniteScroll
                pageStart={0}
                loadMore={this.loadItems.bind(this)}
                hasMore={this.state.hasMoreItems}
                loader={loader}>
                {items}
                </InfiniteScroll>
            }
            </List>
            </Container>
        )
    }
}

export default TutorCards