'use strict';

import React from 'react';
import wangEditor from 'wangEditor';
import { Input } from 'antd';

require('styles/ui/RichTextEditor.less');

class RichTextEditorComponent extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount(){
    let id  = parseInt(Date.now() +''+ (Math.floor(Math.random()*100000000000000000%100000000)));
    this.setState({
      id:'editor'+id
    });
    //$(document).on('click',this.handleClick);
  }
  handleClick(event){
    let editor = this.state.editor;
//    console.log( $.contains(editor.$editorContainer[0],event.target) );
    // debugger;
    if( $.contains(editor.$editorContainer[0],event.target) ){
      return ;
    }
    return;
    let values = this.props.form.getFieldsValue();
    values[this.props.item.dataIndex] = editor.$txt.html();
    this.props.form.setFieldsValue(values);
  }
  componentWillUnmount(){
//    console.log('componentDidUnMount');
    $(document).off('click',this.handleClick);
  }
  initContent(){
    let editor = this.state.editor;
    let  values = this.props.form.getFieldsValue();
    if( !!this.props.form ){
      //表单值初始化编辑器内容
      let  values = this.props.form.getFieldsValue();
      editor.$txt.html(values[this.props.item.dataIndex]);
      editor.$valueContainer.on('blur',(event)=>{
        // console.log(editor.$editorContainer,event.relatedTarget,$.contains(editor.$editorContainer[0],event.relatedTarget));
        if($.contains(editor.$editorContainer[0],event.relatedTarget)){
          return;
        }
//        console.log(editor.$txt.html());
        let values = this.props.form.getFieldsValue();
        values[this.props.item.dataIndex] = editor.$txt.html();
        this.props.form.setFieldsValue(values);
        // debugger;
      });
    }else{
      //content初始化编辑器内容
      editor.$txt.html(values[this.props.content]);
    }

    // if( this.props.display ){
    //   //禁用编辑器
    //   editor.destroy();
    // }else{
    //   //恢复编辑器
    //   editor.undestroy();
    // }
  }
  componentWillReceiveProps(){
    //this.initContent();
  }
  componentDidMount(){
    let editor = new wangEditor(this.state.id);

    //菜单配置
    editor.config.menus = [
      // 'source',
      'bold','underline','italic','strikethrough','eraser','forecolor','bgcolor',
      'quote','fontfamily','fontsize','head','unorderlist','orderlist','alignleft','aligncenter','alignright',
      'img','formaul',
      'undo','redo','fullscreen'
    ]

    // editor.config.menus = [
    //   // 'source',
    //   'bold','underline','italic','strikethrough','eraser','forecolor','bgcolor',
    //   'quote','fontfamily','fontsize','head','unorderlist','orderlist','alignleft','aligncenter','alignright',
    //   // 'link','unlink','table','emotion',
    //   'img','video','location','insertcode',
    //   'undo','redo','fullscreen'
    // ]

    //创建编辑器
    editor.create();

    // editor.undestroy();

    this.setState({
      editor:editor
    },()=>{
      this.initContent();
    });
  }
  render() {
    return (
      <div className="richtexteditor-component">
        <div className='editor' id={this.state.id} name='content' type='text/plain'></div>
        <Input className='values' type='hidden' {...this.props} />
      </div>
    );
  }
}

RichTextEditorComponent.displayName = 'UiRichTextEditorComponent';

// Uncomment properties you need
// RichTextEditorComponent.propTypes = {};
// RichTextEditorComponent.defaultProps = {};

export default RichTextEditorComponent;
