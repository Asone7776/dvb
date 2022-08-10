import { FC } from 'react';
import { SafeProgram } from '../types/safes/index';
import CheckIcon from '../components/icons/CheckIcon';
import CrossIcon from '../components/icons/CrossIcon';
import { formatPrice } from '../functions';
interface TariffCardProps {
    tariff: SafeProgram
    onSelect: (tariff: SafeProgram) => void
}

const TariffCard: FC<TariffCardProps> = ({ tariff, onSelect }) => {
    const onSelectTariff = () => {
        onSelect(tariff);
    }
    return (
        <div className="card tariff-card">
            <div className="tariff-top">
                <h3>{tariff.tariffName}</h3>
                <div className="divider"></div>
                <div className="risks">
                    <h4>Риски</h4>
                    <ul>
                        {tariff.risks && tariff.risks.map((risk, index) => (
                            <li className='risk-item' key={`risk-${index}`}>
                                <div className='risk-icon'>
                                    {risk.includes ? <CheckIcon /> : <CrossIcon />}
                                </div>
                                <p>
                                    {risk.name}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='tariff-bottom'>
                <div className="divider"></div>
                <div className="price">
                    <h5>Страховая премия</h5>
                    {tariff.premium ? formatPrice(tariff.premium) + ' ₽' : null}
                </div>
                <button className='btn btn-primary w-100' onClick={onSelectTariff}>
                    Оформить
                </button>
            </div>
        </div>
    );
}

export default TariffCard;