import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from './components/login'
import Bookings from './components/Bookings'

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={Login} />
        <Route path='/bookings' component={Bookings} />
      </Router>
    )
  }
}

export default App
