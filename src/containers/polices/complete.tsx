import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { formatPrice } from '../../functions';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { RISKS_DESCRIPTIONS } from '../../risk-constants';
import CompleteCard from '../../components/CompleteCard';
import InfoItem from '../../components/InfoItem';
import { successNotify, failureNotify } from '../../notifications';
import { axiosAuth } from '../../axios-instances';
import { resetSavedPolicy } from '../../redux/slices/policeSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from "../../components/Spinner";
const CompletePolice: FC = () => {
    const police = useAppSelector(state => state.police.savedPolicy);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const safe = useAppSelector(state => state.safe.data);
    const [sendLoading, setSendLoading] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);
    const sendToInsurer = async () => {
        setSendLoading(true);
        try {
            const response = await axiosAuth.get(`/orders_send/${police.data?.order.id}`);
            successNotify(response.data.data);
            setSendLoading(false);
            dispatch(resetSavedPolicy());
            successNotify('Заключенный договор направлен на электронную почту клиента и менеджера Банка');
            navigate('/admin/new');
        } catch (error: any) {
            setSendLoading(false);
            dispatch(resetSavedPolicy());
            if (error.response.data && error.response.data.errors) {
                failureNotify(error.response.data.errors);
            }
        }
    }
    const cancelOrder = async () => {
        setCancelLoading(true);
        try {
            const response = await axiosAuth.delete(`/orders/${police.data?.order.id}`);
            successNotify(response.data.data);
            setCancelLoading(false);
            dispatch(resetSavedPolicy());
            navigate('/admin/new');
        } catch (error: any) {
            setCancelLoading(false);
            dispatch(resetSavedPolicy());
            if (error.response.data && error.response.data.errors) {
                failureNotify(error.response.data.errors);
            }
        }
    }
    const editOrder = async () => {
        navigate(`/admin/new/edit/${police.data?.order.id}`);
    }
    useEffect(() => {
        if(!police.data || !safe){
            navigate('/admin/new');
        }
    }, []);
    return (
        <div className="information complete-block">
            <div className="row">
                <div className="col-12">
                    <div className="top-heading">
                        {safe && (
                            <h3>{safe.tariffName}</h3>
                        )}
                    </div>
                    <div className="row complete-block">
                        <div className="col-8">
                            <div className="row">
                                {police.data?.order && police.data.order.options.map((item: any, index: number) => (
                                    <div className="col-6 mb-3">
                                        <InfoItem title={RISKS_DESCRIPTIONS[item.code + '_DESC']} subTitle={'Сумма страхования'}
                                            info={`${formatPrice(item.sum)} рублей`}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="divider"></div>
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <InfoItem subTitle='Страхователь' info={police.data?.order.insurer} />
                                </div>
                                <div className="col-6 mb-3">
                                    <InfoItem subTitle='Юридический адрес' info={police.data?.order.address} />
                                </div>
                                <div className="col-6 mb-3">
                                    <InfoItem subTitle='Объект страхования' info={police.data?.order.signer} />
                                </div>
                                <div className="col-6 mb-3">
                                    <InfoItem subTitle='Квадратура' />
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className="row">
                                {police.data?.order.buy_url ? (
                                    <div className="col-6">
                                        <InfoItem subTitle='Полис страхования' link={police.data?.order.buy_url} />
                                    </div>
                                ) : null}
                                {police.data?.order.invoice_url ? (
                                    <div className="col-6">
                                        <InfoItem subTitle='Счёт на оплату' link={police.data?.order.invoice_url} />
                                    </div>
                                ) : null}
                            </div>
                            <div className="row mt-5">
                                <div className="col-6">
                                    <button className='btn btn-primary-with-border w-100' onClick={editOrder}>
                                        Редактировать
                                    </button>
                                </div>
                                <div className="col-6">
                                    <button onClick={sendToInsurer} className={cn('btn btn-primary w-100', { 'loading': sendLoading })}>
                                        {sendLoading ? (
                                            <Spinner />
                                        ) : 'Отправить страхователю'}
                                    </button>
                                </div>
                                <div className="col-6 mt-4">
                                    <button className={cn('btn btn-primary-gray w-100', { 'loading': cancelLoading })} onClick={cancelOrder}>
                                        {cancelLoading ? (
                                            <Spinner />
                                        ) : 'Отменить'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <CompleteCard data={police.data?.order.options} price={safe?.premium} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CompletePolice;