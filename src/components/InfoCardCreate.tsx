import { FC } from "react";
import cn from "classnames";
import { formatPrice } from "../functions";
import Spinner from "./Spinner";
import { Link } from 'react-router-dom';
import { SafeItem } from '../types/safes';
interface InfoCardCreateProps {
    loading: boolean
    data: SafeItem | null
    organization_name?: string
}

const InfoCardCreate: FC<InfoCardCreateProps> = ({ organization_name, loading, data }) => {

    return (
        <div className='card custom-card-small'>
            <div className={'info-wrapper'}>
                <div className="info-block">
                    <span>Страхователь</span>
                    <h4>{organization_name ? organization_name : ''}</h4>
                </div>
                <div className="divider"></div>
                <div className="info-block">
                    <span>Сумма полиса</span>
                    <h4>{data && data.price ? `${formatPrice(data.price)} ₽` : ''}</h4>
                </div>
                <div className="divider"></div>

                <div className="info-block">
                    <span className="mb-0">Стоимость полиса</span>
                    <div className="pre-price">{data && data.premium ? `${formatPrice(data.premium)} ₽` : ''}</div>
                </div>
                <div>
                    <button type="submit" disabled={loading} className={cn('btn btn-blue', { 'loading': loading })}>
                        {loading ? (
                            <Spinner />
                        ) : 'Сформировать счёт'}
                    </button>
                    <Link to={'/admin/new'}>
                        <button className="btn btn-primary ml-0">
                            Отменить
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default InfoCardCreate;