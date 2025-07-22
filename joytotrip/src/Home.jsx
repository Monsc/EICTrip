import { Card, Row, Col, Typography, Button } from 'antd';
import { PhoneOutlined, GlobalOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import logo from './assets/react.svg';

const { Title, Paragraph } = Typography;

// 示例高端大图
const carouselImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80'
];

const routes = [
  { title: '日本樱花之旅', desc: '东京-大阪-京都6日深度游', price: '¥6999起', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
  { title: '泰国海岛假期', desc: '普吉岛5日自由行', price: '¥4999起', img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80' },
  { title: '欧洲多国风情', desc: '法意瑞10日经典线路', price: '¥15999起', img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80' }
];

export default function Home() {
  return (
    <div>
      {/* 顶部大图轮播+悬浮LOGO/导航 */}
      <div style={{ position: 'relative', width: '100%', height: 480, overflow: 'hidden' }}>
        <Swiper loop style={{ width: '100%', height: 480 }}>
          {carouselImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div style={{ width: '100%', height: 480, position: 'relative' }}>
                <img src={img} alt={`slide${idx}`} style={{ width: '100%', height: 480, objectFit: 'cover', filter: 'brightness(0.7)' }} />
                {/* 黑色半透明蒙层 */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg,rgba(0,0,0,0.45) 60%,rgba(0,0,0,0.15) 100%)' }} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* 悬浮LOGO和品牌slogan */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 480, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <img src={logo} alt="logo" style={{ width: 120, marginBottom: 24, filter: 'drop-shadow(0 4px 16px #0008)' }} />
          <Title level={1} style={{ color: '#fff', textShadow: '0 4px 16px #000', fontSize: 48, fontWeight: 900, letterSpacing: 4, marginBottom: 0, pointerEvents: 'auto' }}>喜游记 JoyToTrip</Title>
          <Paragraph style={{ color: '#fff', fontSize: 22, textShadow: '0 2px 8px #000', marginTop: 16, pointerEvents: 'auto' }}>
            专注中国客户高端出境游，带您发现世界精彩！
          </Paragraph>
        </div>
      </div>
      {/* 其他内容下移 */}
      <div style={{ padding: 24, marginTop: 32 }}>
        <Title level={4} style={{ marginTop: 32 }}>热门出境游线路</Title>
        <Row gutter={16}>
          {routes.map((r, idx) => (
            <Col xs={24} sm={8} key={idx} style={{ marginBottom: 16 }}>
              <Card
                title={r.title}
                bordered
                hoverable
                cover={<img src={r.img} alt={r.title} style={{ height: 180, objectFit: 'cover' }} />}
              >
                <p>{r.desc}</p>
                <p style={{ color: '#fa541c', fontWeight: 'bold' }}>{r.price}</p>
                <Button type="primary" icon={<GlobalOutlined />}>查看详情</Button>
              </Card>
            </Col>
          ))}
        </Row>
        <div style={{ marginTop: 48, padding: 24, background: '#fafafa', borderRadius: 8 }}>
          <Title level={5}>联系我们</Title>
          <p><PhoneOutlined /> 电话：400-123-4567 &nbsp; | &nbsp; 微信：Gauthier724</p>
          <p>地址：New Costle, DE, USA 19720</p>
        </div>
      </div>
    </div>
  );
} 