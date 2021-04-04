import React from 'react';
import ClientHome from './clientHome'
import PublicHome from './publicHome'
export default function Home(props: any) {
    const isLogin = (props.userToken != null)
    return(
        <div className="home">
        {
            isLogin?
            (
                <ClientHome isTutor={props.isTutor}/>
            )
            :(
                <PublicHome/>
            )
        }
        </div>
    )
}


// class Home extends React.Component  {
// render(){
//         console.log(this.state)
//         return(
//             <div className="home">
//             {
//                 userToken?
//                 (
//                     <ClientHome/>
//                 )
//                 :(
//                     <div/>
//                 )
//             }
//             </div>
//         )
//     }
// }
// export default Home;