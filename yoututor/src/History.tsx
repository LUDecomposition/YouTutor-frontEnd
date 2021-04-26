import React, { useState } from 'react';
import Header from './Header'
import StudentHistory from './StudentHistory'
import TutorHistory from './TutorHistory'
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