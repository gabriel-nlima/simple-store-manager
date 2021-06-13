import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import { AuthProvider } from './contexts/authContext'
import PrivateRoute from './PrivateRoute'
import EstablishmentPage from './pages/EstablishmentPage'

import 'antd/dist/antd.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/" component={AuthPage} exact />
          <PrivateRoute path="/home" component={EstablishmentPage} exact />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
