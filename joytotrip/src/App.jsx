import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined, InfoCircleOutlined, PhoneOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import Home from './Home';
import RoutesPage from './RoutesPage';
import About from './About';
import Contact from './Contact';
// 预留FAQ和线路详情
// import FAQ from './FAQ';
import RouteDetail from './RouteDetail';

const { Header, Content, Footer } = Layout;

function NavMenu() {
  const location = useLocation();
  let selectedKey = 'home';
  if (location.pathname.startsWith('/routes')) selectedKey = 'routes';
  else if (location.pathname.startsWith('/about')) selectedKey = 'about';
  else if (location.pathname.startsWith('/contact')) selectedKey = 'contact';
  else if (location.pathname.startsWith('/faq')) selectedKey = 'faq';
  return (
    <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]} style={{ fontSize: 18, fontWeight: 500, background: 'transparent' }}>
      <Menu.Item key="home" icon={<HomeOutlined />}><Link to="/">首页</Link></Menu.Item>
      <Menu.Item key="routes" icon={<AppstoreOutlined />}><Link to="/routes">旅游线路</Link></Menu.Item>
      <Menu.Item key="about" icon={<InfoCircleOutlined />}><Link to="/about">关于我们</Link></Menu.Item>
      <Menu.Item key="contact" icon={<PhoneOutlined />}><Link to="/contact">联系我们</Link></Menu.Item>
      <Menu.Item key="faq" icon={<QuestionCircleOutlined />}><Link to="/faq">常见问题</Link></Menu.Item>
    </Menu>
  );
}

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f2f5 0%, #e6f7ff 100%)' }}>
        <Header style={{ position: 'fixed', zIndex: 100, width: '100%', background: 'linear-gradient(90deg, #001529 60%, #1890ff 100%)', boxShadow: '0 2px 8px #00152922' }}>
          <div style={{ float: 'left', color: '#fff', fontWeight: 'bold', fontSize: 28, letterSpacing: 2, marginRight: 48 }}>
            喜游记 JoyToTrip
          </div>
          <div style={{ marginLeft: 240 }}>
            <NavMenu />
          </div>
        </Header>
        <Content style={{ background: 'transparent', padding: '96px 0 32px 0', minHeight: 600 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/routes/:id" element={<RouteDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/faq" element={<FAQ />} /> */}
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center', background: 'transparent', fontSize: 16, color: '#888' }}>
          喜游记 JoyToTrip ©2024 | 专注中国高端客户出境游
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
