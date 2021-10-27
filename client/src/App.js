//react
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute'
import Navbar from './components/layout/Navbar';
import Welcome from './components/welcome/Welcome';
import Register from './components/forms/Register';
import Login from './components/forms/Login';
import Dashboard from './components/dashboard/Dashboard';
import EditProfile from './components/forms/EditProfile';
import AddWebsite from './components/forms/AddWebsite';
import AddExperience from './components/forms/AddExperience';
import AddEducation from './components/forms/AddEducation';
import AddDocument from './components/forms/AddDocument';

//redux
import { Provider } from 'react-redux';
import store from './store'
import { loadUser } from './actions/auth.action'
import setAuthToken from './utils/setAuthToken'

//css
import './App.css'

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App=()=>{
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  return (
    <Provider store={store}>
      <Router>
        <div className='wrapper'>
          <Navbar/>
          <Switch>
            <Route exact path='/' component={Welcome}/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={Login}/>
            <PrivateRoute exact path='/dashboard' component={Dashboard}/>
            <PrivateRoute exact path='/editProfile' component={EditProfile}/>
            <PrivateRoute exact path='/addExperience' component={AddExperience}/>
            <PrivateRoute exact path='/addEducation' component={AddEducation}/>
            <PrivateRoute exact path='/addWebsite' component={AddWebsite}/>
            <PrivateRoute exact path='/addDocument' component={AddDocument}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
