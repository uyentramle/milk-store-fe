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
import PromotionPage from '../pages/client/Promotion/PromotionPage';

import DashBoardPage from '../pages/admin/DashBoard/DashBoardPage';
// import ManageAccountPage from '../pages/admin/AccountManagement/AccountManagementPage';
import AccountManagementPage from '../pages/admin/AccountManagement/AccountManagementPage';
import CreateAccountPage from '../pages/admin/ManageAccount/CreateAccountPage';
import ManageProductPage from '../pages/admin/ManageProduct/ManageProductPage';
import CreateProductPage from '../pages/admin/ManageProduct/CreateProductPage';
import ManageOrderPage from '../pages/admin/ManageOrder/ManageOrderPage';
import ProductDetailPage from '../pages/admin/ManageProduct/ProductDetailsPage';
import BrandManagementPage from '../pages/admin/BrandManagement/BrandManagementPage';
import CreateBrandPage from '../pages/admin/BrandManagement/CreateBrandPage';
import UpdateBrandPage from '../pages/admin/BrandManagement/UpdateBrandPage';
import VoucherManagementPage from '../pages/admin/VoucherManagement/VoucherManagementPage';
import CreateVoucherPage from '../pages/admin/VoucherManagement/CreateVoucherPage';
import UpdateVoucherPage from '../pages/admin/VoucherManagement/UpdateVoucherPage';
import BlogManagementPage from '../pages/admin/BlogManagement/BlogManagementPage';
import CreateBlogPage from '../pages/admin/BlogManagement/CreateBlogPage';
import CategoryBlogManagementPage from '../pages/admin/CategoryManagement/CategoryManagementPage';
import CreateCategoryBlogPage from '../pages/admin/CategoryManagement/CreateCategoryPage';
import ProductTypeManagementPage from '../pages/admin/ProductTypeManagement/ProductTypeManagementPage';
import CreateProductTypePage from '../pages/admin/ProductTypeManagement/CreateProductTypePage';

import UserProfilePage from '../pages/client/User/UserProfilePage';
import ChangePasswordPage from '../pages/client/User/ChangePasswordPage';
import OrderHistoryPage from '../pages/client/User/OrderHistoryPage';
import UserAddressPage from '../pages/client/User/UserAddressPage';
import AccountSettingsPage from '../pages/client/User/AccountSettingsPage';
import PointHistoryTransaction from '../pages/client/User/PointHistoryTransaction';

import { DefaultLayoutProps } from '../types/layout.type';
import UpdateBlogPage from '../pages/admin/BlogManagement/UpdateBlogPage';
import UpdateProductPage from '../pages/admin/ManageProduct/UpdateProductPage';
import UpdateProductTypePage from '../pages/admin/ProductTypeManagement/UpdateProductTypePage';
import RestoreProductTypePage from '../pages/admin/ProductTypeManagement/RestoreProductTypePage';

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
    { path: '/blog-detail/:blogId', component: BlogPageDetail, layout: DefaultClientLayout }, // Updated route
    { path: '/product-detail', component: ProductDetail, layout: DefaultClientLayout },

    { path: '/brand', component: BrandPage, layout: DefaultClientLayout },
    { path: '/brand-name/:brandId', component: BrandDetailPage, layout: DefaultClientLayout },
    { path: '/contact', component: ContactPage, layout: DefaultClientLayout },
    { path: '/promotion', component: PromotionPage, layout: DefaultClientLayout },

    { path: '/user-profile', component: UserProfilePage, layout: DefaultClientLayout },
    { path: '/change-password', component: ChangePasswordPage, layout: DefaultClientLayout },
    { path: '/order-history', component: OrderHistoryPage, layout: DefaultClientLayout },
    { path: '/user-address', component: UserAddressPage, layout: DefaultClientLayout },
    { path: '/account-settings', component: AccountSettingsPage, layout: DefaultClientLayout },


    { path: '/point-history-transaction', component: PointHistoryTransaction, layout: DefaultClientLayout },

];

const privateRoutes: RouteProps[] = [];

const adminRoutes: RouteProps[] = [
    { path: '/admin/', component: DashBoardPage, layout: DefaultAdminLayout },
    { path: '/admin/manage-users', component: AccountManagementPage, layout: DefaultAdminLayout },
    { path: '/admin/accounts/create', component: CreateAccountPage, layout: DefaultAdminLayout },
    { path: '/admin/products', component: ManageProductPage, layout: DefaultAdminLayout },
    { path: '/admin/products/details/:id', component: ProductDetailPage, layout: DefaultAdminLayout },
    { path: '/admin/products/create', component: CreateProductPage, layout: DefaultAdminLayout },
    { path: '/admin/products/update/:productId', component: UpdateProductPage, layout: DefaultAdminLayout },
    { path: '/admin/orders', component: ManageOrderPage, layout: DefaultAdminLayout },
    { path: '/admin/brands', component: BrandManagementPage, layout: DefaultAdminLayout },
    { path: '/admin/brands/create', component: CreateBrandPage, layout: DefaultAdminLayout },
    { path: '/admin/brands/update/:brandId', component: UpdateBrandPage, layout: DefaultAdminLayout },
    { path: '/admin/vouchers', component: VoucherManagementPage, layout: DefaultAdminLayout },
    { path: '/admin/vouchers/create', component: CreateVoucherPage, layout: DefaultAdminLayout },
    { path: '/admin/vouchers/update/:voucherId', component: UpdateVoucherPage, layout: DefaultAdminLayout },
    { path: '/admin/blogs', component: BlogManagementPage, layout: DefaultAdminLayout },
    { path: '/admin/blogs/create', component: CreateBlogPage, layout: DefaultAdminLayout },
    { path: '/admin/blogs/edit/:blogId', component: UpdateBlogPage, layout: DefaultAdminLayout },
    { path: '/admin/categories', component: CategoryBlogManagementPage, layout: DefaultAdminLayout },
    { path: '/admin/categories/create', component: CreateCategoryBlogPage, layout: DefaultAdminLayout },
    { path: '/admin/product-types', component: ProductTypeManagementPage, layout: DefaultAdminLayout },
    { path: '/admin/product-types/create', component: CreateProductTypePage, layout: DefaultAdminLayout },
    { path: '/admin/product-types/update/:id', component: UpdateProductTypePage, layout: DefaultAdminLayout },
    { path: '/admin/product-types/restore', component: RestoreProductTypePage, layout: DefaultAdminLayout}
];

export { publicRoutes, privateRoutes, adminRoutes };
