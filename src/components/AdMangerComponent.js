'use strict';

import React from 'react';
import { Row, Col, Badge, Tabs, Spin, Button, Table, Tag, Icon, Card, Popover, Modal, Alert } from 'antd';
import CommCrudtable from './ui/CommCrudtableComponent';
import Config from 'config';
import request from '../Request';

require('styles//AdManger.less');

class AdMangerComponent extends React.Component {
  getColums() {
    return [{
      dataIndex: 'id',
      dataType: 'hidden',
    }, {
      dataIndex: 'name',
      title: '名称',
      dataType: 'text',
      showable: true,
      editable: true,
      searchable: { //是否显示在右侧的搜索区域
        isDispaly: true,
        name: 'channel' //查询的字段名称
      }
    }, {
      dataIndex: 'img',
      title: '图片',
      dataType: 'inputUpload',
      dataIndexAlia: 'imgName',
      uploadLayout: 'inline',
      showUploadListType: true,
      multiple: false,
      uploadType: 'image',
      showable: true,
      editable: true,
    }, {
      dataIndex: 'link',
      title: '链接',
      dataType: 'text',
      showable: true,
      editable: true,
    }, {
      dataIndex: 'sortName',
      title: '排序权重',
      dataType: 'number',
      showable: true,
      editable: true,
    }, {
      dataIndex: 'isShow',
      title: '是否显示',
      dataType: 'text',
      showable: true,
      editable: true,
    }];
  }
  render() {
    return (
      <div className="admanger-component">
        <CommCrudtable
          columns={this.getColums()}
          operaUrl={{
            loadDataUrl: Config.host + '/api/admin/advertisements/search',
            saveOrUpdateUrl: Config.host + '/api/admin/advertisements/save',
            delUrl: Config.host + '/api/admin/advertisements',
          }}
          dataWarp={(result) => {
            result.list.forEach((item) => {
              item.img = Config.host + item.img;
            });
            return result;
          } }
          dataFormat={(obj)=>{
            console.log(obj);
            obj['img'] = obj['img'].substring(Config.host.length);
            return obj;
          }}
          //searchType='open'
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

AdMangerComponent.displayName = 'AdMangerComponent';

// Uncomment properties you need
// AdMangerComponent.propTypes = {};
// AdMangerComponent.defaultProps = {};

export default AdMangerComponent;
