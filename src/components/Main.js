require('styles/App.less');

import React from 'react';
import NavBar from './NavBarComponent';
import MenuBar from './MenuBarComponent';
import {Row, Col, Breadcrumb} from 'antd';
import Config from 'config';
import SS from 'parsec-ss';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  handleToggle() {
    this.setState({isOpen: !this.state.isOpen});
  }

  componentWillMount() {
  }

  render() {
    let u = SS.getObj(Config.user);
    let routes = JSON.parse(JSON.stringify(this.props.routes));
    if(u.roles&&u.roles[0]=="order_viewer"&&u.channels){
      routes.splice(0,1);
    }
    return (
      <Row className='container'>
        <Row className='top'>
          <NavBar />
        </Row>
        <Row className={this.state.isOpen ? 'main open' : 'main'}>
          <Col className='right'>
            <Row className="breadcrumb">
              <Breadcrumb separator=">" {...this.props} routes={routes}/>
            </Row>
            <Row className="content">
              {this.props.children}
            </Row>
          </Col>

          <Col className='left' style={{height: '100%', _height: '100%'}}>
            <MenuBar {...this.props} onToggle={this.handleToggle.bind(this)}/>
          </Col>
        </Row>
      </Row>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
