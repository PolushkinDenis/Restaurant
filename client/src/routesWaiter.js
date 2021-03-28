import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {AuthPage} from './pages/AuthPage'
import { TableWaiterPage } from './pagesWaiter/TableWaiterPage'
import { OrderWaiterPage } from './pagesWaiter/OrderWaiterPage'


export const useRoutesWaiter = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>

         <Route path="/waiter/table" exact>
          <TableWaiterPage />
        </Route>

        <Route path="/waiter/order" exact>
          <OrderWaiterPage />
        </Route>

        <Redirect to="/waiter/order" />

      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
