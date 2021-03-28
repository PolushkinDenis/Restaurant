import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useRoutesAdmin} from './routesAdmin'
import {useRoutesWaiter} from './routesWaiter'

import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import {Navbar} from './components/Navbar'
import {NavbarAdmin} from './componentsAdmin/NavbarAdmin'
import {NavbarWaiter} from './componentsWaiter/NavbarWaiter'

import {Loader} from './components/Loader'

import 'materialize-css'

function App() {
  const {token, login, logout, userId, isAdmin, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  const routesAdmin = useRoutesAdmin(isAuthenticated)
  const routesWaiter = useRoutesWaiter(isAuthenticated)

  if (!ready) {
    return <Loader />
  }

  if (isAdmin == 'Admin') {
    return(
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        {isAuthenticated && <NavbarAdmin />}
        <div className="container">
          {routesAdmin}
        </div>
      </Router>
    </AuthContext.Provider>
    )}

  if (isAdmin == 'Waiter') {
    return(
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        {isAuthenticated && <NavbarWaiter />}
        <div className="container">
          {routesWaiter}
        </div>
      </Router>
    </AuthContext.Provider>
    )}

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        { isAuthenticated && <Navbar /> }
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
