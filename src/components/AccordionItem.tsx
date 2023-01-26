import { FC, useState } from "react";
import cn from "classnames";
import { formatPrice, formatDate, getStatusName } from "../functions";
import { OrderItem } from "../types/orders";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { holdPolice } from "../redux/slices/policeSlice";
import InfoItem from '../components/InfoItem';
import { RISKS_DESCRIPTIONS } from '../risk-constants';
import { tariffs } from "../constants";
import { saveItem } from "../redux/slices/safeSlice";

interface AccordionItemProps {
    item: OrderItem
    onStatusChange: (status: number) => void
}
const AccordionItem: FC<AccordionItemProps> = ({ item, onStatusChange }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [active, setActive] = useState(false);
    const onToggle = () => {
        setActive(!active);
    }
    const savePolice = () => {
        if (item.term != null) {
            dispatch(saveItem(tariffs[item.term]));
        }
        dispatch(holdPolice(item));
        navigate(`/admin/new/edit/${item.id}`);
    }

    return (
        <div className="card">
            <div className="card-header" id={`heading-${item.id}`}>
                <div className="collapsed" data-toggle="collapse" data-target={`#collapse-${item.id}`} aria-expanded="true" aria-controls={`collapse-${item.id}`} onClick={onToggle}>
                    <div className="row">
                        <div className="col id">
                            {item.policy_number}
                        </div>
                        <div className="col text-center tariff-type">
                            {item.form && item.form.tariff === 0 ? 'Залог' : 'Пакет'}
                        </div>
                        <div className="col col-2 risk text-center">
                            {item.manager}
                        </div>
                        <div className="col col-2 price">
                            {item.amount ? `${formatPrice(item.amount)}₽` : null}
                        </div>
                        <div className="col col-2 date text-center">
                            {item.created_at ? formatDate(item.created_at) : null}
                        </div>
                        <div className="col col-2 status text-right">
                            <span className={cn({ 'completed': item.status === 3, 'not-completed': item.status === -1 })}>{getStatusName(item.status)}</span>
                        </div>
                        <div className="col col-1 d-flex justify-content-end">
                            <div className='arrow'>
                                <svg className={cn({ 'active': active })} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.25752 8.9225L9.91252 13.5775C10.2384 13.9033 10.7659 13.9033 11.0909 13.5775L15.7459 8.9225C16.2709 8.3975 15.8992 7.5 15.1567 7.5H5.84669C5.10419 7.5 4.73252 8.3975 5.25752 8.9225Z" fill="#E1BA00" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id={`collapse-${item.id}`} className="collapse" aria-labelledby={`heading-${item.id}`}>
                <div className="card-body">
                    <div className="row">
                        {item && item.options.map((coverage: any, index: number) => (
                            <div className="col-3 mb-3" key={`acc-coverage-${index}`}>
                                <InfoItem title={RISKS_DESCRIPTIONS[coverage.code]} subTitle={'Сумма страхования'}
                                    info={`${formatPrice(coverage.sum)} рублей`}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                        <div className="col-3">
                            <InfoItem subTitle={'Страхователь'}
                                info={item.insurer}
                            />
                        </div>
                        <div className="col-3">
                            <InfoItem subTitle={'Юридический адрес'}
                                info={item.address}
                            />
                        </div>
                        <div className="col-3">
                            <InfoItem subTitle={'Объект страхования'}
                                info={item.form && item.form.property_name && item.form.property_name}
                            />
                        </div>
                        <div className="col-3">
                            <InfoItem subTitle={'Площадь объекта страхования, кв. м.'}
                                info={item.form && item.form.object_area && item.form.object_area}
                            />
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                        <div className="col-3">
                            <InfoItem subTitle={'Контактное лицо'}
                                info={item.signer}
                            />
                        </div>
                        <div className="col-3">
                            <InfoItem subTitle={'Номер телефона'}
                                info={item.phone}
                            />
                        </div>
                        <div className="col-3">
                            <InfoItem subTitle={'Email'}
                                info={item.email}
                            />
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                        <div className="col-5">
                            <InfoItem subTitle={'Полис страхования'}
                                link={item.policy_url}
                            />
                        </div>
                        <div className="col-5">
                            <InfoItem subTitle={'Счёт на оплату'}
                                link={item.invoice_url}
                            />
                        </div>
                    </div>
                    <div className="row align-items-end">
                        <div className="col-9">
                            <div className="item">
                                <div className="info-item">
                                    <span>Статус оплаты</span>
                                </div>
                                <div className="d-flex">
                                    <div className={cn('btn', { 'btn btn-blue': item.status === 3, 'btn-gray': item.status !== 3 })} onClick={() => {
                                        onStatusChange(3);
                                    }}>
                                        Оплачен
                                    </div>
                                    <div className={cn('btn', { 'btn btn-blue': item.status === 0, 'btn-gray': item.status !== 0 })} onClick={() => {
                                        onStatusChange(0);
                                    }}>
                                        Не оплачен
                                    </div>
                                    <div className={cn('btn', { 'btn btn-blue': item.status === -1, 'btn-gray': item.status !== -1 })} onClick={() => {
                                        onStatusChange(-1);
                                    }}>
                                        Отменён
                                    </div>
                                </div>
                            </div>
                        </div>
                        {item.status !== 3 ? (
                            <div className="col-3">
                                <button className='btn btn-primary-with-border w-100' onClick={savePolice}>
                                    Редактировать
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccordionItem;