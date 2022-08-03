import { FC, useState } from "react";
import cn from "classnames";
import { formatPrice, formatDate } from "../functions";
import { OrderItem } from "../types/orders";
interface AccordionItemProps {
    item: OrderItem
    onStatusChange: (status: number) => void
}
const AccordionItem: FC<AccordionItemProps> = ({ item, onStatusChange }) => {
    const [active, setActive] = useState(false);
    const onToggle = () => {
        setActive(!active);
    }

    return (
        <div className="card">
            <div className="card-header" id={`heading-${item.id}`}>
                <div className="collapsed" data-toggle="collapse" data-target={`#collapse-${item.id}`} aria-expanded="true" aria-controls={`collapse-${item.id}`} onClick={onToggle}>
                    <div className="row">
                        <div className="col id">
                            {item.policy_number}
                        </div>
                        <div className="col col-2 risk text-center">
                            {item.manager}
                        </div>
                        <div className="col col-2 text-center price">
                            {item.amount ? `${formatPrice(item.limit_amount)}₽` : null}
                        </div>
                        <div className="col col-2 price">
                            {item.amount ? `${formatPrice(item.amount)}₽` : null}
                        </div>
                        <div className="col col-2 date text-center">
                            {item.created_at ? formatDate(item.created_at) : null}
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
                    <div className="divider"></div>
                    <div className="row">
                        <div className="col-5">
                            <div className="item">
                                <div className="sub-heading">Условия страхования</div>
                                <div className="heading">КВ 70%, страховой тариф 1%</div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="item">
                                <div className="sub-heading">Сумма страхования</div>
                                {item.limit_amount ? `${formatPrice(item.limit_amount)} ₽` : null}
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="item">
                                <div className="sub-heading">Стоимость</div>
                                {item.amount ? `${formatPrice(item.amount)} ₽` : null}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <div className="item">
                                <div className="sub-heading">Страхователь</div>
                                <div className="heading">{item.insurer ? item.insurer : null}</div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="item">
                                <div className="sub-heading">Номер телефона</div>
                                <div className="heading">{item.phone ? item.phone : null}</div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="item">
                                <div className="sub-heading">E-mail</div>
                                <div className="heading">{item.email ? item.email : null}</div>
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                        <div className="col-5">
                            <div className="item">
                                <div className="sub-heading">Страховая премия</div>
                                <div className="heading">Фиксированная</div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="item">
                                <div className="sub-heading">Дата начала страхования</div>
                                <div className="heading">{item.created_at ? formatDate(item.created_at) : null}</div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="item">
                                <div className="sub-heading">Срок страхования</div>
                                <div className="heading">12 месяцев</div>
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                        <div className="col-5">
                            <div className="item">
                                <div className="sub-heading big">Полис</div>
                                {item.policy_url && (
                                    <a target={'_blank'} href={item.policy_url}>{item.policy_url}</a>
                                )}
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="item">
                                <div className="sub-heading big">Счёт на оплату</div>
                                {item.invoice_url && (
                                    <a target={'_blank'} href={item.invoice_url}>{item.invoice_url}</a>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                        <div className="col-5">
                            <div className="item">
                                <div className="sub-heading">Менеджер</div>
                                <div className="heading">{item.manager ? item.manager : null}</div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="item">
                                <div className="sub-heading">e-mail</div>
                                <div className="heading">{item.manager_email ? <a href={`mailto:${item.manager_email}`}>{item.manager_email}</a> : null}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="item">
                                <div className="sub-heading big">Статус оплаты</div>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccordionItem;