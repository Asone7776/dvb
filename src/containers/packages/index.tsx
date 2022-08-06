import { FC } from 'react';
import { tariffs } from '../../constants';
import { Link } from 'react-router-dom';
import BackIcon from '../../components/icons/BackIcon';
interface PackagesListProps {

}

const PackagesList: FC<PackagesListProps> = () => {
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
                {/* {cards.map((card, index) => (
                    <div className="col-4" key={`card-${index}`}>
                        <SafeCard item={card} />
                    </div>
                ))} */}
            </div>
        </div>
    );
}

export default PackagesList;