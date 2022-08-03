import { FC, useEffect, useState } from "react";
import PdfView from "../../components/PdfView";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import CompleteCard from "../../components/CompleteCard";
import { useNavigate } from "react-router-dom";
import { axiosAuth } from "../../axios-instances";
import { failureNotify, successNotify } from "../../notifications";
import { resetSavedPolicy } from "../../redux/slices/policeSlice";
import { base64ToArrayBuffer } from "../../functions";
const CompletePolice: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const police = useAppSelector(state => state.police.savedPolicy.data);
    const [invoicePdf, setInvoicePdf] = useState<ArrayBufferLike | null>(null);
    const [sendLoading, setSendLoading] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);
    console.log(police);
    const sendToInsurer = async () => {
        setSendLoading(true);
        try {
            const response = await axiosAuth.get(`/orders_send/${police?.order?.id}`);
            successNotify(response.data.data);
            setSendLoading(false);
            dispatch(resetSavedPolicy());
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
            const response = await axiosAuth.delete(`/orders/${police?.order?.id}`);
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
        navigate(`/admin/new/edit/${police?.order?.id}`);
    }
    const getPDFS = async () => {
        try {
            const response = await axiosAuth.get(`/order_pdfs/${police?.order?.id}`);
            const arrayBuffer = base64ToArrayBuffer(response.data.data.invoice);
            setInvoicePdf(arrayBuffer);
        } catch (error: any) {
            if (error.response.data && error.response.data.errors) {
                failureNotify(error.response.data.errors);
            }
        }
    }
    useEffect(() => {
        if (police?.order?.id) {
            getPDFS();
        }
    }, [police?.order?.id]);
    return (
        <div className="information">
            <div className="row">
                <div className="col-12">
                    <div className="top-heading">
                        <h3>Полис страхования “Карточный сейф”</h3>
                        <p>
                            Черновик
                        </p>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-8">
                                <PdfView pdfUrl={invoicePdf} />
                            </div>
                            <div className="col-4">
                                <CompleteCard data={police && police.order} cancelLoading={cancelLoading} sendLoading={sendLoading} onCancel={cancelOrder} onEdit={editOrder} onSend={sendToInsurer} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompletePolice;