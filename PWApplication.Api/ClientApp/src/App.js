import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Transactions} from './components/Transactions';
import { Login} from './components/auth/Login';
import {Register} from './components/auth/Register';
import {Welcome} from './components/auth/Welcome';
import {CreateTransaction} from './components/CreateTransaction';
import { AccountManage } from './components/AccountManage';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/transaction-list' component={Transactions} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/welcome' component={Welcome} />
        <Route path='/create-transaction' component={CreateTransaction} />
        <Route path='/account-manage' component={AccountManage} />
      </Layout>
    );
  }
}
