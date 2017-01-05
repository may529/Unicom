'use strict';
require('styles//MenuBar.less');

import React from 'react';
import SS  from 'parsec-ss';
import Config from 'config';
import {Menu, Icon, Row, Spin, Button} from 'antd';
import {Link} from 'react-router';
//import request from '../Request';

let menu_key = SS.get('menu_key') == null ? '0' : SS.get('menu_key');


class MenuBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '1',
      openKeys: [],
      isOpen: true
    };
  }

  componentWillMount() {
    this.loadMenuData();
    this.props.onToggle(this.state.isOpen);
  }

  componentWillReceiveProps() {
    setTimeout(() => {
      this.matchPath(this.props.location.pathname, '', this.state.menu || []);
    }, 0);
  }

  //匹配路由和菜单展开
  matchPath(path, prefix, parent) {
    parent.map((item) => {
      if (item.url == path) {
        this.setState({current: '' + item.id});
        return;
      }
      if (item.children) {
        this.matchPath(this.props.location.pathname, item.url, item.children);
      }
      // if ((prefix + (item.to || '')) == path) {
      //   this.setState({current: '' + item.id});
      //   return;
      // }
      // if (item.children) {
      //   this.matchPath(this.props.location.pathname, prefix + (item.to || ''), item.children);
      // }
    });
    return;
  }

  sortMenu(menus) {
    menus.forEach((menui) => {
      if (menui.children) {
        menui.children = this.sortMenu(menui.children);
      }
      menus.forEach((menuj) => {
        if (menuj.seq < menui.seq) {
          let temp = menui;
          menui = menuj;
          menuj = temp;
        }
      });
    });
    return menus;
  }

  loadMenuData() {
    //手动添加菜单信息
    // request({
    //   type:'get',
    //   url:Config.host + '/custom/user-menu',
    //   data:{},
    //   success:(data)=>{
    //     let menus = data.result;
    //     menus.unshift({'urlName':'首页','icon':'&#xe629;','id':1.1,'url':'/'});
    //     this.setState({
    //       menu: this.sortMenu(data.result)
    //     }, ()=> {
    //       this.matchPath(this.props.location.pathname, '', this.state.menu || []);
    //     });
    //   }
    // });
    let menus = {};
    if (SS.get(Config.roleType) == 'edu') { //教委管理员的菜单
      menus = {
        'lst': [
          {'urlName': '报表查询', 'icon': '&#xe602;', 'id': 1, 'url': '/report-query'},
          {
            'urlName': '数据统计', 'icon': '&#xe620;', 'id': 2, 'url': '',
            'children': [{'urlName': '可视化数据', 'icon': '', 'id': 2.1, 'url': '/visualization'}, {
              'urlName': '数据导出',
              'icon': '',
              'id': 2.2,
              'url': '/output'
            }]
          },
          {'urlName': '模板管理', 'icon': '&#xe614;', 'id': 3, 'url': '/template'},
          {'urlName': '任务管理', 'icon': '&#xe616;', 'id': 4, 'url': '/task'},
          {
            'urlName': '学校管理', 'icon': '&#xe612;', 'id': 5,
            'children': [{'urlName': '学校维护', 'icon': '', 'id': 5.1, 'url': '/school'},
              {'urlName': '学校管理员管理', 'icon': '', 'id': 5.2, 'url': '/school-user'}], 'url': ''
          },
          {'urlName': '用户管理', 'icon': '&#xe601;', 'id': 6, 'url': '/users'},
          {'urlName': '角色管理', 'icon': '&#xe66f;', 'id': 7, 'url': '/role'},
          {
            'urlName': '系统管理', 'icon': '&#xe613;', 'id': 8,
            'children': [{'urlName': '操作日志', 'icon': '', 'id': 8.1, 'url': '/log'},
              {'urlName': '上传设置', 'icon': '', 'id': 8.2, 'url': '/upload-setting'}], 'url': ''
          }
        ],
        'status': 0
      };
    } else {//学校管理员菜单
      menus = {
        'lst': [{
          'urlName': '数据填报',
          'icon': '&#xe620;',
          'id': 1,
          'url': '/data-reporting',
          'children': [{'urlName': '待处理', 'icon': '', 'id': 1.1, 'url': '/data-report'}, {
            'urlName': '已处理',
            'icon': '',
            'id': 1.2,
            'url': '/data-reported'
          }]
        },
          {
            'urlName': '报表审核',
            'icon': '&#xe603;',
            'id': 2,
            'url': '/reporting-audit',
            'children': [{'urlName': '待处理', 'icon': '', 'id': 2.1, 'url': '/audit-report'}, {
              'urlName': '已处理',
              'icon': '',
              'id': 2.2,
              'url': '/audit-reported'
            }]
          },
          {'urlName': '报表查询', 'icon': '&#xe602', 'id': 3, 'url': '/report-query'},
          {
            'urlName': '用户管理',
            'icon': '&#xe601;',
            'id': 4,
            'children': [{'urlName': '学校用户维护', 'icon': '', 'id': 4.1, 'url': '/user-maintain'}, {
              'urlName': '报表用户分配',
              'icon': '',
              'id': 4.2,
              'url': '/user-distribution'
            }],
            'url': '/user-msg'
          }
        ],
        'status': 0
      };
    }

    menus.lst.unshift({'urlName': '首页', 'icon': '&#xe629;', 'id': 1.1, 'url': '/'});
    this.setState({
      menu: this.sortMenu(menus.lst)
    }, () => {
      this.matchPath(this.props.location.pathname, '', this.state.menu || []);
    });
  }

  handleClick(e) {
    SS.set('menu_key', e.key);
    this.setState({
      current: e.key,
      openKeys: e.keyPath.slice(1)
      // isOpen:true
    });
  }

  onToggle(info) {
    this.setState({
      openKeys: info.open ? info.keyPath : info.keyPath.slice(1)
    });
  }

  handleToogle() {
    this.props.onToggle(!this.state.isOpen);
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    const linkStyle = {
      display: this.state.isOpen ? 'inline-block' : 'none'
    };

    //动态生成菜单项
    var menuItem = (this.state.menu || []).map((item, index) => {
      if (item.children && item.children.length) {
        var chiildren = item.children.map(function (child, childIndex) {
          return (
            <Menu.Item key={'' + child.id}><Link to={child.url}><i className="iconfont"
                                                                   dangerouslySetInnerHTML={{__html: child.icon}}></i><span >{child.urlName}</span></Link></Menu.Item>
          );
        });
        return (
          <Menu.SubMenu key={'' + item.id} title={
            <span onClick={() => {
//              console.log(item);
              this.setState({current: '' + item.id});
            }}><i className="iconfont" dangerouslySetInnerHTML={{__html: item.icon}}></i><span
              style={linkStyle}>{item.urlName}</span></span>}>
            {chiildren}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item key={'' + item.id}><Link to={item.url}><i className="iconfont"
                                                               dangerouslySetInnerHTML={{__html: item.icon}}></i><span
            style={linkStyle}>{item.urlName}</span></Link></Menu.Item>
        );
      }
    });
    return (
      <Spin spinning={menuItem.length == 0}>
        <Row className='menubar-component'>
          <Row className='controller'>
            <Button onClick={this.handleToogle.bind(this)}>{this.state.isOpen ? <Icon type="double-left"/> :
              <Icon type="double-right"/>}</Button>
          </Row>
          <Row className='menu'>
            <Menu selectedKeys={[this.state.current]}
                  style={{width: this.state.isOpen ? 240 : 70}}
                  mode={this.state.isOpen ? 'inline' : 'vertical'}>
              {menuItem}
            </Menu>
          </Row>
        </Row>
      </Spin>
    );
  }
}

MenuBarComponent.displayName = 'MenuBarComponent';

// Uncomment properties you need
// MenuBarComponent.propTypes = {};
// MenuBarComponent.defaultProps = {};

export default MenuBarComponent;
