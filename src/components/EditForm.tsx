import { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import InfoCardCreate from './InfoCardCreate';
import NumberFormat from 'react-number-format';
import { emailPattern, requiredPattern } from '../functions';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { createFormData } from '../types/polices';
import { useNavigate, useParams } from 'react-router-dom';
import { prepareOrgName } from '../functions';
import { updatePolicy } from '../redux/actions/policeActions';
import { resetUpdatePolicy } from '../redux/slices/policeSlice';
const EditForm = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const police = useAppSelector(state => state.police.savedPolicy);
    const updatedSuccess = useAppSelector(state => state.police.updatedPolicy);
    const safe = useAppSelector(state => state.safe.data);

    const { control, watch, register, handleSubmit, formState: { errors } } = useForm<createFormData>({
        defaultValues: {
            full_name: police.data && police.data.order.insurer,
            inn: police.data && police.data.order.inn,
            kpp: police.data && police.data.order.kpp,
            email: police.data && police.data.order.email,
            phone: police.data && police.data.order.phone,
            premium: police.data && police.data.order.amount,
        }
    });
    useEffect(() => {
        if (updatedSuccess.success) {
            dispatch(resetUpdatePolicy());
            navigate('/admin/new');
        }
    }, [updatedSuccess.success]);
    const full_name = watch(['full_name']);
    const onSubmit = (data: createFormData) => {
        const objectToSend = {
            ...data,
            id: params.id,
            tariff: safe ? safe.tariffNumber : 0
        };
        dispatch(updatePolicy(objectToSend));
    };
    return (
        <div className="pre-form create-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-8 small-gutters">
                        <div className="card custom-card">
                            <div className="card-body">
                                <div className="form-group">
                                    <h4>Страхователь</h4>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Наименование организации' {...register('full_name', {
                                                required: requiredPattern
                                            })} />
                                            {errors.full_name && <span className="error-message">{errors.full_name.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <h5>ИНН</h5>
                                            <input className='form-control' type="text" placeholder='ИНН' {...register('inn', {
                                                required: requiredPattern,
                                                minLength: {
                                                    value: 10,
                                                    message: 'Минимальная длина 10'
                                                },
                                                maxLength: {
                                                    value: 10,
                                                    message: 'Максимальная длина 10'
                                                }
                                            })} />
                                            {errors.inn && <span className="error-message">{errors.inn.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <h5>КПП</h5>
                                    <input placeholder='КПП' className='form-control' type="text" {...register('kpp', {
                                        required: requiredPattern,
                                        minLength: {
                                            value: 9,
                                            message: 'Минимальная длина 9'
                                        },
                                        maxLength: {
                                            value: 9,
                                            message: 'Максимальная длина 9'
                                        }
                                    })} />
                                    {errors.kpp && <span className="error-message">{errors.kpp.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>E-mail</h5>
                                    <input placeholder='E-mail' className='form-control' type="email" {...register('email', {
                                        required: requiredPattern,
                                        pattern: emailPattern
                                    })} />
                                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Номер телефона</h5>
                                    <Controller
                                        control={control}
                                        name="phone"
                                        render={({ field: { onChange, name, value } }) => (
                                            <NumberFormat
                                                name={'phone'}
                                                value={value}
                                                onChange={onChange} className={'form-control'} format="+7(###)###-##-##" allowEmptyFormatting mask="_" />
                                        )}
                                    />
                                    {errors.phone && <span className="error-message">{errors.phone.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Страховая премия</h5>
                                    <input disabled className='form-control' type="text" placeholder='Страховая премия' {...register('premium', {
                                        required: requiredPattern
                                    })} />
                                    {errors.premium && <span className="error-message">{errors.premium.message}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <InfoCardCreate organization_name={prepareOrgName('', full_name[0] ? full_name[0] : '')} data={safe} loading={updatedSuccess.loading} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditForm;