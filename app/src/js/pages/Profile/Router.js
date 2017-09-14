import React from 'react'
import { Route, Switch } from 'react-router'

import ProfileLayout from './index'

import ProductList from './ProductList'
import CreateProduct from './CreateProduct'
import ViewProduct from './ViewProduct'

const ProfileRouter = ({ match }) =>
  <ProfileLayout match={match}>
    <Switch>
      <Route exact path='/user/:username' component={ProductList} />
      <Route exact path='/user/:username/items/new' component={CreateProduct} />
      <Route exact path='/user/:username/item/:itemId' component={ViewProduct} />
    </Switch>
  </ProfileLayout>

export default ProfileRouter
