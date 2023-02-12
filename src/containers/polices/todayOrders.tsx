import { FC, useEffect, useState } from 'react';
import Accordion from '../../components/Accordion';
import SafeCard from '../../components/SafeCard';
import { cards } from "../../constants";
import { getOrders } from "../../redux/actions/orderActions";
import OrdersPagination from "../../components/OrdersPagination";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { PolicyFilterProps } from "../../types/polices";
import { resetStatus } from '../../redux/slices/orderSlice';
import { resetDeletePolice, resetReSendPolice } from '../../redux/slices/policeSlice';
const TodayOrders: FC = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector((state) => state.orders);
    const deletedPolice = useAppSelector((state) => state.police.deletedPolicy);
    const reSendedPolicy = useAppSelector((state) => state.police.reSendedPolicy);
    const [filterProps, setFilterProps] = useState<PolicyFilterProps>({
        paginated: true,
        page: 1,
        today: true
    });
    
    useEffect(() => {
        dispatch(getOrders(filterProps));
    }, [filterProps, orders.changeStatus.success, deletedPolice.success, reSendedPolicy.success]);

    useEffect(() => {
        if (orders.changeStatus.success) {
            dispatch(resetStatus());
        }
    }, [orders.changeStatus]);
    useEffect(() => {
        if (reSendedPolicy.success) {
            dispatch(resetReSendPolice());
        }
    }, [reSendedPolicy.success]);

    useEffect(() => {
        console.log(deletedPolice);
        if (deletedPolice.success) {
            dispatch(resetDeletePolice());
        }
    }, [deletedPolice.success]);
    const onFilterChange = (prop: string, value: any) => {
        setFilterProps({
            ...filterProps,
            [prop]: value
        })
    };

    return (
        <div className='today-orders'>
            <div className="row h-100">
                <div className="col-12">
                    <div className="top-heading">
                        <h3>ЗАЩИТА БИЗНЕСА</h3>
                        <p>
                            Комплексное страхование имущества юридических лиц и индивидуальных предпринимателей.
                        </p>
                    </div>
                </div>
                {cards.map((card, index) => (
                    <div className="col-4" key={`card-${index}`}>
                        <SafeCard item={card} />
                    </div>
                ))}
            </div>
            <div className="row orders">
                <div className="col-12">
                    <h3>Оформлено сегодня</h3>
                    <Accordion loading={orders.loading} list={orders.data && orders.data.data ? orders.data.data : []} />
                    {orders.data && orders.data.total > 20 && (
                        <OrdersPagination last_page={orders.data.last_page} onFilterChange={onFilterChange} initialPage={filterProps.page} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default TodayOrders;

