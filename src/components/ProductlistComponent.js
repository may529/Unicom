'use strict';

import React from 'react';
import { Row, Col, Badge, Tabs, Spin, Button, Table, Tag, Icon, Card, Popover, Modal, Alert } from 'antd';
import CommCrudtable from './ui/CommCrudtableComponent';
import Config from 'config';
import  QrImage from  'qr-image';
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
        title: <span><span className="dot">*</span>图片轮播 </span>,
        placeholder:'图片轮播',
        dataType: 'inputUpload',
        dataIndexAlia: 'picsName',
        uploadLayout: 'inline',
        showUploadListType: true,
        multiple: true,
        uploadType: 'image',
        showable: false,
        editable: true,
        validata: /\S/,
        validataMsgs: {
          emptyMsg: '请上传产品轮播图',
        }
      },
      {
        dataIndex: 'icon',
        title: <span><span className="dot">*</span>图标 </span>,
        placeholder:'图标',
        dataType: 'inputUpload',
        dataIndexAlia: 'iconName',
        uploadLayout: 'inline',
        showUploadListType: true,
        multiple: false,
        uploadType: 'image',
        showable: true,
        editable: true,
        validata: /\S/,
        validataMsgs: {
          emptyMsg: '请上传产品图标',
        },
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
        title: <span><span className="dot">*</span>产品名称 </span>,
        placeholder:'产品名称',
        width: '15%',
        dataType: 'text',
        showable: true,
        editable: true, //是否可以编辑
        searchable: { //是否显示在右侧的搜索区域
          isDispaly: true, //true 为显示查询框  false 不显示
          name: 'name' //查询的字段名称
        },
        validata: /\S/,
        validataMsgs: {
          emptyMsg: '请填写产品名称',
        }
      }, {
        dataIndex: 'channel',
        title: <span><span className="dot">*</span>渠道来源 </span>,
        placeholder:'渠道来源',
        dataType: 'select',
        editable: true, //是否可以编辑
        searchable: { //是否显示在右侧的搜索区域
          isDispaly: true,
          name: 'channel' //查询的字段名称
        },
        render(text, record) {
          return record.channel=="didi"?"嘀嘀":record.channel
        },
        chlidOptions: [{
          key: '1',
          value: 'uber',
          text: 'uber'
        }, {
          key: '2',
          value: 'didi',
          text: '滴滴'
        },{
          key: '3',
          value: 'other1',
          text: '其他1'
        },{
          key: '4',
          value: 'other2',
          text: '其他2'
        }],
        validata: /\S/,
        validataMsgs: {
          emptyMsg: '请选择渠道来源',
        }
      },
      {
        dataIndex: 'categoryId',
        title: <span><span className="dot">*</span>产品分类</span>,
        placeholder:'产品分类',
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
        chlidOptionsFilter:(options,record)=> {
          if(!!record.channel){
            return options.filter((option,index)=>{
              return option.channels.split(',').find((x)=>{
                return x === record.channel;
              });
            });
          }else{
            return options;
          }
        }
        ,
        chlidOptions: [],
        chlidOptionsType:{
          text:'name',
          value:'id'
        },
        render(text, record) {
          return ((window.CATEGORY || []).find(x => x.id === text) || {}).name || "";
        },
        validata: /\S/,
        validataMsgs: {
          emptyMsg: '请选择产品分类',
        }
      }, {
        dataIndex: 'price',
        title: '产品价格',
        dataType: 'text',
        showable: true,
        validataEmpty:false,
        // validata: (value)=>{
        //   if(!value){
        //     return true;
        //   }
        //   return /(^(0|([1-9]\d{0,9}(\.\d{2})+))$)/.test(value)
        // },
        // validataMsgs: {
        //   tips: '请按价格格式填写',
        //   errorMsg: '请按价格格式填写'
        // },
        editable: (record)=>{
          return record.categoryId !=3 ;
        },
      }, {
        dataIndex: 'desc',
        title: '摘要',
        dataType: 'textarea',
        showable: false,
        editable: true,
      },  {
        dataIndex: 'homeTop',
        title: '首页置顶权重',
        dataType: 'number',
        showable: true,
        editable: true,
      }, {
        dataIndex: 'content',
        title: <span><span className="dot">*</span>详情</span>,
        placeholder:'详情',
        dataType: 'richtext',
        showable: false,
        editable: (record)=>{
          return record.categoryId !=1 && record.categoryId !=2 && record.categoryId !=3 && record.categoryId !=4 && record.categoryId !=5 && record.categoryId !=6;
        },
      }, {
        dataIndex: 'spec',
        title: '规格',
        dataType: 'richtext',
        showable: false,
        editable: (record)=>{
          return record.categoryId !=1 && record.categoryId !=2 && record.categoryId !=3 && record.categoryId !=4 && record.categoryId !=5 && record.categoryId !=6;
        },
      },{
        dataIndex: 'content',
        title: <span><span className="dot">*</span>资费详情</span>,
        placeholder:'资费详情',
        dataType: 'richtext',
        showable: false,
        editable: (record)=>{
          return record.categoryId ===1||record.categoryId ===5 ;
        },
        validata: /\S/,
        validataMsgs: {
          emptyMsg: '请填写资费详情',
        }
      }, {
        dataIndex: 'spec',
        title: '办理流程',
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
        validata: /\S/,
        validataMsgs: {
          emptyMsg: '请填写产品简介',
        }
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
        title: <span><span className="dot">*</span>产品简介 </span>,
        placeholder:'产品简介',
        dataType: 'richtext',
        showable: false,
        editable: (record)=>{
          return record.categoryId ===4 ;
        },
      }, {
        dataIndex: 'spec',
        title: '参数',
        dataType: 'richtext',
        showable: false,
        editable: (record)=>{
          return record.categoryId ===4 ;
        },
      },{
        dataIndex: 'content',
        title: <span><span className="dot">*</span>号码明细 </span>,
        placeholder:'号码明细',
        dataType: 'richtext',
        showable: false,
        editable: (record)=>{
          return record.categoryId ===3 ;
        },
      }, {
        dataIndex: 'spec',
        title: '办理流程',
        dataType: 'richtext',
        showable: false,
        editable: (record)=>{
          return record.categoryId ===3 ;
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
          operaItem={[{
            title: '预览',
            icon: 'eye',
            call: (record, instance)=> {
              var pngBuffer = QrImage.imageSync("https://unicom.parsec.com.cn/mobile/detail.html?t="+record.channel+"&id="+record.id, {type: 'png', margin: 1});
              var dataURI = 'data:image/png;base64,' + pngBuffer.toString('base64');
              this.setState({dataURI:dataURI});
            }
          }]}
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
        <Modal
          title="请扫描下方二维码预览产品详情"
          visible={this.state.dataURI}
          footer={null}
          onCancel={()=>{this.setState({dataURI:null})}}
        >
          <div style={{textAlign:'center'}}>
            <img src={this.state.dataURI} alt=""/>
          </div>
        </Modal>
      </div>
    );
  }
}

ProductlistComponent.displayName = 'ProductlistComponent';

// Uncomment properties you need
// ProductlistComponent.propTypes = {};
// ProductlistComponent.defaultProps = {};

export default ProductlistComponent;
