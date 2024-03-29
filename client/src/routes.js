import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetailPage'
import {AuthPage} from './pages/AuthPage'
import {RegistrationsPage} from './pages/RegistrationsPage'
import { MenusPage } from './pages/MenusPage'
import { CartPage } from './pages/CartPage'
import {FeedbackPage} from './pages/FeedbackPage'
import {TablePage} from './pages/TablePage'



export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        {/* <Route path="/links" exact>
          <LinksPage />
        </Route> */}

        <Route path="/create" exact>
          <CreatePage />
        </Route>
        
        <Route path="/menu" exact>
          <MenusPage />
        </Route>
        <Route path="/table" exact>
          <TablePage />
        </Route>
        <Route path="/feedback" exact>
          <FeedbackPage />
        </Route>

        <Route path="/cart" exact>
          <CartPage />
        </Route>

        <Route path="/detail/:id">
          <DetailPage />
        </Route>

        <Redirect to="/create" />



      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Route path="/registration" exact>
        <RegistrationsPage />
      </Route>
      
      <Redirect to="/" />
    </Switch>
  )
}
