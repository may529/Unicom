'use strict';

import React from 'react';
import {Row, Col, Badge, Tabs, Spin, Button, Table, Tag, Icon, Card, Popover, Modal, Alert} from 'antd';
import CommCrudtable from './ui/CommCrudtableComponent';
import Config from 'config';
import request from '../Request';

require('styles//SpeProduct.less');

class SpeProductComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={

    }
    this.getOperaUrl = this.getOperaUrl.bind(this);
  }
  getColums(){
    return [
      {
        dataIndex: 'id',
        title: '特殊产品id',
        dataType: 'hidden',
        editable: true,
        showable: false,
      },
      {
        dataIndex: 'product.icon',
        title: '图标',
        render(text,reocrd){
          return(
            <Col style={{width:50}}>
              <img src={text == null ? df_logo : text+'?imageView2/1/w/50/h/50'} height='100%' width='100%' style={{borderRadius:'50%',overflow:'hidden'}}/>
            </Col>
          );
        }
      },
      {
        dataIndex: 'product.channel',
        title: '渠道来源',
        dataType: 'select',
        editable: false, //是否可以编辑
        searchable: { //是否显示在右侧的搜索区域
          isDispaly: true,
          name: 'channel' //查询的字段名称
        },
        chlidOptions: [{
          key: '1',
          value: '1',
          text: 'uber'
        }, {
          key: '2',
          value: '2',
          text: '嘀嘀'
        }],
      },
      {
        dataIndex: 'productId',
        title: ' 选择产品',
        dataType: 'cascader',
        showable: false,
        editable: true,
        chlidOptionsType:['channel','productId'],
        chlidOptions: [{
          value: '1',
          label: 'Uber',
          children: [{
            value: '11',
            label: 'Hangzhou',

          }],
        }, {
          value: '2',
          label: '滴滴',
          children: [{
            value: '21',
            label: 'Nanjing',
          }],
        }],
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
  getOperaUrl() {
    return {
      loadDataUrl: (params,onLoadData)=>{
        onLoadData({
          "code": 0,
          "message": "测试内容tgr4",
          "result": {
            "list": [
              {"id":'001',"desc":"特殊描述特殊描述特殊描述","product":{
                "category": {
                  "id": 66731,
                  "name": "靓号"
                },
                "channel": "uber",
                "content": "测试内容40v6",
                "desc": "测试内容5n6q",
                "homeTop": 1,
                "id": 1221,
                "icon": "http://ac-8rlqt41A.clouddn.com/c1325caf3627429dfed0.jpg",
                "name": "测试内容5efb",
                "pics": [
                  "http://ac-8rlqt41A.clouddn.com/c1325caf3627429dfed0.jpg",
                  "http://ac-8rlqt41A.clouddn.com/c1325caf3627429dfed0.jpg",
                  "http://ac-8rlqt41A.clouddn.com/c1325caf3627429dfed0.jpg",
                  "http://ac-8rlqt41A.clouddn.com/c1325caf3627429dfed0.jpg",
                  "http://ac-8rlqt41A.clouddn.com/c1325caf3627429dfed0.jpg",
                  "http://ac-8rlqt41A.clouddn.com/c1325caf3627429dfed0.jpg"
                ],
                "price": "测试内容1p55",
                "spec": "测试内容8v82"
              },"productId":1221}
            ],
            "pageNum": 35416,
            "pageSize": 64602,
            "total": 30117
          }
        })
      }
    }
  }

  render() {
    return (
      <div className="speproduct-component">
        <CommCrudtable
          columns={this.getColums()}
          operaUrl={this.getOperaUrl()}
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
