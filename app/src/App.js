import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Thoughts from './comps/thoughts'
import Thought from './comps/thought'
import Sidebar from './comps/sidebar'
import Create from './comps/create';
import Login from './comps/login';
import Footer from './comps/footer';
import User from './comps/_user';
import Account from './comps/account';
import Profile from './comps/profile';
import env from './env';

function App() {

  const [using, setUsing] = useState(null);
  const [thoughts, setThoughts] = useState([]);
  const [users, setUsers] = useState([]);

  const getUsing = (val) => {

    setUsing(val)
    console.log('Updated...')

  }

  useEffect(() => {

    fetch('http://localhost:8080/thought')
    .then(res => res.json())
    .then(data => {

      setThoughts(data.reverse())

    })

    fetch('http://localhost:8080/profiles')
    .then(res => res.json())
    .then(data => {

      setUsers(data)
      console.log(data)

    })

  }, [])


  return (
    <Router>
      <div className="App">

          <Switch>

            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/thought">
              <Thought using={using}/>
            </Route>

            <Route exact path="/home">
              <div className='flex justify-between'>
                <Thoughts thoughts={thoughts} using={using}/>
                <Sidebar users={users} />
              </div>
            </Route>
            
            <Route exact path="/create-blogs">
              <div className='flex justify-between'>
                <Create using={using} />
                <Sidebar users={users} />
              </div>
            </Route>

            <Route exact path="/read-blogs">
              <div className='flex justify-between'>
                <div>Main Page</div>
                <Sidebar users={users} />
              </div>
            </Route>

            <Route exact path="/account">
              <Account />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>

          </Switch>

        {window.location.pathname !== '/login' ? <User getUsing={getUsing} /> : ''}
        <Footer />

      </div>
    </Router>
  );
}

export default App;
