import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
// import BlogPage from './pages/BlogPage';
import SubCategoryPage from './pages/SubCategory';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import CategoryPage from './pages/CategoryPage';
import CategoryAddPage from './pages/CategoryAdd';
import SubCategoryAddPage from './pages/SubCategoryAdd';
import DashboardAppPage from './pages/DashboardAppPage';
import Registration from './pages/Registration';
import DealerPage from './pages/Dealer';
import ItemPage from './pages/Item';
import DealerAddPage from './pages/DealerAdd';
import ItemAddPage from './pages/ItemAdd';
import SalesPage from './pages/Sales';
// import ProfilePage from './pages/ProfilePage';
import DonationRequestAdd from './pages/DonationRequestAdd';
import Loader from './pages/Loader';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'category', element: <CategoryPage /> },
        { path: 'categoryAdd/:itemCategoryID', element: <CategoryAddPage /> },
        { path: 'SubCategoryAdd', element: <SubCategoryAddPage /> },
        { path: 'SubCategory', element: <SubCategoryPage /> },
        { path: 'Dealer', element: <DealerPage /> },
        { path: 'Item', element: <ItemPage /> },
        { path: 'DealerAdd', element: <DealerAddPage /> },
        { path: 'ItemAdd', element: <ItemAddPage /> },
        { path: 'Sales', element: <SalesPage /> },
        // { path: 'profilePage', element: <ProfilePage /> },
        { path: 'donationRequestAdd', element: <DonationRequestAdd /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'registration',
      element: <Registration />,
    },
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: 'loader',
      element: <Loader />,
    },

  ]);

  return routes;
}

