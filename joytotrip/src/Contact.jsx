import { Typography, Form, Input, Button, Row, Col, message } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, WechatOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function Contact() {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    message.success('您的信息已提交，我们会尽快联系您！');
    form.resetFields();
  };
  return (
    <div style={{ padding: 24, maxWidth: 700, margin: '0 auto' }}>
      <Title level={3}>联系我们</Title>
      <Row gutter={32}>
        <Col xs={24} md={12}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入您的姓名' }]}> <Input /> </Form.Item>
            <Form.Item name="phone" label="电话" rules={[{ required: true, message: '请输入您的电话' }]}> <Input /> </Form.Item>
            <Form.Item name="message" label="留言"> <Input.TextArea rows={4} /> </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">提交</Button>
            </Form.Item>
          </Form>
        </Col>
        <Col xs={24} md={12}>
          <div style={{ fontSize: 16, lineHeight: 2 }}>
            <p><PhoneOutlined /> 电话：400-888-8888</p>
            <p><WechatOutlined /> 微信：joytotrip</p>
            <p><MailOutlined /> 邮箱：contact@joytotrip.com</p>
            <p><EnvironmentOutlined /> 地址：New Costle, DE, USA 19720</p>
          </div>
        </Col>
      </Row>
    </div>
  );
} 