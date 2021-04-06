import React, { useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Menu from './Menu';
import Home from './Home';
import Login from './Login';
import History from './History'
import Profile from './Profile'

const history = createBrowserHistory();

function App() {
  const userToken = sessionStorage.getItem('userToken');
  const [token, setToken] = useState((userToken == null)?('null'):(JSON.parse(userToken)));
  const [isDark, setDark] = useState(false);
  function switchMode() {
    setDark(!isDark)
  }
  const theme = createMuiTheme({
    palette: {
    type: (isDark) ? 'dark' : 'light'
  }})

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <Menu token={token} isDark={isDark} switchRole={switchMode}/>
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
            <Login login={setToken} {...props}/>
          }/>
          <Route exact path="/history" 
            render={
              (props) =>
              <History token={token} isDark={isDark} {...props}/>
            }
          />
          <Route exact path='/profile' 
            render={
              (props) =>
              <Profile token={token} isDark={isDark} {...props}/>
            }
          />
        </Switch>
      </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
