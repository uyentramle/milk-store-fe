import Layout from 'antd/es/layout/layout';
import MySider from './Components/Sidebar/Sidebar';
import MyHeader from './Components/Header/Header';
import MyContent from './Components/Content/Content';
import MyFooter from './Components/Footer/Footer';
import { DefaultLayoutProps } from '../../types/layout.type';

const DefaultAdminLayout = ({ children }: DefaultLayoutProps) => {
    return (
        <>
            <Layout className="min-h-screen">
                <MySider />
                <Layout className="bg-white">
                    <MyHeader />
                    <MyContent children={children} />
                    <MyFooter />
                </Layout>
            </Layout>
        </>
    );
};

export default DefaultAdminLayout;
