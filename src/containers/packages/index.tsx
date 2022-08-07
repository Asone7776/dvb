import { FC } from 'react';
import { tariffs } from '../../constants';
import { Link, useNavigate } from 'react-router-dom';
import BackIcon from '../../components/icons/BackIcon';
import TariffCard from '../../components/TariffCard';
import { saveItem } from '../../redux/slices/safeSlice';
import { useAppDispatch } from '../../redux/store';
import { SafeProgram } from '../../types/safes';


const PackagesList: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const saveTariff = (tariff: SafeProgram) => {
        dispatch(saveItem(tariff));
        navigate('/admin/new/calculate');
    }
    return (
        <div className='today-orders'>
            <div className="row h-100">
                <div className="col-12">
                    <div className="nav-wrapper">
                        <div className="top-heading">
                            <div className='left-heading'>
                                <Link to={'/admin/new'}>
                                    <BackIcon />
                                </Link>
                                <h3>Защита бизнеса: Пакеты</h3>
                            </div>
                            <p>
                                Комплексное страхование имущества ЮЛ
                            </p>
                        </div>
                    </div>
                </div>
                {tariffs.filter((tariff) => tariff.orderNo !== 0).map((tariff, index) => (
                    <div className="col-4" key={`card-${index}`}>
                        <TariffCard tariff={tariff} onSelect={saveTariff} />
                    </div>
                ))}
                <div className="col-12">
                    <div className="franshize">
                        <div className="card">
                            <h3>Франшиза</h3>
                            <p>
                                30 000 руб. на конструктивные элементы, отделку, инженерное оборудование<br />
                                10 000 руб. на торговое / офисное оборудование (в т.ч. оргтехника) / мебель<br />
                                7 дней на убытки от перерыва в хозяйственной деятельности
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PackagesList;