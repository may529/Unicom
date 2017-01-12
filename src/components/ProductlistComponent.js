'use strict';

import React from 'react';
import { Row, Col, Badge, Tabs, Spin, Button, Table, Tag, Icon, Card, Popover, Modal, Alert } from 'antd';
import CommCrudtable from './ui/CommCrudtableComponent';
import Config from 'config';
import request from '../Request';

require('styles//Productlist.less');

class ProductlistComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  getColums() {
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
        dataIndexAlia: 'picsName',
        uploadLayout: 'inline',
        showUploadListType: true,
        multiple: true,
        uploadType: 'image',
        showable: false,
        editable: true,
      },
      {
        dataIndex: 'icon',
        title: '图标',
        dataType: 'inputUpload',
        dataIndexAlia: 'iconName',
        uploadLayout: 'inline',
        showUploadListType: true,
        multiple: false,
        uploadType: 'image',
        showable: true,
        editable: true,
        render(text, reocrd) {
          return (
            <Col style={{ width: 50 }}>
              <img src={(text == null ? df_logo : text + '?imageView2/1/w/50/h/50')} height='50' width='50' style={{ borderRadius: '50%', overflow: 'hidden' }} />
            </Col>
          );
        }
      },
      {
        dataIndex: 'name',
        title: '产品名称',
        width: '15%',
        dataType: 'text',
        showable: true,
        editable: true, //是否可以编辑

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
        // validata: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
        // validataMsgs: {
        //   tips: '请按价格格式填写',
        //   emptyMsg: '请输入产品价格',
        //   errorMsg: '请按价格格式填写'
        // }
      }, {
        dataIndex: 'categoryId',
        title: '产品分类',
        dataType: 'select',
        showable: true,
        editable: true,
        searchable: { //是否显示在右侧的搜索区域
          isDispaly: true,
          name: 'categoryId' //查询的字段名称
        },
        dataWarp: (data) => {
          data.list.forEach((item) => {
            item.label = item.name;
            item.value = item.id;
            item.text = item.name;
          });
          window.CATEGORY = data.list;
          return data;
        },
        chlidOptionsUrl: Config.host + '/api/admin/categories',
        chlidOptions: [],
        chlidOptionsType:{
          text:'name',
          value:'id'
        },
        render(text, record) {
          // console.log(text, window.CATEGORY);
          // console.log(((window.CATEGORY || []).find(x => x.id === text) || {}).name || "");
          return ((window.CATEGORY || []).find(x => x.id === text) || {}).name || "";
        }
      }, {
        dataIndex: 'desc',
        title: '摘要',
        dataType: 'textarea',
        showable: false,
        editable: true,
      }, {
        dataIndex: 'channel',
        title: '渠道来源',
        dataType: 'select',
        editable: true, //是否可以编辑
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
          text: '嘀嘀'
        }, {
          key: '3',
          value: 'other1',
          text: '其他1'
        }, {
          key: '4',
          value: 'other2',
          text: '其他2'
        }],
      }, {
        dataIndex: 'homeTop',
        title: '首页置顶权重',
        dataType: 'number',
        showable: true,
        editable: true,
      }, {
        dataIndex: 'content',
        title: '详情',
        dataType: 'richtext',
        showable: false,
        editable: (record)=>{
          return record.categoryId !=1 && record.categoryId !=2 && record.categoryId !=4 && record.categoryId !=5 && record.categoryId !=6;
        },
      }, {
        dataIndex: 'spec',
        title: '规格',
        dataType: 'richtext',
        showable: false,
        editable: (record)=>{
          return record.categoryId !=1 && record.categoryId !=2 && record.categoryId !=4 && record.categoryId !=5 && record.categoryId !=6;
        },
      },{
        dataIndex: 'content',
        title: '资费详情',
        dataType: 'richtext',
        showable: false,
        editable: (record)=>{
          return record.categoryId ===1||record.categoryId ===5 ;
        },
      }, {
        dataIndex: 'spec',
        title: '其他',
        dataType: 'richtext',
        showable: false,
        editable: (record)=>{
          return record.categoryId ===1||record.categoryId ===5 ;
        },
      },{
        dataIndex: 'content',
        title: '产品简介',
        dataType: 'richtext',
        showable: false,
        editable: (record)=>{
          return record.categoryId ===2||record.categoryId ===6 ;
        },
      }, {
        dataIndex: 'spec',
        title: '手机参数',
        dataType: 'richtext',
        showable: false,
        editable: (record)=>{
          return record.categoryId ===2||record.categoryId ===6 ;
        },
      }
      ,{
        dataIndex: 'content',
        title: '产品简介',
        dataType: 'richtext',
        showable: false,
        editable: (record)=>{
          return record.categoryId ===4 ;
        },
      }, {
        dataIndex: 'spec',
        title: '规格',
        dataType: 'richtext',
        showable: false,
        editable: (record)=>{
          return record.categoryId ===4 ;
        },
      }
    ]
  }

  render() {
    return (
      <div className="productlist-component">
        <CommCrudtable
          columns={this.getColums()}
          operaUrl={{
            loadDataUrl: Config.host + '/api/admin/products/search',
            saveOrUpdateUrl: Config.host + '/api/admin/products/save',
            delUrl: Config.host + '/api/admin/products/',
          }}
          dataWarp={(result) => {
            result.list.forEach((item) => {
              item.icon = Config.host + item.icon;
              item.pics = item.pics.map((pic)=>{
                return Config.host + pic;
              });
            });
            return result;
          } }
          dataFormat={(obj)=>{
            console.log(obj);
            obj['icon'] = obj['icon'].substring(Config.host.length);
            obj['pics'] = obj['pics'].map((pic)=>{
              return pic.substring(Config.host.length);
            });
            return obj;
          }}
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

ProductlistComponent.displayName = 'ProductlistComponent';

// Uncomment properties you need
// ProductlistComponent.propTypes = {};
// ProductlistComponent.defaultProps = {};

export default ProductlistComponent;
