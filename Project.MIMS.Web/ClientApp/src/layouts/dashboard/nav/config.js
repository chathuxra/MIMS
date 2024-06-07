import { useRouteLoaderData } from 'react-router-dom';
import SvgColor from '../../../components/svg-color';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryIcon from '@mui/icons-material/Category';
import AbcIcon from '@mui/icons-material/Abc';
import BadgeIcon from '@mui/icons-material/Badge';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

function DashboardNav() {
  const [userType, setUserType] = useState(0);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    setUserId(userIdFromStorage);
  }, []);

  useEffect(() => {
    GetUserDetailsByUserID();
  }, [userId]);

  async function GetUserDetailsByUserID() {
    const result = await axios.get('https://localhost:7211/api/User/GetUserDetailsByUserID', {
      params: {
        userId: userId
      }
    });

    setUserType(result.data.data.userType);
  }

  const admin = [
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: icon('ic_analytics'),
    },
    {
      title: 'Category',
      path: '/dashboard/user',
      icon: icon('ic_user'),
    },
    {
      title: 'SubCategory',
      path: '/dashboard/blog',
      icon: icon('ic_blog'),
    },
    {
      title: 'Dealer',
      path: '/dashboard/profilePage',
      icon: icon('ic_usergroup'),
    },
    {
      title: 'Item',
      path: '/dashboard/donationRequestAdd',
      icon: icon('ic_heart'),
    }
  ];

  const donor = [
    {
      title: 'Dashboard',
      path: '/dashboard/app',
      icon: icon('ic_analytics'),
    },
    {
      title: 'Category',
      path: '/dashboard/category',
      icon: <CategoryIcon />,
    },
    {
      title: 'Sub Category',
      path: '/dashboard/SubCategory',
      icon: <AbcIcon />,
    },
    {
      title: 'Dealer',
      path: '/dashboard/Dealer',
      icon: <BadgeIcon />,
    },
    {
      title: 'Item',
      path: '/dashboard/Item',
      icon: <AssessmentIcon />,
    },
    {
      title: 'Sale',
      path: '/dashboard/Sales',
      icon: <AttachMoneyIcon />,
    },
    {
      title: 'Report',
      path: '/dashboard/Page404',
      icon: <AutoStoriesIcon />,
    },
    // {
    //   title: 'Category Add',
    //   path: '/dashboard/categoryAdd',
    //   icon: icon('ic_heart'),
    // }
  ];

  const seeker = [
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: icon('ic_analytics'),
    },
    {
      title: 'Category',
      path: '/dashboard/blog',
      icon: icon('ic_blog'),
    },
    {
      title: 'Sub Category',
      path: '/dashboard/profilePage',
      icon: icon('ic_usergroup'),
    },
    {
      title: 'Item',
      path: '/dashboard/donationRequestAdd',
      icon: icon('ic_heart'),
    },
  ];

  const exportIlement = userType === 1 ? admin : userType === 2 ? donor : seeker;

  return exportIlement;
}

export default DashboardNav;