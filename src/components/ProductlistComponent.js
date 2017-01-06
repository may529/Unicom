'use strict';

import React from 'react';
import {Row, Col, Badge, Tabs, Spin, Button, Table, Tag, Icon, Card, Popover, Modal, Alert} from 'antd';
import CommCrudtable from './ui/CommCrudtableComponent';
import Config from 'config';
import request from '../Request';

require('styles//Productlist.less');

class ProductlistComponent extends React.Component {
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
        title: '产品id',
        dataType: 'hidden',
        editable: true,
        showable: false,
      },
      {
        dataIndex: 'pics',
        title: '图片轮播',
        dataType: 'inputUpload',
        showable: false,
        editable: true,
      },
      {
        dataIndex: 'icon',
        title: '图标',
        dataType: 'inputUpload',
        showable: true,
        editable: true,
      },
      {
        dataIndex: 'name',
        title: '产品名称',
        width: '15%',
        dataType: 'text',
        showable: true,
        editable: true, //是否可以编辑
        validata: /^[a-z0-9]{1,20}$/i,
        validataMsgs: {
          tips: '20个字符以内,仅限英文或数字',
          emptyMsg: '请输入登录名',
          errorMsg: '20个字符以内,仅限英文或数字'
        },
        searchable: { //是否显示在右侧的搜索区域
          isDispaly: true, //true 为显示查询框  false 不显示
          name: 'name' //查询的字段名称
        }
      }, {
        dataIndex: 'price',
        title: '产品价格',
        dataType: 'text',
        showable: true,
        editable: true, //是否可以编辑
        validata: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
        validataMsgs: {
          tips: '请按价格格式填写',
          emptyMsg: '请输入产品价格',
          errorMsg: '请按价格格式填写'
        }
      },{
        dataIndex: 'category.id',
        title: '产品分类',
        showable: false,
      },{
        dataIndex: 'category.name',
        title: '产品分类',
        dataType: 'select',
        sorter: true,
        showable: true,
        editable: true,
        searchable: { //是否显示在右侧的搜索区域
          isDispaly: true,
          name: 'category.name' //查询的字段名称
        },
        chlidOptions: [ {
          value:0,
          text: '靓号'
        }, {
          value:1,
          text: '套餐'
        }],
      },{
        dataIndex: 'desc',
        title: '摘要',
        dataType: 'textarea',
        showable: false,
        editable: true,
      },{
        dataIndex: 'channel',
        title: '渠道来源',
        dataType: 'select',
        sorter: true,
        editable: true, //是否可以编辑
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
      },{
        dataIndex: 'homeTop',
        title: '首页置顶权重',
        dataType: 'number',
        showable: true,
        editable: true,
      },{
        dataIndex: 'content',
        title: '详情',
        dataType: 'richtext',
        showable: false,
        editable: true,
      },{
        dataIndex: 'spec',
        title: '规格',
        dataType: 'richtext',
        showable: false,
        editable: true,
      }
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
              {
                "category": {
                  "id": 66731,
                  "name": "靓号"
                },
                "channel": "uber",
                "content": "测试内容40v6",
                "desc": "测试内容5n6q",
                "homeTop": 1,
                "id": 1221,
                "icon": "测试内容n52e",
                "name": "测试内容5efb",
                "pics": [
                  "string1",
                  "string2",
                  "string3",
                  "string4",
                  "string5"
                ],
                "price": "测试内容1p55",
                "spec": "测试内容8v82"
              }
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
      <div className="productlist-component">
        <CommCrudtable
          columns={this.getColums()}
          operaUrl={this.getOperaUrl()}
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

ProductlistComponent.displayName = 'ProductlistComponent';

// Uncomment properties you need
// ProductlistComponent.propTypes = {};
// ProductlistComponent.defaultProps = {};

export default ProductlistComponent;
