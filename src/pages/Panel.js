import React from 'react';
import { connect } from 'react-redux'
import { Form, Select, Input, Button, Slider, Switch, Modal } from 'antd';
import * as actionTypes from '../store/action-types';
import actionCreators from '../store/action-creators';

class Panel extends React.Component {

  state = {
    previewVisible: false,
  };

  selectChanged = (value, option) => {
    const { colors, switchColor } = this.props;
    const colorIndex = colors.findIndex(color => color.get('color') === value);
    switchColor(colorIndex);
  };

  handleCancel = () => {
    this.setState({
      previewVisible: false,
    });
  };

  handlePreview = () => {
    this.setState({
      previewVisible: true,
    });
  };

  blobCallback = () => {
    const { filename, fileext } = this.props;
    return function(b) {
      let a = document.createElement("a");
      a.textContent = "Download";
      document.body.appendChild(a);
      a.style.display = "none";
      a.download = `${filename}.${fileext}`;
      a.href = window.URL.createObjectURL(b);
      a.click();
    }
  };

  download = () => {
    const { canvas, filetype } = this.props;
    canvas && canvas.toBlob(this.blobCallback(), filetype || 'image/png', 1);
  };

  render() {
    const FromItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20}
    };

    const { image, filename, fileext, fillText, colors, colorIndex, opacity,
      showAppName, switchText, switchOpacity, switchShowAppName } = this.props;
    const selectOptions = colors.map((color) =>
      <Select.Option value={color.get('color')} key={color.get('color')}>{color.get('text')}</Select.Option>
    );

    const { previewVisible } = this.state;

    return (
      <Form labelAlign="left" className="login-form">
        <Form.Item {...FromItemLayout} label="文字" required={false}>
          <Input.TextArea rows={2} minLength={10} maxLength={40} value={fillText}
                          allowClear
                          placeholder="此证件仅供办理XX业务使用, 其它用途无效"
                          onChange={({ target: { value } }) => switchText(value)}/>
        </Form.Item>
        <Form.Item {...FromItemLayout} label="颜色" required={false}>
          <Select
            placeholder="请选择颜色"
            firstActiveValue="blue"
            value={colors.get(colorIndex).get('text')}
            onChange={this.selectChanged}
          >
            { selectOptions }
          </Select>
        </Form.Item>
        <Form.Item {...FromItemLayout} label="透明度" required={false}>
          <Slider min={0} max={1} value={opacity} step={0.1} onChange={switchOpacity} tooltipVisible />
        </Form.Item>
        <Form.Item {...FromItemLayout} label="显示名称" required={false}>
          <Switch checkedChildren="开" unCheckedChildren="关" checked={showAppName}
                  onChange={(checked, e) => switchShowAppName(checked)} />
        </Form.Item>
        <Form.Item>
          <Button size="default" block disabled={!image} onClick={this.handlePreview}>
            预览
          </Button>
          <Button type="primary" block disabled={!image} onClick={this.download}>
            保存
          </Button>
        </Form.Item>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt={`${filename}.${fileext}`} style={{ width: '100%' }} src={image} />
        </Modal>
      </Form>
    );
  }
}

const mapState = (state) => ({
  canvas: state.get('canvas'),
  image: state.get('image'),
  filename: state.get('filename'),
  filetype: state.get('filetype'),
  fileext: state.get('fileext'),
  fillText: state.get('fillText'),
  colors: state.get('colors'),
  colorIndex: state.get('colorIndex'),
  opacity: state.get('opacity'),
  showAppName: state.get('showAppName')
});

const mapDispatch = (dispatch) => ({
  switchText(text) {
    dispatch(actionCreators[actionTypes.TEXTAREA_CHANGED](text));
  },
  switchColor(colorIndex) {
    dispatch(actionCreators[actionTypes.COLOR_CHANGED](colorIndex));
  },
  switchOpacity(opacity) {
    dispatch(actionCreators[actionTypes.OPACITY_CHANGED](opacity));
  },
  switchShowAppName(showAppName) {
    dispatch(actionCreators[actionTypes.SHOW_APP_NAME_CHANGED](showAppName));
  },
});

export default connect(mapState, mapDispatch)(Panel);
