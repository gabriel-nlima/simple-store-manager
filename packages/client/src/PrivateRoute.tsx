import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ACCESS_TOKEN_KEY } from './api/client'

interface PrivateRouteProps {
  component: React.ComponentType<any>
  [x: string]: any
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem(ACCESS_TOKEN_KEY) !== null ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
)

export default PrivateRoute
