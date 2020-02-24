import React from 'react';
import { connect } from 'react-redux'
import { Form, Select, Input, Button, Slider, Switch } from 'antd';
import * as actionTypes from '../store/action-types';
import actionCreators from '../store/action-creators';

class Panel extends React.Component {

  selectChanged = (value, option) => {
    const { colors, switchColor } = this.props;
    const colorIndex = colors.findIndex(color => color.get('color') === value);
    switchColor(colorIndex);
  };

  render() {
    const FromItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20}
    };

    const { image, fillText, colors, colorIndex, opacity, showAppName, switchText, switchOpacity, switchShowAppName } = this.props
    const selectOptions = colors.map((color) =>
      <Select.Option value={color.get('color')} key={color.get('color')}>{color.get('text')}</Select.Option>
    );

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
          <Button size="default" block disabled={!image}>
            预览
          </Button>
          <Button type="primary" block disabled={!image}>
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapState = (state) => ({
  image: state.get('image'),
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
