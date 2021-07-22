import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { CreateEvent } from './pages/CreateEvent';
import { Events } from './pages/Events';
import { ViewEditEvent } from './pages/ViewEditEvent';
import { NoMatch } from './pages/NoMatch';
import { Layout } from './components/Layout';
import { NavBar } from './components/Nav';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { ViewEditOccurrence } from './pages/ViewEditOccurrence';
import { CreateOccurrence } from './pages/CreateOccurrence';
import axios from "axios";

axios.defaults.withCredentials = true
const baseURL =
  process.env.NODE_ENV === "production"
    ? ""
    : process.env.REACT_APP_BACKEND_API;

function App() {
  const [username, setUsername] = useState("");
  const [id, setId] = useState(0);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/v1/user`)
      .then((response) => {
        console.log(response.data);
        setUsername(response.data.Username)
        setId(response.data.ID)
      })
      .catch((error) => {
        console.log(error);
      });
  })

    return (
      <React.Fragment>
        <NavBar username={username} setUsername={setUsername}/>
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/" component={() => <Home username={username}/>} />
              <Route exact path="/create-event" component={() => <CreateEvent username={username} id={id}/>} />
              <Route exact path="/events" component={() => <Events username={username}/>} />
              <Route exact path="/event/:eventID" component={() => <ViewEditEvent username={username}/>} />
              <Route exact path="/signin" component={() => <SignIn setUsername={setUsername} setId={setId}/>} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/event/:eventID/create-occurrence" component={() => <CreateOccurrence username={username}/>} />
              <Route exact path="/occurrence/:occurrenceID" component={() => <ViewEditOccurrence username={username}/>} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </Layout>
      </React.Fragment>
    );
}

export default App;
