import React from 'react';
import { connect } from 'react-redux'
import { Upload, Icon, message, Form } from 'antd';
import * as actionTypes from '../store/action-types';
import actionCreators from '../store/action-creators';
import Panel from './Panel';
import './App.css';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class App extends React.Component {

  componentDidMount() {
    const { createCtx } = this.props;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    createCtx(ctx)
  }

  componentWillUnmount() {
    const { createCtx } = this.props;
    createCtx(null)
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = info => {
    const { switchImage } = this.props;
    const { file: { status, name, originFileObj } } = info;
    if (status === 'uploading') {
      message.info('上传中...');
    } else if (status === 'done') {
      getBase64(originFileObj).then(imageUrl => {
        switchImage(imageUrl)
      }).catch(console.error);
      message.success(`${name} 上传成功.`);
    } else if (status === 'error') {
      message.error(`${name} 上传失败.`);
    }
  };

  render() {
    const props = {
      name: 'image/*',
      listType: 'picture-card',
      showUploadList: false,
      action: 'https://www.mocky.io/v2/5e5223642d00008200357a86',
      onChange: (info) => this.handleChange(info),
    };

    const WrappedPanel = Form.create({ name: 'normal_login' })(Panel);
    const { imageUrl, image } = this.props;

    let content;
    if (!imageUrl) {
      content = (
        <div className="Item">
          <Upload.Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox"/>
            </p>
            <p className="ant-upload-text">点击或拖拽上传图片</p>
            <p className="ant-upload-hint">
              声明: 本程序不会上传任何信息到服务器, 所有操作均在本地完成
            </p>
          </Upload.Dragger>
        </div>
      );
    } else {
      content = (
        <div className="Item">
          <Upload {...props}>
            <img alt="" src={imageUrl}/>
          </Upload>
        </div>
      );
    }

    return (
      <div className="App">
        { content }
        <canvas id="canvas" width={(image && image.width) || 320} height={(image && image.height) || 160}></canvas>
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
  createCtx(ctx) {
    dispatch(actionCreators[actionTypes.CTX_CREATED](ctx));
  },
  switchImage(imageUrl) {
    dispatch(actionCreators[actionTypes.IMAGE_CHANGED](imageUrl));
  },
});

export default connect(mapState, mapDispatch)(App);
