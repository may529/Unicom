'use strict';

import React from 'react';

require('styles//Welcome.less');

class WelcomeComponent extends React.Component {
  render() {
    return (
      <div className="welcome-component center">
        <span className="welcome-msg">欢迎使用联通网上支持平台管理系统</span>
      </div>
    );
  }
}

WelcomeComponent.displayName = 'WelcomeComponent';

// Uncomment properties you need
// WelcomeComponent.propTypes = {};
// WelcomeComponent.defaultProps = {};

export default WelcomeComponent;
