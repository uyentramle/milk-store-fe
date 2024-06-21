import DefaultAdminLayout from '../layouts/admin/DefaultAdminLayout';
import DefaultClientLayout from '../layouts/client/DefaultClientLayout';
import DashBoardPage from '../pages/admin/DashBoard/DashBoardPage';
import BlogPage from '../pages/client/Blog/BlogPage';
import BlogPageDetail from '../pages/client/Blog/BlogPageDetail';
import HomePage from '../pages/client/Home/HomePage';
import ProductDetail from '../pages/client/Home/ProductDetail';
import SignUpPage from '../pages/client/SignUp/SignUpPage';
import { DefaultLayoutProps } from '../types/layout.type';

interface RouteProps {
    path: string;
    component: React.FC<any>; 
    layout: ({ children }: DefaultLayoutProps) => JSX.Element;
}

const publicRoutes: RouteProps[] = [
    { path: '/', component: HomePage, layout: DefaultClientLayout },
    { path: '/signup', component: SignUpPage, layout: DefaultClientLayout },
    { path: '/blog', component: BlogPage, layout: DefaultClientLayout },
    { path: '/blogdetail', component: BlogPageDetail, layout: DefaultClientLayout },
    { path: '/productdetail', component: ProductDetail, layout: DefaultClientLayout }
];

const privateRoutes: RouteProps[] = [];

const adminRoutes: RouteProps[] = [
    { path: '/admin/', component: DashBoardPage, layout: DefaultAdminLayout },
    
];

export { publicRoutes, privateRoutes, adminRoutes };
