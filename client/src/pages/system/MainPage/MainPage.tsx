import React from 'react';
import './index.scss';
import { Card, Col, Row, Space } from 'antd';
import Page from '../../../components/Page';
import { PageProps } from '../../../models/IPage';
import { newsItems } from '../../../utils/news';


export const MainPage: React.FC<React.PropsWithChildren<PageProps>> = ({ title }) => (
        <Page title={title}>
            <div className="users gap-30">
                <div className="dashboard-content-block">
                    <h2>Новости нашей компании</h2>
                    <Row gutter={16} align="stretch">
                        {newsItems && newsItems.map((news) => (
                            <Col key={news.title} span={6}>
                                <Card title={news.title} bordered={false}>
                                    {news.description}
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </Page>
    );
