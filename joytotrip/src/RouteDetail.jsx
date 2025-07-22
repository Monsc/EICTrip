import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Row, Col, Divider, Spin } from 'antd';
import { LeftOutlined, GlobalOutlined } from '@ant-design/icons';
import { fetchRoute } from './api';

const { Title, Paragraph } = Typography;

// minimal fallback route map
const fallbackById = {
  1: { id: 1, title: '日本樱花之旅', desc: '东京-大阪-京都6日深度游，赏樱花、泡温泉、品美食', price: '¥6999起', detail: 'Day1 东京 / Day2 富士山 / Day3 京都 ...' },
  2: { id: 2, title: '巴尔干秘境之旅', desc: '塞尔维亚，波黑，黑山，三国探秘之旅', price: '¥14999起', detail: 'Day1 贝尔格莱德 / Day2 萨拉热窝 ...' },
};

export default function RouteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [route, setRoute] = useState(fallbackById[id]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchRoute(id);
        if (!cancelled && data) setRoute(data);
      } catch (err) {
        console.warn('RouteDetail: API load failed, using fallback', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  if (loading && !route) {
    return <div style={{ textAlign:'center', marginTop:64 }}><Spin size="large" /></div>;
  }

  if (!route) {
    return (
      <div style={{ padding:24, maxWidth:800, margin:'0 auto', textAlign:'center' }}>
        <Title level={3}>线路不存在</Title>
        <Button icon={<LeftOutlined />} onClick={() => navigate(-1)}>返回</Button>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>返回</Button>
      <Card>
        <Row gutter={[24,24]}>
          {route.image && (
            <Col xs={24} md={10}>
              <img src={route.image} alt={route.title} style={{ width: '100%', borderRadius: 8, marginBottom: 16 }} />
            </Col>
          )}
          <Col xs={24} md={route.image ? 14 : 24}>
            <Title level={2}>{route.title}</Title>
            <Paragraph>{route.desc}</Paragraph>
            <Divider />
            {route.price && <Title level={4} style={{ color: '#fa541c' }}>{route.price}</Title>}
            {route.itinerary && <Paragraph><b>详细行程：</b>{route.itinerary}</Paragraph>}
            <Button type="primary" size="large" icon={<GlobalOutlined />}>立即预订</Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
