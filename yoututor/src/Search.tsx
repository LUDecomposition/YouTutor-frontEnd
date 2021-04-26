import React from 'react';
import Header from './Header'
import SearchQuestion from './SearchQuestion'
import SearchTutor from './SearchTutor'



export default function Search(props: any) {
    return(
        <div>
            <Header text={
                (props.isDark)
                ?('Search Questions')
                :('Search Tutors')
                }
                isDark={
                    props.isDark
                }
                token={
                    props.token
                }
            />
            {
                (props.isDark)
                ?(
                    <SearchQuestion token={props.token} keywords={props.location.state.q}/>
                )
                :(
                    <SearchTutor token={props.token} keywords={props.location.state.q}/>
                )
            }
        </div>
    )
}