import React from 'react';
import { connect } from 'react-redux'
import { Upload, Icon, message, Form } from 'antd';
import * as actionTypes from '../store/action-types';
import actionCreators from '../store/action-creators';
import getBase64 from '../utils/base'
import Panel from './Panel';
import './App.css';

class App extends React.Component {

  componentDidMount() {
    const { createCtx } = this.props;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    createCtx(canvas, ctx)
  }

  componentWillUnmount() {
    const { createCtx } = this.props;
    createCtx(null, null)
  }

  handleCanvasClick = () => {
    const uploader = document.getElementById('uploader');
    uploader && uploader.click();
  };

  handleChange = info => {
    const { switchImage } = this.props;
    const { file: { status, name, type, originFileObj } } = info;
    if (status === 'uploading') {
      message.info('上传中...');
    } else if (status === 'done') {
      const filename = name.substring(0, name.lastIndexOf('.'));
      const fileext = name.substring(name.lastIndexOf('.') + 1);
      getBase64(originFileObj).then(imageUrl => {
        switchImage(imageUrl, filename, type, fileext)
      }).catch(console.error);
      message.success(`${name} 上传成功.`);
    } else if (status === 'error') {
      message.error(`${name} 上传失败.`);
    }
  };

  render() {
    const props = {
      name: 'image/*',
      showUploadList: false,
      action: 'https://www.mocky.io/v2/5e5223642d00008200357a86',
      onChange: (info) => this.handleChange(info),
    };

    const WrappedPanel = Form.create({ name: 'normal_login' })(Panel);
    const { imageUrl, image } = this.props;

    return (
      <div className="App">
        <canvas id="canvas"
                width={(image && image.width) || 0}
                height={(image && image.height) || 0}
                onClick={this.handleCanvasClick} />
        <div className="Item" style={{display: imageUrl ? 'none' : ''}}>
          <Upload.Dragger {...props} id="uploader">
            <p className="ant-upload-drag-icon">
              <Icon type="inbox"/>
            </p>
            <p className="ant-upload-text">点击或拖拽上传图片</p>
            <p className="ant-upload-hint">
              声明: 本程序不会上传任何信息到服务器, 所有操作均在本地完成
            </p>
          </Upload.Dragger>
        </div>
        <div className="Item">
          <WrappedPanel />
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  imageUrl: state.get('imageUrl'),
  image: state.get('image'),
  fillText: state.get('fillText'),
  showAppName: state.get('showAppName')
});

const mapDispatch = (dispatch) => ({
  createCtx(canvas, ctx) {
    dispatch(actionCreators[actionTypes.CTX_CREATED](canvas, ctx));
  },
  switchImage(imageUrl, filename, filetype, fileext) {
    dispatch(actionCreators[actionTypes.IMAGE_CHANGED](imageUrl, filename, filetype, fileext));
  },
});

export default connect(mapState, mapDispatch)(App);
