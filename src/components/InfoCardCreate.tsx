import { FC } from "react";
import cn from "classnames";
import { formatPrice } from "../functions";
import Spinner from "./Spinner";
import { Link } from 'react-router-dom';
interface InfoCardCreateProps {
    loading: boolean
    data: any
    organization_name?: string
    premium?: number
    submitTitle?: string
}

const InfoCardCreate: FC<InfoCardCreateProps> = ({ organization_name, loading, data, premium, submitTitle = 'Заключить договор' }) => {
    return (
        <div className='card custom-card-small'>
            <div className={'info-wrapper'}>
                <div className="info-block">
                    <span>Страхователь</span>
                    <h4>{organization_name ? organization_name : ''}</h4>
                </div>
                <div className="divider"></div>
                {data && data[0] ? (
                    <>
                        <div className="info-block">
                            <span>Контактное лицо</span>
                            <h4>{data[0]}</h4>
                        </div>
                        <div className="divider"></div>
                    </>
                ) : null}
                {data && data[1] ? (
                    <>
                        <div className="info-block">
                            <span>Объект страхования</span>
                            <h4>{data[1].name}</h4>
                        </div>
                        <div className="divider"></div>
                    </>
                ) : null}
                <div className="info-block">
                    <span className="mb-0">Стоимость полиса</span>
                    <div className="pre-price">{premium ? `${formatPrice(premium)} ₽` : ''}</div>
                </div>
                <div>
                    <button type="submit" disabled={loading} className={cn('btn btn-primary', { 'loading': loading })}>
                        {loading ? (
                            <Spinner />
                        ) : submitTitle}
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

export default InfoCardCreate;