import { DefaultLayoutProps } from '../../types/layout.type';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';

const DefaultClientLayout = ({ children }: DefaultLayoutProps) => {
    return (
        <div>
            <Header />
            <div className="mt-4 py-4">{children}</div>
            <Footer />
        </div>
    );
};

export default DefaultClientLayout;
