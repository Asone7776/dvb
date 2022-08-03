import { FC } from 'react';
import Logo from '../img/dvb-min.png';
import { Link } from 'react-router-dom';
interface LogoComponentProps {
    linkTo?: string
}
const LvbLogo: FC<LogoComponentProps> = ({ linkTo }) => {
    return (
        linkTo ? (
            <div className='lvb-logo'>
                <Link to={linkTo}>
                    <img src={Logo} alt="bank-logo" />
                </Link>
            </div>
        ) : (
            <div className='lvb-logo'>
                <img src={Logo} alt="bank-logo" />
            </div>
        )
    );
}

export default LvbLogo;