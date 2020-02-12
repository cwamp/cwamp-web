import React from 'react';
import { Upload, Icon, message, Form } from 'antd';
import Panel from './Panel';
import './App.css';

const { Dragger } = Upload;

function App() {
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const WrappedPanel = Form.create({ name: 'normal_login' })(Panel);

  return (
    <div className="App">
      <div className="Item">
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox"/>
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            声明: 本程序不会上传任何信息到服务器, 所有操作均在本地完成
          </p>
        </Dragger>
      </div>
      <div className="Item">
        <WrappedPanel />
      </div>
    </div>
  );
}

export default App;