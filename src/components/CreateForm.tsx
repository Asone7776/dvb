import { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import ParentCreateSelect from './ParentCreateSelect';
import InfoCardCreate from './InfoCardCreate';
import NumberFormat from 'react-number-format';
import { emailPattern, requiredPattern } from '../functions';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { createFormData } from '../types/polices';
import { selectOption } from '../types/users';
import { useNavigate } from 'react-router-dom';
import { prepareOrgName } from '../functions';
import { savePolicy } from '../redux/actions/policeActions';
import { resetSaveSuccess } from '../redux/slices/policeSlice';
const CreateForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const police = useAppSelector(state => state.police.savedPolicy);
    const safe = useAppSelector(state => state.safe.data);
    const [companyOptions, setCompanyOptions] = useState<selectOption[]>([
        { value: 'ООО', label: 'ООО' },
        { value: 'ИП', label: 'ИП' },
        { value: 'АО', label: 'АО' },
    ]);

    const { control, watch, register, handleSubmit, formState: { errors } } = useForm<createFormData>({
        defaultValues: {
            phone: "+7(___)___-__-__",
            organization_prefix: { value: 'ООО', label: 'ООО' },
            premium: safe ? safe.premium : undefined
        }
    });
    useEffect(() => {
        if (!safe) {
            navigate('/admin/new');
        }
    }, [safe]);
    useEffect(() => {
        if (police.success) {
            dispatch(resetSaveSuccess());
            navigate('/admin/new/complete');
        }
    }, [police]);
    const prefix = watch(['organization_prefix']);
    const full_name = watch(['full_name']);
    useEffect(() => {
        if (prefix[0] && prefix[0].__isNew__) {
            setCompanyOptions((prevState: any) => {
                let array = [
                    ...prevState,
                    prefix[0]
                ];
                return array.filter((v, i, a) => a.indexOf(v) === i);
            })
        }
    }, [prefix[0]])
    const onSubmit = (data: createFormData) => {
        const objectToSend = {
            ...data,
            tariff: safe ? safe.tariffNumber : 0
        };
        if (data.full_name && data.organization_prefix) {
            objectToSend.full_name = `${data.organization_prefix.value} ${data.full_name}`;
        }
        delete objectToSend.organization_prefix;
        // console.log(objectToSend);
        dispatch(savePolicy(objectToSend));
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
                                    <div className="col-4">
                                        <Controller
                                            name="organization_prefix"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <ParentCreateSelect
                                                        options={companyOptions}
                                                        {...field}
                                                    />
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="col-8">
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
                        <InfoCardCreate organization_name={prepareOrgName(prefix[0] ? prefix[0].label ? prefix[0].label : '' : '', full_name[0] ? full_name[0] : '')} data={safe} loading={police.loading} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateForm;