import DefaultAdminLayout from '../layouts/admin/DefaultAdminLayout';
import DefaultClientLayout from '../layouts/client/DefaultClientLayout';
import DefaultAuthenLayout from '../layouts/authen/DefaultAuthenLayout';
import DashBoardPage from '../pages/admin/DashBoard/DashBoardPage';
import BlogPage from '../pages/client/Blog/BlogPage';
import BlogPageDetail from '../pages/client/Blog/BlogPageDetail';
import HomePage from '../pages/client/Home/HomePage';
import ProductDetail from '../pages/client/Product/ProductDetail';
import SignUpPage from '../pages/client/SignUp/SignUpPage';
import SignInPage from '../pages/client/SignIn/SignInPage';
import ForgotPasswordPage from '../pages/client/ForgotPassword/ForgotPasswordPage';
import BrandPage from '../pages/client/Brand/BrandPage';
import BrandDetailPage from '../pages/client/Brand/BrandDetailPage';
import { DefaultLayoutProps } from '../types/layout.type';
import CartPage from '../pages/client/Cart/Cart';



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
    { path: '/blog-detail', component: BlogPageDetail, layout: DefaultClientLayout },
    { path: '/product-detail', component: ProductDetail, layout: DefaultClientLayout },
    { path: '/cart', component: CartPage, layout: DefaultClientLayout },
    { path: '/brand', component: BrandPage, layout: DefaultClientLayout },
    { path: '/brand-name', component: BrandDetailPage, layout: DefaultClientLayout },
];

const privateRoutes: RouteProps[] = [];

const adminRoutes: RouteProps[] = [
    { path: '/admin/', component: DashBoardPage, layout: DefaultAdminLayout },

];

export { publicRoutes, privateRoutes, adminRoutes };
