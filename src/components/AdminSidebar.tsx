import { FC } from 'react';
import LvbLogo from './LvbLogo';
import CurrentUser from './CurrentUser';
import Navigation from './Navigation';
import SidebarFooter from './SidebarFooter';
import { useAppSelector } from '../redux/store';
const AdminSidebar: FC = () => {
    const user = useAppSelector((state) => state.currentUser.data);
    return (
        <div className="admin-sidebar">
            <div className="sidebar-top">
                <LvbLogo linkTo='/admin' />
                <CurrentUser title={user ? user.name : ''} email={user ? user.email : ''} />
                <Navigation />
            </div>
            <div className="sidebar-bottom">
                <SidebarFooter />
            </div>
        </div>
    );
}

export default AdminSidebar;