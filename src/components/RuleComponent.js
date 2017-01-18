'use strict';

import React from 'react';
import { Form, Icon, Input, Button,message } from 'antd';
import Config from 'config';
import request from '../Request';
import RichTextEditor from './ui//RichTextEditorComponent';
const FormItem = Form.Item;
require('styles//Rule.less');
class RuleComponent extends React.Component {

  constructor(props){
    super(props);
    this.state={
      content:{}
    }
  }
  componentDidMount(){
    this.loadData();
  }
  componentWillMount() {

  }
  loadData() {
    request({
      type: 'get',
      url: Config.host + '/api/admin/display/recommendation',
      success: (e) => {
        this.props.form.setFieldsValue({content:e.result})
      },
      error: (data) => {

      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="rule-component">
        <Form horizontal>
          {getFieldDecorator('content')(<RichTextEditor item={{
            title:'活动规则',
            dataIndex:'content'
          }} form ={this.props.form} ></RichTextEditor>)}
        </Form>
        <Button onClick={()=>{
          let values = this.props.form.getFieldsValue();
          console.log(values);
          return;
          if(!values){
            message.error("请编辑活动规则！")
          }else{
            request({
              type: 'post',
              url: Config.host + '/api/admin/display/recommendation',
              data:this.state.content,
              success: (e) => {
                message.success("保存成功")
              },
              error: (data) => {

              }
            });
          }
        }}>保存</Button>
      </div>
    );
  }
}

RuleComponent.displayName = 'RuleComponent';
RuleComponent = Form.create({})(RuleComponent);
// Uncomment properties you need
// RuleComponent.propTypes = {};
// RuleComponent.defaultProps = {};

export default RuleComponent;
