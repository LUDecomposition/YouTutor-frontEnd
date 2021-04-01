import React, { useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
// import './App.css';
import Login from './Login/Login'
import Menu from './MenuBar/menuBar'
import Home from './Home/Home'
import Profile from './Profile/Profile'
import Question from './Question/Question'
import { createBrowserHistory } from 'history'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';


export const UserContext = React.createContext({
  email: 'null',
  family_name: 'null',
  given_name: 'null',
  logged_in: false
  });



// https://material-ui.com/zh/customization/palette/

const history = createBrowserHistory()
type states = {
  userToken: any,
  isTutor: any
}

class App extends React.Component<{}, states> {
  // state: { userToken: string | null; };
  constructor(props: any) {
    super(props);
    this.state = {
      userToken: window.sessionStorage.getItem('userToken'),
      isTutor: false
    }
    this.switchRole = this.switchRole.bind(this)
  }
  // theme =  () => {
  //   const mode = (this.state.isTutor) ? 'light' : 'dark'
  //   return createMuiTheme({
  //     palette: {
  //     type: 'light': 'dark',
  //     }})
  // }

  switchRole() {
    this.setState({ isTutor: !this.state.isTutor })
  }
  render() {
    const theme = createMuiTheme({
      palette: {
      type: (this.state.isTutor) ? 'dark' : 'light'
      }})
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router history={history}>
        <Menu userToken={this.state.userToken} isTutor={this.state.isTutor} switchRole={this.switchRole}/>
        <Switch>
        <Route exact path="/" 
            // component={Home}
            render={
              (props) =>
              <Home userToken={this.state.userToken} isTutor={this.state.isTutor} {...props}/>
            }
            />
            <Route exact path="/login" 
            component={Login}
            />
            <Route exact path="/profile" 
            render={
              (props) =>
              <Profile userToken={this.state.userToken} isTutor={this.state.isTutor} {...props}/>
            }
            />
            <Route exact path="/question" 
            render={
              (props) =>
              <Question userToken={this.state.userToken} isTutor={this.state.isTutor} {...props}/>
            }
            />
        </Switch>
        </Router>
        </ThemeProvider>
      </div>
    )
  }
}

export default App;