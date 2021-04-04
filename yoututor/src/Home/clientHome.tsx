import React from 'react';

import Main from '../Main/Main'
import QuestionCards from '../Main/questionCards'
import TutorCards from '../Main/tutorCards'

export default function ClientHome(props: any) {
    return(
        <div>
            <Main text={
                (props.isTutor)
                ?('Discover Questions')
                :('Find Tutors')
                }
                isTutor={
                    props.isTutor
                }
            />
        {
            (props.isTutor)
            ?(
                <QuestionCards />
            )
            :(
                <TutorCards />
            )
        }
        </div>
    )
}