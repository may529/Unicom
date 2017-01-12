'use strict';

import React from 'react';

require('styles//Welcome.less');

class WelcomeComponent extends React.Component {
  render() {
    return (
      <div className="welcome-component center">
        <span className="welcome-msg">欢迎使用重庆联通线上支撑平台管理系统</span>
      </div>
    );
  }
}

WelcomeComponent.displayName = 'WelcomeComponent';

// Uncomment properties you need
// WelcomeComponent.propTypes = {};
// WelcomeComponent.defaultProps = {};

export default WelcomeComponent;
