/**
 * Created by Miku on 2017/2/4.
 */
'use strict';

import React from 'react';
import { Row, Col, Badge, Tabs, Spin, Button, Table, Tag, Icon, Card, Popover, Modal, Alert,message } from 'antd';
import CommCrudtable from './ui/CommCrudtableComponent';
import Config from 'config';
import request from '../Request';

// require('styles//AdManger.less');

class AdMangerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentWillMount(){
    this.loadData();
  }
  loadData(){
    request({
      type: 'get',
      url: Config.host + '/api/admin/channels',
      success: (e) => {
        let channels = {};
        e.result.list.forEach(function (item) {
          channels[item.code] = item.name;
        });
        this.setState({channels:channels});
      },
      error: (data) => {

      }
    });
  }
  getColums() {
    return [{
      dataIndex: 'id',
      title: '工号id',
      dataType: 'hidden',
      editable: true,
      showable: false,
    }, {
      dataIndex: 'username',
      title: '登录名称',
      dataType: 'text',
      showable: true,
      editable: true,
      disabled:true,
      searchable: { //是否显示在右侧的搜索区域
        isDispaly: true,
        name: 'username' //查询的字段名称
      },
      validata: /\S/,
      validataMsgs: {
        emptyMsg: '请输入登录名称',
      }
    },{
    //   dataIndex: 'email',
    //   title: '邮箱',
    //   dataType: 'text',
    //   showable: false,
    //   editable: true,
    //   disabled:true,
    //   validata: new RegExp('^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$'),
    //   validataMsgs: {
    //     emptyMsg: '请输入邮箱地址',
    //     errorMsg: '请输入正确的邮箱地址'
    //   }
    // },{
    //   dataIndex: 'phone',
    //   title: '电话号码',
    //   dataType: 'text',
    //   showable: false,
    //   editable: true,
    //   validata: new RegExp('^0?(13[0-9]|14[57]|15[0-35-9]|17[01678]|18[0-9])\\d{8}'),
    //   validataMsgs: {
    //     emptyMsg: '请输入电话号码',
    //     errorMsg: '请输入正确的电话号码'
    //   }
    // }, {
      dataIndex: 'channels',
      title: <span><span className="dot">*</span>渠道来源 </span>,
      placeholder:'渠道来源',
      dataType: 'select',
      editable: true, //是否可以编辑
      disabled:true,
      render:(text, record)=> {
        return (this.state.channels||[])[record.channels?record.channels[0]:"查询全部"] || "查询全部";
      },
      chlidOptionsUrl:Config.host +'/api/admin/channels',
      chlidOptionsFilter:(options,record)=> {
        if(options&&options[0]&&options[0].name!="查询全部"){
          let temp = {};
          temp.code="all";
          temp.value="all";
          temp.name = "查询全部";
          temp.text = "查询全部";
          temp.id= "-1";
          options.unshift(temp);
        }
        return options;
      },
      chlidOptionsType:{
        text:'name',
        value:'code'
      }
    }];
  }
  render() {
    return (
      <div className="admanger-component">
        <CommCrudtable
          columns={this.getColums()}
          operaUrl={{
            loadDataUrl: Config.host + 'api/admin/users/search',
            saveOrUpdateUrl: Config.host + 'api/admin/users/save',
            delUrl: Config.host + 'api/admin/users/',
            resetPwd: Config.host + 'api/admin/users/reset-pass/',
          }}
          dataWarp={(result) => {
            result.list.forEach((item) => {
              item.img = Config.host + item.img;
            });
            return result;
          } }
          operaItem={[{
            title: '重置密码',
            icon: 'reload',
            call: (record, instance)=> {
              Modal.confirm({
                title: '确定要重置吗?',
                onOk: () => {
                  request({
                    type: 'post',
                    url: Config.host + 'api/admin/users/reset-pass/'+record.id,
                    success: (e) => {
                      message.success("重置成功");
                    },
                    error: (data) => {}
                  });
                },
                onCancel() {
                },
              });
            }
          }]}
          dataFormat={(obj)=>{
            if(obj['channels']=="all"){
              delete obj['channels'];
            }
            if(obj['channels']){
              obj['channels'] = [obj['channels']];
            }
            return obj;
          }}
          //searchType='open'
          pagination={true}
          showDefaultBtn={{
            showAddBtn: true,
            showEditBtn: false,
            showDeleteBtn: true
          }}
        />
      </div>
    );
  }
}

AdMangerComponent.displayName = 'AdMangerComponent';

// Uncomment properties you need
// AdMangerComponent.propTypes = {};
// AdMangerComponent.defaultProps = {};

export default AdMangerComponent;
