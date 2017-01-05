'use strict';

import React from 'react';

require('styles//Welcome.less');

class WelcomeComponent extends React.Component {
  render() {
    return (
      <div className="welcome-component center">
        <span className="welcome-msg">欢迎使用苑东生物制药学习测评管理系统</span>
      </div>
    );
  }
}

WelcomeComponent.displayName = 'WelcomeComponent';

// Uncomment properties you need
// WelcomeComponent.propTypes = {};
// WelcomeComponent.defaultProps = {};

export default WelcomeComponent;
