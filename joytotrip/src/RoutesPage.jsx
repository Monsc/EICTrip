import React, { useState, useEffect, useMemo } from 'react';
import { Card, Row, Col, Pagination, Typography, Button, Input, Select, Spin, Empty } from 'antd';
import { GlobalOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { fetchRoutes } from './api';

const { Title } = Typography;
const { Option } = Select;

// Static fallback data used if API not reachable
const fallbackRoutes = [
  { id: 1, title: '日本樱花之旅', desc: '东京-大阪-京都6日深度游，赏樱花、泡温泉、品美食', price: '¥8999起', type: '亚洲' },
  { id: 2, title: '巴尔干秘境之旅', desc: '塞尔维亚，波黑，黑山，三国探秘之旅，8天7晚穿越欧洲最后的秘境', price: '¥14999起', type: '欧洲' },
  { id: 3, title: '欧洲多国风情', desc: '法意瑞10日经典线路，卢浮宫、少女峰、威尼斯', price: '¥25999起', type: '欧洲' },
];

export default function RoutesPage() {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState(fallbackRoutes);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchRoutes({ populate: '*' });
        if (!cancelled && data?.length) {
          setRoutes(data);
        }
      } catch (err) {
        console.warn('RoutesPage: API load failed, using fallback data', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    let list = routes;
    if (filterType !== 'all') {
      list = list.filter(r => r.type === filterType);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(r => (r.title + r.desc).toLowerCase().includes(q));
    }
    return list;
  }, [routes, filterType, query]);

  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: 64 }}><Spin size="large" /></div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ marginBottom: 24 }}>精选线路</Title>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <Input
          placeholder="搜索目的地/关键词"
          prefix={<SearchOutlined />}
          value={query}
          onChange={e => { setQuery(e.target.value); setPage(1); }}
          style={{ maxWidth: 260 }}
        />
        <Select
          value={filterType}
          style={{ width: 160 }}
          onChange={v => { setFilterType(v); setPage(1); }}
          suffixIcon={<FilterOutlined />}
        >
          <Option value="all">全部</Option>
          <Option value="亚洲">亚洲</Option>
          <Option value="欧洲">欧洲</Option>
          <Option value="大洋洲">大洋洲</Option>
          <Option value="中东">中东</Option>
        </Select>
      </div>
      {filtered.length === 0 ? (
        <Empty description="暂无线路" />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {pageData.map(r => (
              <Col xs={24} sm={12} md={8} key={r.id}>
                <Card
                  title={r.title}
                  bordered
                  hoverable
                  onClick={() => navigate(`/routes/${r.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <p>{r.desc}</p>
                  <p style={{ color: '#fa541c', fontWeight: 'bold' }}>{r.price}</p>
                  <Button type="primary" icon={<GlobalOutlined />}>查看详情</Button>
                </Card>
              </Col>
            ))}
          </Row>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Pagination current={page} pageSize={pageSize} total={filtered.length} onChange={setPage} />
          </div>
        </>
      )}
    </div>
  );
}
