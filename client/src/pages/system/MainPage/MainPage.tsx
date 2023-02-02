import React from "react";
import Layout from "@components/Layout/Layout";
import './index.scss';

const systemMainPage: React.FC = () => {
    return (
        <div className={'page page--system'}>
            <Layout>
                Page Content
            </Layout>
        </div>
    )
}

export default systemMainPage;
