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
        title: '预定时间',
        dataIndex: 'createdAt',
        dataType: 'date',
        format: 'yyyy-MM-dd HH:mm:ss',
        render(text, reocrd) {
          text = new Date(reocrd['createdAt']);
          let Y = text.getFullYear() + '-';
          let M = (text.getMonth()+1 < 10 ? '0'+(text.getMonth()+1) : text.getMonth()+1) + '-';
          let D = text.getDate() + ' ';
          let h = text.getHours() + ':';
          let m = text.getMinutes() + ':';
          let s = text.getSeconds();
          return Y+M+D+h+m+s;
        }
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
        dataIndex: 'productname',
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
        dataIndex: 'name',
        title: '留言者',
        dataType: 'text',
        showable: true,
        disabled:true,
        editable: true,
      },
      {
        dataIndex: 'content',
        title: '留言内容',
        dataType: 'textarea',
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
        dataIndex: 'remark',
        title: '处理意见',
        dataType: 'textarea',
        showable: false,
        editable: true
      },
      {
        dataIndex: 'status',
        dataType: 'select',
        showable: true,
        editable: true,
        disabled:true,
        title: '状态',
        searchable: { //是否显示在右侧的搜索区域
          isDispaly: true,
          name: 'status' //查询的字段名称
        },
        chlidOptions: [{
          key: '1',
          value: 0,
          text: '未处理'
        }, {
          key: '2',
          value: 1,
          text: '已处理'
        }],
        render(text, record) {
          text=record.status==0?"未处理":"已处理"
          let color=record.status==0?"#f50":"#87d068"
          return <Tag color={color}>{text}</Tag>;
        },
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
          dataWarp={(result)=>{
            result.list.forEach((item)=>{
              item.productname = item['product'].name;
            });
            return result;
          }}
          searchType='open'
          pagination={true}
          showDefaultBtn={{
            showAddBtn: false,
            showEditBtn: true,
            showDeleteBtn: false,
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
