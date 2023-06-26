import { Icon } from '@chakra-ui/react'
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from 'react-icons/md'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCubes,
  faMagnifyingGlass,
  faFileInvoice,
  faM,
  faH,
  faD,
  faW,
} from '@fortawesome/free-solid-svg-icons'

// Admin Imports
import MainDashboard from 'views/admin/default'
import Blocks from 'views/admin/Blocks'
import Search from 'views/admin/Search'
import TransactionSearch from 'views/admin/TransactionSearch'
import MinutelyNetStats from 'views/admin/MinutelyNetStats'
import HourlyNetStats from 'views/admin/HourlyNetStats'
import DailyNetStats from 'views/admin/DailyNetStats'
import WeeklyNetStats from 'views/admin/WeeklyNetStats'
import NFTMarketplace from 'views/admin/marketplace'
import Profile from 'views/admin/profile'
import DataTables from 'views/admin/dataTables'
import RTL from 'views/admin/rtl'

// Auth Imports
import SignInCentered from 'views/auth/signIn'

const routes = [
  {
    name: 'Latest Info',
    layout: '/admin',
    path: '/default',
    icon: (
      <FontAwesomeIcon
        icon={faFileInvoice}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: MainDashboard,
  },
  {
    name: 'Blocks',
    layout: '/admin',
    path: '/blocks',
    icon: (
      <FontAwesomeIcon
        icon={faCubes}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: Blocks,
  },
  {
    name: 'Block Search',
    layout: '/admin',
    path: '/search',
    icon: (
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: Search,
  },
  {
    name: 'Transaction Search',
    layout: '/admin',
    path: '/transactionsearch',
    icon: (
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: TransactionSearch,
  },
  {
    name: 'Minutely net stats',
    layout: '/admin',
    path: '/minutelynetstats',
    icon: (
      <FontAwesomeIcon icon={faM} width="20px" height="20px" color="inherit" />
    ),
    component: MinutelyNetStats,
  },
  {
    name: 'Hourly net stats',
    layout: '/admin',
    path: '/hourlynetstats',
    icon: (
      <FontAwesomeIcon icon={faH} width="20px" height="20px" color="inherit" />
    ),
    component: HourlyNetStats,
  },
  {
    name: 'Daily net stats',
    layout: '/admin',
    path: '/dailynetstats',
    icon: (
      <FontAwesomeIcon icon={faD} width="20px" height="20px" color="inherit" />
    ),
    component: DailyNetStats,
  },
  {
    name: 'Weekly net stats',
    layout: '/admin',
    path: '/weeklynetstats',
    icon: (
      <FontAwesomeIcon icon={faW} width="20px" height="20px" color="inherit" />
    ),
    component: WeeklyNetStats,
  },
  // {
  //   name: 'NFT Marketplace',
  //   layout: '/admin',
  //   path: '/nft-marketplace',
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width="20px"
  //       height="20px"
  //       color="inherit"
  //     />
  //   ),
  //   component: NFTMarketplace,
  //   secondary: true,
  // },
  // {
  //   name: 'Data Tables',
  //   layout: '/admin',
  //   icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
  //   path: '/data-tables',
  //   component: DataTables,
  // },
  // {
  //   name: 'Profile',
  //   layout: '/admin',
  //   path: '/profile',
  //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  //   component: Profile,
  // },
  // {
  //   name: 'Sign In',
  //   layout: '/auth',
  //   path: '/sign-in',
  //   icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
  //   component: SignInCentered,
  // },
  // {
  //   name: 'RTL Admin',
  //   layout: '/rtl',
  //   path: '/rtl-default',
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: RTL,
  // },
]

export default routes
