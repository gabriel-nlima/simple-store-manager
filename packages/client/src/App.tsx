import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'antd/dist/antd.css'
import AuthPage from './pages/AuthPage'
import { AuthProvider } from './contexts/authContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/" component={AuthPage} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
