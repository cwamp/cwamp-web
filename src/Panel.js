import React from 'react';
import { Form, Select, Input, Button, Slider, Switch } from 'antd';

class Panel extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const FromItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20}
    }
    return (
      <Form labelAlign="left" onSubmit={this.handleSubmit} className="login-form">
        <Form.Item {...FromItemLayout} label="文字" required={false}>
          <Input.TextArea rows={2} minLength={10} maxLength={40} allowClear
                    defaultValue="此证件仅供办理XX业务使用, 其它用途无效"/>
        </Form.Item>
        <Form.Item {...FromItemLayout} label="颜色" required={false}>
          <Select
            placeholder="请选择颜色"
            onChange={this.handleSelectChange}
          >
            <Select.Option value="white">白色</Select.Option>
            <Select.Option value="grey">灰色</Select.Option>
            <Select.Option value="black">黑色</Select.Option>
            <Select.Option value="red">红色</Select.Option>
            <Select.Option value="orange">橙色</Select.Option>
            <Select.Option value="blue">蓝色</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item {...FromItemLayout} label="透明度" required={false}>
          <Slider min={0} max={1} defaultValue={1} step={0.1} tooltipVisible />
        </Form.Item>
        <Form.Item {...FromItemLayout} label="显示名称" required={false}>
          <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
        </Form.Item>
        <Form.Item>
          <Button size="default" htmlType="submit" block>
            预览
          </Button>
          <Button type="primary" htmlType="submit" block>
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Panel;
