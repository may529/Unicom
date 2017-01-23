'use strict';

import React from 'react';
import { Row, Col, Badge, Tabs, Spin, Button, Table, Tag, Icon, Card, Popover, Modal, Alert,message } from 'antd';
import CommCrudtable from './ui/CommCrudtableComponent';
import Config from 'config';
import moment from 'moment';
import request from '../Request';

require('styles//Recommend.less');

class RecommendComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  getColums() {
    return [
      {
        dataIndex: 'id',
        title: '推荐id',
        dataType: 'hidden',
        editable: true,
        showable: false,
      },
      {
        dataIndex: 'type',
        title: '被推荐类型',
        dataType: 'select',
        showable: true,
        editable: true,
        disabled:true,
        searchable: { //是否显示在右侧的搜索区域
          isDispaly: true, //true 为显示查询框  false 不显示
          name: 'type' //查询的字段名称
        },
        chlidOptions: [{
          key: '1',
          value: 'wanted',
          text: '有意向办理'
        }, {
          key: '2',
          value: 'done',
          text: '已办理'
        }],
        render(text, record) {
          switch (record.type){
            case 'wanted':
              return <span>有意向办理</span>;
              break;
            case 'done':
              return <span>已办理</span>;
              break;
          }
        }
      },
      {
        dataIndex: 'name',
        title: '被推荐人',
        dataType: 'text',
        editable: true,
        showable: true,
        disabled:true
      },
      {
        dataIndex: 'phone',
        title: '被推荐人电话',
        dataType: 'text',
        editable: true,
        showable: true,
        disabled:true
      },
      {
        dataIndex: 'receiverName',
        title: '佣金发放人',
        dataType: 'text',
        editable: true,
        showable: false,
        disabled:true
      },
      {
        dataIndex: 'receiverPhone',
        title: '佣金发放人电话',
        dataType: 'text',
        editable: true,
        showable: false,
        disabled:true
      },
      {
        dataIndex: 'receiverWeChat',
        title: '佣金发放人微信',
        dataType: 'text',
        editable: true,
        showable: false,
        disabled:true
      },
      {
        dataIndex: 'createdAt',
        title: '推荐时间',
        showable: true,
        editable: true,
        disabled:true,
        dataType: 'date',
        format: 'YYYY-MM-DD HH:mm:ss',
        render(text, reocrd) {
          return text.format("YYYY-MM-DD HH:mm:ss");
        }
      },
      {
        dataIndex: 'dealTime',
        title: '处理时间',
        showable: false,
        editable: false,
        disabled:true,
        dataType: 'text',
        format: 'yyyy-MM-dd HH:mm:ss',
        render(text, reocrd) {
          return text.format("YYYY-MM-DD hh:mm:ss");
        }
      },
      {
        dataIndex: 'dealType',
        title: <span><span className="dot">*</span>处理情况</span>,
        placeholder:'处理情况',
        dataType: 'select',
        editable: true, //是否可以编辑
        searchable: { //是否显示在右侧的搜索区域
          isDispaly: true,
          name: 'dealType' //查询的字段名称
        },
        render(text, record) {
          switch (record.dealType){
            case 'wanted':
              return <span>将会办理</span>;
              break;
            case 'unwanted':
              return <span>无意向办理</span>;
              break;
            case 'done':
              return <span>已办理</span>;
              break;
          }
        },
        chlidOptions: [{
          key: '1',
          value: 'wanted',
          text: '将会办理'
        }, {
          key: '2',
          value: 'unwanted',
          text: '无意向办理'
        },{
          key: '3',
          value: 'done',
          text: '已办理'
        }],
        validata: /\S/,
        validataMsgs: {
          emptyMsg: '请选择处理类型',
        }
      },{
        dataIndex: 'isPay',
        title: <span><span className="dot">*</span>佣金是否发放</span>,
        placeholder:'是否发放奖品',
        dataType: 'radio',
        disabled:function (record,form) {
          if(record.dealType != 'done' && record.isPay != false){
            record.isPay = false;
            form.setFieldsValue(record);
          }
          return record.dealType!="done";
        },
        validata: /\S/,
        validataMsgs: {
          emptyMsg: '请选择是否发放奖品',
        },
        showable: true,
        editable: true,
        chlidOptions: [{
          key: '1',
          value: true,
          text: '是'
        }, {
          key: '2',
          value: false,
          text: '否'
        }],
        render(text, record) {
          if(!!record.isPay){
            return <span>是</span>
          }else{
            return <span>否</span>
          }
        }
      },
      {
        dataIndex: 'status',
        title: '状态',
        dataType: 'select',
        editable: true,
        disabled:true,
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
          text: '继续追踪'
        },{
          key: '3',
          value: 2,
          text: '已完结'
        }],

        render(text, record) {
          switch (record.status){
            case 0:
              return <span>未处理</span>;
              break;
            case 1:
              return <span>继续追踪</span>;
              break;
            case 2:
              return <span>已完结</span>;
              break;
          }
        }
      },
      {
        dataIndex: 'remark',
        title: <span><span className="dot">*</span>处理备注</span>,
        placeholder:'处理备注',
        dataType: 'textarea',
        showable: false,
        editable: true,
        validata: /\S/,
        validataMsgs: {
          emptyMsg: '请填写备注',
        }
      }
    ]
  }
  render() {
    return (
      <div className="recommend-component">
        <CommCrudtable
          columns={this.getColums()}
          operaUrl={{
            loadDataUrl: Config.host + '/api/admin/recommendations/search',
            saveOrUpdateUrl: Config.host + '/api/admin/recommendations/deal',
          }}
          dataWarp = {(result)=>{
            result.list.forEach((item)=>{
              item.createdAt = moment(item.createdAt);
            });
            return result;
          }}
          actionItem={[
            {'title':'excel导出',call:(record,instance)=>{
              request({
                type: 'get',
                url: Config.host + '/api/admin/recommendations/export-url',
                data: instance.getParams(),
                success: (data)=> {
                  if(!!data.result){
                    window.location.href=Config.host + data.result;
                  }

                },
                error: (data)=> {
                  message.error("导出失败")
                }
              });


            }}
          ]}
          operaTitle="推荐处理"
          searchType='open'
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

RecommendComponent.displayName = 'RecommendComponent';

// Uncomment properties you need
// RecommendComponent.propTypes = {};
// RecommendComponent.defaultProps = {};

export default RecommendComponent;
