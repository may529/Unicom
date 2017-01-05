'use strict';
require('styles/ui/InputUpload.less');

import React from 'react';
import { Modal,Upload,message,Col,Row,Button,Icon,Input } from 'antd';
import request from '../../Request';
import Config from 'config';


class InputUploadComponent extends React.Component {
  constructor( props ){
    super(props);
    this.state={
      priviewVisible:false,
      priviewImage:'',
      addLoding:false,
      qiniuInfo:{},
      layout:[],
      fileList:null,
      type:'text'
    }
  }
  componentWillMount(){
    request({
      type: 'get',
      url: Config.host+Config.qiniuToken,
      data: {
        // suffix:''
      },
      success: (data)=> {
        let layout =[];
        layout.push(this.props.item.uploadLayout);
        this.setState({
          qiniuInfo:{
            token:data.token,
            key:''
          },
          layout:layout,
          type:this.props.item.uploadType
        });
      }
    });
  }
  handleSelect(value,option){
    //console.log('InputUploadComponent-handleSelect',value,option);
    //return false;
  }
  handlebeforeUploade( file ){
    let qiniuInfo = this.state.qiniuInfo;
    let key = parseInt(Date.now() +''+ (Math.floor(Math.random()*100000000000000000%100000000)));
    let suffix = file.name.match(/\.[^\.]+$/);
    qiniuInfo.key = key+suffix;
    this.setState({qiniuInfo:qiniuInfo});
  }
  handleChange( info ){
    //限制上传列表
    let fileList = info.fileList;
    fileList = fileList.slice(-1);
    this.setState({ fileList });

    //去掉后缀名的文件名
    info.file.originName = info.file.name.replace(/\.[^\.]+$/,'');
    const {item,form} = this.props;
    //let qiniuInfo = this.state.qiniuInfo;
    switch( info.file.status ){
      case 'uploading':
        // info.file.name = qiniuInfo.key+suffix;
        break;
      case 'done':
        let values = form.getFieldsValue();
        //debugger;
        values[item.dataIndex] = Config.qiniudUrl+info.file.response.key;
        values[item.dataIndexAlia] = info.file.originName;
        // console.log(values);
        form.setFieldsValue(values);
        if( typeof this.props.onChangeFile == 'function' ){
          this.props.onChangeFile(values);
        }
        break;
      case 'error':
        message.error(info.file.response.error);
        break;
    }
  }
  handleCancel() {
    this.setState({
      priviewVisible: false
    });
  }
  render() {
    const qiniuInfo = this.state.qiniuInfo ;
    const item = this.props.item;
    let imgUrl = this.props.form.getFieldValue(item.dataIndex);
    let fileList = this.state.fileList;

    if(!Config.validateRules.isNull(imgUrl)){
      fileList = fileList || [{
          uid: -1,
          name: '',
          status: 'done',
          url: imgUrl ,
          thumbUrl: imgUrl
        }];
    }

    const props = {
      action: Config.qiniuUpload,
      // headers:qiniuInfo,
      data:qiniuInfo,
      beforeUpload: this.handlebeforeUploade.bind(this),
      onChange: this.handleChange.bind(this),
      multiple: false,//支持多选
      accept:item.uploadAccept,
      //showUploadList:true,
      showUploadList:item.showUploadListType == true ? true : false,
      listType: this.state.type == 'image' ?'picture-card' :'text',
      //defaultFileList: Config.validateRules.isNull(imgUrl) ? [] : defaultFileList,
      onPreview: (file) => {
        this.setState({
          priviewImage: file.url,
          priviewVisible: true
        });
      }
    };
    let { getFieldProps } = this.props.form;
    // debugger;
    let formItem = (this.state.layout || []).map((_item)=>{
      let input ='';
      //console.log(_item);
      switch (_item){
        case 'inline':
          input = (<Row>
            {this.state.type == 'image' ?
              <Row>
                <Col span={24}>
                  <Input type='hidden' {...this.props}/>
                  <Upload {...props} fileList={fileList}>
                    <Icon type="plus" />
                    <div className="ant-upload-text">{item.uploadBtnText}</div>
                  </Upload>
                </Col>
              </Row>
              :
              <Row>
                <Col span={18}>
                  <Input type={item.showAlia == false ? 'hidden' : 'text'} {...getFieldProps(item.dataIndexAlia)}  disabled={item.disabled} autoComplete='off' placeholder={item.title}/>
                  <Input type='hidden' {...this.props}/>
                </Col>
                <Col span={6} className='upload-btn'>
                  <Upload {...props} fileList={fileList}>
                    <Button type='ghost'>
                      <Icon type='upload' />{item.uploadBtnText}
                    </Button>
                  </Upload>
                </Col>
              </Row>
            }
          </Row>);
          break;
        case 'horizontal':
          input = (<Row>
            {
              this.state.type == 'image' ?
                <Row >
                  <Col span={24}>
                    <Input type='hidden' {...this.props}/>
                    <div className="clearfix">
                      <Upload {...props} fileList={fileList}>
                        <Icon type="plus" />
                        <div className="ant-upload-text">上传照片</div>
                      </Upload>
                      <Modal visible={this.state.priviewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                        <img alt="example" src={this.state.priviewImage} />
                      </Modal>
                    </div>
                  </Col>
                </Row>
                :
                <Row>
                  <Col span={24}>
                    <Input type={item.showAlia == false ? 'hidden' : 'text'} {...getFieldProps(item.dataIndexAlia)}  disabled={item.disabled} autoComplete='off' placeholder={item.title}/>
                    <Input type='hidden' {...this.props}/>
                    <Upload {...props} fileList={fileList}>
                      <Button type='ghost'>
                        <Icon type='upload' />
                        <span>{item.uploadBtnText}</span>
                      </Button>
                    </Upload>
                  </Col>
                </Row>
            }
          </Row>);
          break;
        default:
          break;
      }
      return (
        <Row>
          {input}
        </Row>
      );
    });

    return (
      <Row className='inputupload-component'>
        {formItem}
      </Row>
    );
  }
}

InputUploadComponent.displayName = 'InputUploadComponent';

// Uncomment properties you need
// InputUploadComponent.propTypes = {};
// InputUploadComponent.defaultProps = {};

export default InputUploadComponent;
