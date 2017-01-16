'use strict';

import React from 'react';
import { Row, Col } from 'antd';
require('styles//Welcome.less');

class WelcomeComponent extends React.Component {
  render() {
    return (
      <div className="welcome-component center">
        <div className="welcome-msg">欢迎使用重庆联通线上支撑平台管理系统</div>
        <Row className="ewm">
          <Col span={4}></Col>
          <Col span={8}><img src="images/uber.png" alt=""/><p>扫描访问uber主页面</p></Col>
          <Col span={8}><img src="images/didi.png" alt=""/><p>扫描访问嘀嘀主页面</p></Col>
          <Col span={4}></Col>
        </Row>
      </div>
    );
  }
}

WelcomeComponent.displayName = 'WelcomeComponent';

// Uncomment properties you need
// WelcomeComponent.propTypes = {};
// WelcomeComponent.defaultProps = {};

export default WelcomeComponent;
