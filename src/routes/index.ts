import DefaultAdminLayout from '../layouts/admin/DefaultAdminLayout';
import DefaultClientLayout from '../layouts/client/DefaultClientLayout';
import DefaultAuthenLayout from '../layouts/authen/DefaultAuthenLayout';
import DashBoardPage from '../pages/admin/DashBoard/DashBoardPage';
import BlogPage from '../pages/client/Blog/BlogPage';
import BlogPageDetail from '../pages/client/Blog/BlogPageDetail';
import HomePage from '../pages/client/Home/HomePage';
import ProductDetail from '../pages/client/Home/ProductDetail';
import SignUpPage from '../pages/client/SignUp/SignUpPage';
import SignInPage from '../pages/client/SignIn/SignInPage';
import ForgotPasswordPage from '../pages/client/ForgotPassword/ForgotPasswordPage';
import { DefaultLayoutProps } from '../types/layout.type';

interface RouteProps {
    path: string;
    component: React.FC<any>; 
    layout: ({ children }: DefaultLayoutProps) => JSX.Element;
}

const publicRoutes: RouteProps[] = [
    { path: '/', component: HomePage, layout: DefaultClientLayout },
    { path: '/sign-up', component: SignUpPage, layout: DefaultAuthenLayout },
    { path: '/sign-in', component: SignInPage, layout: DefaultAuthenLayout },
    { path: '/forgot-password', component: ForgotPasswordPage, layout: DefaultAuthenLayout },
    { path: '/blog', component: BlogPage, layout: DefaultClientLayout },
    { path: '/blogdetail', component: BlogPageDetail, layout: DefaultClientLayout },
    { path: '/productdetail', component: ProductDetail, layout: DefaultClientLayout },
];

const privateRoutes: RouteProps[] = [];

const adminRoutes: RouteProps[] = [
    { path: '/admin/', component: DashBoardPage, layout: DefaultAdminLayout },
    
];

export { publicRoutes, privateRoutes, adminRoutes };
