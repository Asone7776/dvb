import { FC } from "react";
import cn from "classnames";
import { formatPrice } from "../functions";
import Spinner from "./Spinner";
import { Link } from 'react-router-dom';
import { RISKS_DESCRIPTIONS } from '../risk-constants';
interface CoveragesCardProps {
    loading: boolean
    data: any[] | null
    organization_name?: string
    disabledValues: boolean[] | null
    price: number | null
}

const CoveragesCard: FC<CoveragesCardProps> = ({ loading, data, disabledValues, price }) => {
    let customData = data ? Object.entries(data) : [];
    return (
        <div className='card custom-card-small'>
            <div className={'info-wrapper'}>
                {customData.map(([key, value], index) => (
                    disabledValues && disabledValues[index] && (
                        <div key={`info-block-${index}`}>
                            <div className="info-block">
                                <span>{RISKS_DESCRIPTIONS[`${key}_DESC`]}</span>
                                <span className="gray-heading">Сумма страхования</span>
                                <h4>{`${formatPrice(value)} ₽`}</h4>
                            </div>
                            <div className="divider"></div>
                        </div>
                    )
                ))}
                <div className="info-block">
                    <span className="mb-0">Стоимость полиса</span>
                    <h4 className="pre-price">{price ? formatPrice(price) : 0} ₽</h4>
                </div>
                <div>
                    {price ? (
                        <Link to={'/admin/new/create'} >
                            <button className="btn btn-primary mb-3">
                                Оформить
                            </button>
                        </Link>
                    ) : null}
                    <button type="submit" disabled={loading} className={cn('btn btn-primary', { 'loading': loading })}>
                        {loading ? (
                            <Spinner />
                        ) : 'Сформировать'}
                    </button>
                    <Link to={'/admin/new'}>
                        <button className="btn btn-primary-transparent ml-0">
                            Отменить
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CoveragesCard;