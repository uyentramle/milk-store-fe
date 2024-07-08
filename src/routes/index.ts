import DefaultAdminLayout from '../layouts/admin/DefaultAdminLayout';
import DefaultClientLayout from '../layouts/client/DefaultClientLayout';
import DefaultAuthenLayout from '../layouts/authen/DefaultAuthenLayout';

import BlogPage from '../pages/client/Blog/BlogPage';
import BlogPageDetail from '../pages/client/Blog/BlogPageDetail';
import HomePage from '../pages/client/Home/HomePage';
import ProductDetail from '../pages/client/Product/ProductDetail';
import SignUpPage from '../pages/client/SignUp/SignUpPage';
import SignInPage from '../pages/client/SignIn/SignInPage';
import ForgotPasswordPage from '../pages/client/ForgotPassword/ForgotPasswordPage';

import ShoppingCart from '../pages/client/Cart/Cart';
import BrandPage from '../pages/client/Brand/BrandPage';
import BrandDetailPage from '../pages/client/Brand/BrandDetailPage';
import ContactPage from '../pages/client/Contact/ContactPage';


import DashBoardPage from '../pages/admin/DashBoard/DashBoardPage';
import ManageAccountPage from '../pages/admin/ManageAccount/ManageAccountPage';
import CreateAccountPage from '../pages/admin/ManageAccount/CreateAccountPage';
import ManageProductPage from '../pages/admin/ManageProduct/ManageProductPage';
import CreateProductPage from '../pages/admin/ManageProduct/CreateProductPage';
import ManageOrderPage from '../pages/admin/ManageOrder/ManageOrderPage';

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

    { path: '/cart', component: ShoppingCart, layout: DefaultClientLayout },
    { path: '/blog-detail', component: BlogPageDetail, layout: DefaultClientLayout },
    { path: '/product-detail', component: ProductDetail, layout: DefaultClientLayout },

    { path: '/brand', component: BrandPage, layout: DefaultClientLayout },
    { path: '/brand-name', component: BrandDetailPage, layout: DefaultClientLayout },
    { path: '/contact', component: ContactPage, layout: DefaultClientLayout },

];

const privateRoutes: RouteProps[] = [];

const adminRoutes: RouteProps[] = [
    { path: '/admin/', component: DashBoardPage, layout: DefaultAdminLayout },
    { path: '/admin/accounts', component: ManageAccountPage, layout: DefaultAdminLayout },
    { path: '/admin/accounts/create', component: CreateAccountPage, layout: DefaultAdminLayout },
    { path: '/admin/products', component: ManageProductPage, layout: DefaultAdminLayout },
    { path: '/admin/products/create', component: CreateProductPage, layout: DefaultAdminLayout },
    { path: '/admin/orders', component: ManageOrderPage, layout: DefaultAdminLayout },
];

export { publicRoutes, privateRoutes, adminRoutes };
