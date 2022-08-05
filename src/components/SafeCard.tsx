import { FC } from 'react';
import { formatPrice } from '../functions';
import { useAppDispatch } from '../redux/store';
import { saveItem } from '../redux/slices/safeSlice';
import { useNavigate } from 'react-router-dom';
import { SafeItem } from '../types/safes/index';

interface SafeCardProps {
    item: SafeItem
}

const SafeCard: FC<SafeCardProps> = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const saveSafeItem = () => {
        // const { price, tariffNumber, premium } = item;
        // dispatch(saveItem({
        //     price,
        //     premium,
        //     tariffNumber
        // }));
        navigate(item.link);
    }
    return (
        <div className="card safe-card">
            <div className="card-body">
                <div className="card-top">
                    <div className="icon">
                        <item.icon />
                    </div>
                    <div className="heading-item bigger">

                        <div className='sub-title'>{item.subTitle}</div>
                    </div>
                    <div className="heading-item">
                        <h3>{item.heading}</h3>
                    </div>
                    <div className="heading-item mb-0">
                        <p>
                            {item.content}
                        </p>
                    </div>
                </div>
                <div className='card-bottom'>
                    <button className='btn btn-primary' onClick={saveSafeItem}>
                        Оформить
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SafeCard;