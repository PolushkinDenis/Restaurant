import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetailPage'
import {AuthPage} from './pages/AuthPage'
import { MenusAdminPage } from './pagesAdmin/MenuAdminPage'
import { MenusAddAdminPage } from './pagesAdmin/MenuAddAdminPage'
import {WaitersAdminPage} from './pagesAdmin/WaitersAdminPage'
import {WaitersAddAdminPage} from './pagesAdmin/WaitersAddAdminPage'
import {StatisticsAdminPage} from './pagesAdmin/StatisticsAdminPage'
import {TableAdminPage} from './pagesAdmin/TableAdminPage'


import { CartPage } from './pages/CartPage'
import {FeedbackPage} from './pages/FeedbackPage'


export const useRoutesAdmin = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>

         <Route path="/admin/menu" exact>
          <MenusAdminPage />
        </Route>

        <Route path="/admin/menu/add" exact>
          <MenusAddAdminPage />
        </Route>

        <Route path="/admin/table" exact>
          <TableAdminPage />
        </Route>

        <Route path="/admin/waiter" exact>
          <WaitersAdminPage />
        </Route>

        <Route path="/admin/waiter/add" exact>
          <WaitersAddAdminPage />
        </Route>

        <Route path="/admin/statistics" exact>
          <StatisticsAdminPage />
        </Route>

        <Route path="/admin/feedback" exact>
          <FeedbackPage />
        </Route>

        <Route path="/admin/cart" exact>
          <CartPage />
        </Route>

        <Redirect to="/admin/menu" />

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
