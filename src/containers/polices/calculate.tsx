import { FC } from 'react';
import { useAppSelector } from '../../redux/store';
import { Link } from 'react-router-dom';
import BackIcon from '../../components/icons/BackIcon';
import CalculateForm from '../../components/CalculateForm';

const Calculate: FC = () => {
    const tariff = useAppSelector(state => state.safe.data);
    return (
        <div className="information">
            <div className="row">
                <div className="col-12">
                    <div className="nav-wrapper">
                        <div className="top-heading">
                            <div className="left-heading">
                                <Link to={'/admin/new'}>
                                    <BackIcon />
                                </Link>
                                <h3>{tariff ? tariff.tariffName : null}</h3>
                            </div>
                        </div>
                    </div>
                    <CalculateForm />
                </div>
            </div>
        </div>
    );
}

export default Calculate;