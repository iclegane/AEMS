import React from 'react';
import './index.scss';
import { Button, Result } from 'antd';
import Page from '../../../components/Page';
import { PageProps } from '../../../models/IPage';


export const ErrorPage: React.FC<React.PropsWithChildren<PageProps>> = ({ title }) => (
    <Page title={title}>
        <div className="error">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary">Back Home</Button>}
            />
        </div>
    </Page>
);
