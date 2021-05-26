import React, { useState } from 'react';
import { Router, Route, Switch , Redirect} from 'react-router-dom';
import history from './historyUtils';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Menu from './Menu';
import Home from './Home';
import Login from './Login';
import History from './History'
import Profile from './Profile'
import Search from './Search'
// const history = createBrowserHistory();


function App() {
  const userToken = sessionStorage.getItem('token');
  const [token, setToken] = useState((userToken == null)?('null'):(JSON.parse(userToken)));

  const [isDark, setDark] = useState(false);
  function switchMode() {
    setDark(!isDark)
  }
  const theme = createMuiTheme({
    palette: {
    type: (isDark) ? 'dark' : 'light'
  }})

  function login(token:string){
    if (token == 'null'){
      sessionStorage.clear();
      setToken(token);
    }else{
      sessionStorage.setItem('token', JSON.stringify(token));
      setToken(token);
    }
  }
  document.title = 'YouTutor'
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <Menu token={token} isDark={isDark} switchRole={switchMode} logout={() => {
                                                              login('null');
                                                              window.location.href = './';
                                                              }}/>
        <Switch>
          <Route exact path="/"
          render = {
            (props) =>
            <Home token={token} isDark={isDark} {...props}/>
          }
          />
          <Route exact path="/login"
          render = {
            (props) =>
            <Login login={login} {...props}/>
          }/>
          {
            (token != 'null')
            ?(
              <Route exact path="/history" 
              render={
                (props) =>
                <History token={token} isDark={isDark} {...props}/>
              }
            />
            )
            :(
              <Redirect to='/'/>
            )
          }
          {
            (token != 'null')
            ?(
              <Route exact path='/profile' 
            render={
              (props) =>
              <Profile token={token} isDark={isDark} {...props}/>
            }
            />
            )
            :(
              <Redirect to='/'/>
            )
          }
          {
            (token != 'null')
            ?(
              <Route exact path='/search' 
            render={
              (props) =>
              <Search token={token} isDark={isDark} {...props}/>
            }
            />
            )
            :(
              <Redirect to='/'/>
            )
          }
        </Switch>
      </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
