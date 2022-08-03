import { FC, ReactElement } from 'react';
import NavItem from './NavItem';
import HistoryIcon from './icons/HistoryIcon';
import ProfileIcon from './icons/ProfileIcon';
export interface NavItemProps {
    link: string,
    icon: ReactElement,
    title: string
}

const navigationItems: NavItemProps[] = [
    {
        link: '/admin/new',
        icon: <ProfileIcon />,
        title: 'Новый полис'
    },
    {
        link: '/admin/history',
        icon: <HistoryIcon />,
        title: 'История'
    }
];

const Navigation: FC = () => {
    return (
        <div className="navigation">
            {navigationItems.map((item, index) => <NavItem key={`nav-${index}`} link={item.link} icon={item.icon} title={item.title} />)}
        </div>
    );
}

export default Navigation;