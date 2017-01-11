'use strict';

import React from 'react';
import { Row, Col, Badge, Tabs, Spin, Button, Table, Tag, Icon, Card, Popover, Modal, Alert } from 'antd';
import CommCrudtable from './ui/CommCrudtableComponent';
import Config from 'config';
import request from '../Request';

require('styles//Guestbook.less');

class GuestbookComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  getColums() {
    return [
      {
        dataIndex: 'id',
        title: '留言id',
        dataType: 'hidden',
        editable: true,
        showable: false,
      },
      {
        dataIndex: 'icon',
        title: '图标',
        render(text, reocrd) {
          text = reocrd['product'].icon;
          return (
            <Col style={{ width: 50 }}>
              <img src={Config.host + (text == null ? df_logo : text + '?imageView2/1/w/50/h/50')} height='50' width='50' style={{ borderRadius: '50%', overflow: 'hidden' }} />
            </Col>
          );
        }
      },
      {
        dataIndex: 'name',
        title: '产品名称',
        dataType: 'text',
        showable: true,
        disabled:true,
        editable: true,
        render(text, reocrd) {
          text = reocrd['product'].name;
          return (
            <Col style={{ width: 150 }}>
              {text}
            </Col>
          );
        }
      },
      {
        dataIndex: 'email',
        title: 'email',
        width: '15%',
        dataType: 'text',
        disabled:true,
        showable: true,
        editable: true
      },{
        dataIndex: 'phone',
        title: '电话',
        dataType: 'text',
        disabled:true,
        showable: true,
        editable: true
      },
      {
        dataIndex: 'content',
        title: '留言处理',
        width: '15%',
        dataType: 'textarea',
        showable: true,
        editable: true
      },
    ]
  }


  render() {
    return (
      <div className="guestbook-component">
        <CommCrudtable
          columns={this.getColums()}
          operaUrl={{
            loadDataUrl: Config.host + '/api/admin/messages/search',
            saveOrUpdateUrl: Config.host + '/api/admin/messages/deal',
          }}
          pagination={true}
          showDefaultBtn={{
            showAddBtn: false,
            showEditBtn: true,
            showSelection:false,
          }}
        />
      </div>
    );
  }
}

GuestbookComponent.displayName = 'GuestbookComponent';

// Uncomment properties you need
// GuestbookComponent.propTypes = {};
// GuestbookComponent.defaultProps = {};

export default GuestbookComponent;
