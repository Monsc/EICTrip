import { Typography, Row, Col, Card } from 'antd';

const { Title, Paragraph } = Typography;

export default function About() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>关于喜游记 JoyToTrip</Title>
      <Paragraph style={{ fontSize: 16 }}>
        喜游记是一家专注于中国客户出境游的专业旅行社，致力于为客户提供高品质、个性化的境外旅游产品。我们将始终以贴心周到的服务为您缔造愉快的旅行体验。
      </Paragraph>
      <Row gutter={24} style={{ marginTop: 32 }}>
        <Col xs={24} md={8}>
          <Card title="公司资质" bordered>
            <p>美国旅游局认证</p>
            <p>多国签证合作机构</p>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="专业团队" bordered>
            <p>10年以上行业经验顾问</p>
            <p>多语种领队与导游</p>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="服务特色" bordered>
            <p>定制化行程设计</p>
            <p></p>
            <p>境外应急支持</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
} 