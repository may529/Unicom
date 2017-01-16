'use strict';

import React from 'react';
import { Row, Col, Badge, Tabs, Spin, Button, Table, Tag, Icon, Card, Popover, Modal, Alert } from 'antd';
import CommCrudtable from './ui/CommCrudtableComponent';
import Config from 'config';
import request from '../Request';

require('styles//SpeProduct.less');

class SpeProductComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }
  getColums() {
    return [
      {
        dataIndex: 'id',
        title: '特殊产品id',
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
        dataIndex: 'productname',
        title: '产品名称',
        render(text, reocrd) {
          text = reocrd['product'].name;
          return (
            <Col style={{ width: 100 }}>
              {text}
            </Col>
          );
        }
      },
      {
        dataIndex: 'channel',
        title: '渠道来源',
        dataType: 'select',
        editable: false, //是否可以编辑
        searchable: { //是否显示在右侧的搜索区域
          isDispaly: true,
          name: 'channel' //查询的字段名称
        },
        chlidOptions: [{
          key: '1',
          value: 'uber',
          text: 'uber'
        }, {
          key: '2',
          value: 'didi',
          text: '滴滴'
        }],
        render(text, reocrd) {
          text = reocrd['product'].channel;
          return (
            <Col style={{ width: 50 }}>
              {text}
            </Col>
          );
        }
      },

      {
        dataIndex: 'productId',
        title: '产品',
        dataType: 'cascader',
        showable: false,
        editable: true,
        validata: /\S/,
        validataMsgs: {
          emptyMsg: '请选择渠道和对应产品',
        },
        chlidOptionsType: ['channel', 'productId'],
        dataWarp: (data) => {
          let list = data.list || [];
          let didi = [];
          let uber = [];
          list.forEach((item) => {
            item.label = item.name;
            item.value = item.id;
            if (item.channel == 'didi') {
              didi.push(item);
            } else if (item.channel == 'uber') {
              uber.push(item);
            }
          });
          data.list = [];
          if(didi.length >0){
            data.list.push({
              value: 'didi',
              label: '滴滴',
              children: didi,
            });
          }
          if(uber.length >0){
            data.list.push({
              value: 'uber',
              label: 'Uber',
              children: uber,
            });
          }
          return data;
        },
        chlidOptionsUrl: Config.host + '/api/admin/products/search',
      },
      {
        dataIndex: 'desc',
        title: '特殊产品摘要',
        dataType: 'textarea',
        showable: true,
        editable: true,
      },
    ]
  }


  render() {
    return (
      <div className="speproduct-component">
        <CommCrudtable
          columns={this.getColums()}
          operaUrl={{
            loadDataUrl: Config.host + '/api/admin/special-products/search',
            saveOrUpdateUrl: Config.host + '/api/admin/special-products/save',
            delUrl: Config.host + '/api/admin/special-products/',
          }}
          dataWarp={(result) => {
            result.list.forEach((item) => {
              let id = item.id;
              Object.assign(item, item.Product, {
                id: item.id,
                productId: item.product.id
              });
            });
            return result;
          } }
          dataFormat={(obj) => {
            delete obj.channel;
            return obj;
          } }
          searchType='open'
          pagination={true}
          showDefaultBtn={{
            showAddBtn: true,
            showEditBtn: true,
            showDeleteBtn: true
          }}
          />
      </div>
    );
  }
}

SpeProductComponent.displayName = 'SpeProductComponent';

// Uncomment properties you need
// SpeProductComponent.propTypes = {};
// SpeProductComponent.defaultProps = {};

export default SpeProductComponent;
