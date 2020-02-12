import React from 'react';
import { Form, Select, Input, Button, Slider, Switch } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

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
          <TextArea rows={2} minLength={10} maxLength={40} allowClear
                    defaultValue="此证件仅供办理XX业务使用, 其它用途无效"/>
        </Form.Item>
        <Form.Item {...FromItemLayout} label="颜色" required={false}>
          <Select
            placeholder="请选择颜色"
            onChange={this.handleSelectChange}
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
          </Select>
        </Form.Item>
        <Form.Item {...FromItemLayout} label="透明度" required={false}>
          <Slider min={0} max={1} defaultValue={1} step={0.1} tooltipVisible />
        </Form.Item>
        <Form.Item {...FromItemLayout} label="显示名称" required={false}>
          <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Panel;
