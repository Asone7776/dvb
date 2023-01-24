import { FC, useState, useEffect } from "react";
import moment from "moment";
import Accordion from "../../components/Accordion";
import { getOrders } from "../../redux/actions/orderActions";
import OrderFilters from '../../components/OrderFilters';
import { getUsers } from "../../redux/actions/usersActions";
import OrdersPagination from "../../components/OrdersPagination";
import { resetStatus } from '../../redux/slices/orderSlice';
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { PolicyFilterProps } from "../../types/polices";
import { axiosAuth } from "../../axios-instances";
import { successNotify, failureNotify } from "../../notifications";
import { downloadFile } from "../../functions";
const PolicyPage: FC = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector((state) => state.orders);
    const users = useAppSelector((state) => state.users);
    const [excelLoading, setExcelLoading] = useState(false);
    const [filterProps, setFilterProps] = useState<PolicyFilterProps>({
        paginated: true,
        page: 1
    });
    useEffect(() => {
        dispatch(getOrders(filterProps));
    }, [filterProps, orders.changeStatus.success]);

    useEffect(() => {
        dispatch(getUsers());
    }, []);
    useEffect(() => {
        if (orders.changeStatus.success) {
            dispatch(resetStatus());
        }
    }, [orders.changeStatus]);
    const onFilterChange = (prop: string, value: any) => {
        setFilterProps({
            ...filterProps,
            [prop]: value
        })
    };

    const getExcelData = async () => {
        setExcelLoading(true);
        const { from, to, status, users, search } = filterProps;
        const params = {
            from,
            to,
            status,
            users,
            search
        };
        try {
            const response = await axiosAuth.get('/orders_export ', {
                params,
                responseType: "blob",
            });
            const data = response.data;
            const urlCreator = window.URL || window.webkitURL;
            const fileUrl = urlCreator.createObjectURL(data);
            const filename = 'Отчёт'.replace("attachment; filename=", "");
            downloadFile(fileUrl, filename);
            successNotify('Отчёт выгружен');
        } catch (error: any) {
            if (error.response.data && error.response.data.errors) {
                failureNotify(error.response.data.errors);
            }
        }
        finally {
            setExcelLoading(false);
        }
    }

    const onDateRange = (arr: any) => {
        setFilterProps({
            ...filterProps,
            page: 1,
            from: arr[0] ? moment(arr[0]).format('DD.MM.YYYY') : null,
            to: arr[1] ? moment(arr[1]).format('DD.MM.YYYY') : null
        })
    };

    const onTopFiltersChange = (prop: string, value: any) => {
        setFilterProps({
            ...filterProps,
            page: 1,
            [prop]: value
        })
    };


    return (
        <>
            <div className="information list-wrapper">
                <div className="row">
                    <div className="col-12">
                        <div className="top-heading">
                            <h3>История</h3>
                        </div>
                        <OrderFilters users={users.data} onFilterChange={onTopFiltersChange} onDateRange={onDateRange} excelLoading={excelLoading} onExport={getExcelData} />
                        <Accordion loading={orders.loading} list={orders.data && orders.data.data ? orders.data.data : []} />
                        {orders.data && orders.data.total > 20 && (
                            <OrdersPagination last_page={orders.data.last_page} onFilterChange={onFilterChange} initialPage={filterProps.page} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PolicyPage;