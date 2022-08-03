import React, { FC } from 'react';
import VskLogo from '../img/vsk-logo.svg';
import ExitIcon from '../components/icons/ExitIcon';
import NavBtn from './NavBtn';
import Cookies from 'js-cookie';
import { useAppDispatch } from '../redux/store';
import { resetUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
const SidebarFooter: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const logout = () => {
        Cookies.remove('token');
        dispatch(resetUser());
        navigate('/');
    }
    return (
        <>
            <div className="divider"></div>
            <div className="sidebar-footer">
                <NavBtn onClick={logout} title='Выйти' icon={<ExitIcon />} />
                <div className="vsk-logo">
                    <img src={VskLogo} alt="vsk-logo" />
                </div>
                <p>1992–{new Date().getFullYear()} Страховое<br />акционерное общество «ВСК»</p>
            </div>
        </>
    );
}

export default SidebarFooter;