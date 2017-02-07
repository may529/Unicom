require('styles/antd.less');
require('normalize.css/normalize.css');
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require('babel-polyfill');

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Config from 'config';
import Main from './components/Main';
import Login from './components/LoginComponent';
import Welcome from './components/WelcomeComponent';
import Productlist from './components/ProductlistComponent';
import SpeProduct from './components/SpeProductComponent';
import Guestbook from './components/GuestbookComponent';
import Statistics from './components/StatisticsComponent';
import Recommend from './components/RecommendComponent';
import Employee from './components/EmployeeComponent';
import Rule from './components/RuleComponent'
import AdManger from './components/AdMangerComponent';
import SS from 'parsec-ss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  //权限验证(是否登录)
  handleAuth(nextState, replace) {
    // console.log(SS.getObj(Config.user));
    if (!SS.get(Config.token) || !SS.getObj(Config.user)) {
      window.location.href = '#/login';
    }
    return true;
  }

  render() {

    return (
      <Router history={hashHistory}>
        <Route path='/login' component={Login} />
        <Route path='/' onEnter={this.handleAuth} component={Main} breadcrumbName='首页'>
          <IndexRoute component={Welcome}/>
          <Router path='/productlist' breadcrumbName='产品管理' component={Productlist}/>
          <Router path='/speproduct' breadcrumbName='首页推荐' component={SpeProduct}/>
          <Router path='/guestbook' breadcrumbName='订单管理' component={Guestbook}/>
          <Router path='/recommend-polite' breadcrumbName='推荐有礼'>
            <Router path='/rule' breadcrumbName='活动规则' component={Rule}/>
            <Router path='/recommend' breadcrumbName='推荐列表' component={Recommend}/>
          </Router>
          <Router path='/employee' breadcrumbName='工号管理' component={Employee}/>
          <Router path='/statistics' breadcrumbName='数据统计' component={Statistics}/>
          {/*<Router path='/ad' breadcrumbName='广告管理' component={AdManger} />*/}
        </Route>
      </Router>
    );
  }
}

// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));
