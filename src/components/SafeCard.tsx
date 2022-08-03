import { FC } from 'react';
import { formatPrice } from '../functions';
import { useAppDispatch } from '../redux/store';
import { saveItem } from '../redux/slices/safeSlice';
import { useNavigate } from 'react-router-dom';
interface SafeCardInfo {
    price: number
    tariffNumber: number
    premium: number
    term: number
    link: string
}

interface SafeCardProps {
    item: SafeCardInfo
}

const SafeCard: FC<SafeCardProps> = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const saveSafeItem = () => {
        const { price, tariffNumber, premium } = item;
        dispatch(saveItem({
            price,
            premium,
            tariffNumber
        }));
        navigate(item.link);
    }
    return (
        <div className="card safe-card">
            <div className="card-body">
                <div className="card-top">
                    <div className="heading-item bigger">
                        <div className="price-heading">
                            Страховая сумма
                        </div>
                        <h3>{formatPrice(item.price)} ₽</h3>
                    </div>
                    <div className="heading-item bigger">
                        <div className="price-heading">
                            Страховая премия
                        </div>
                        <h3>{formatPrice(item.premium)} ₽</h3>
                    </div>
                    <div className="heading-item">
                        <div className="price-heading">
                            Срок страхования
                        </div>
                        <h3 className='primary-color'>{item.term} месяцев</h3>
                    </div>
                </div>
                <div className='card-bottom'>
                    <button className='btn btn-blue' onClick={saveSafeItem}>
                        Оформить
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SafeCard;