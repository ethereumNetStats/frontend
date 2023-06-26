import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/App.css'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import AuthLayout from './layouts/auth'
import AdminLayout from './layouts/admin'
import RTLLayout from './layouts/rtl'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme/theme'
import { SocketProvider } from './contexts/socketContext'

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <SocketProvider>
      <React.StrictMode>
        <HashRouter>
          <Switch>
            {/*<Route path={`/auth`} component={AuthLayout} />*/}
            <Route path={`/admin`} component={AdminLayout} />
            {/*<Route path={`/rtl`} component={RTLLayout} />*/}
            <Redirect from="/" to="/admin" />
          </Switch>
        </HashRouter>
      </React.StrictMode>
    </SocketProvider>
  </ChakraProvider>,
  document.getElementById('root'),
)
