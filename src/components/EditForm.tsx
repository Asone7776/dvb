import { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import ParentSimpleSelect from './ParentSimpleSelect';
import InfoCardCreate from './InfoCardCreate';
import NumberFormat from 'react-number-format';
import { emailPattern, requiredPattern } from '../functions';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { createFormData } from '../types/polices';
import { selectOption } from '../types/users';
import { useNavigate } from 'react-router-dom';
import { prepareOrgName } from '../functions';
import { updatePolicy } from '../redux/actions/policeActions';
import { resetSaveSuccess, resetUpdatePolicy } from '../redux/slices/policeSlice';
import SearchableSelect from './SearchableSelect';
import DateSelect from './DateSelect';

const EditForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const police = useAppSelector(state => state.police.updatedPolicy);
    const editFormData = useAppSelector(state => state.police.holdedPolice);
    const safe = useAppSelector(state => state.safe.data);
    console.log('safe', safe);
    console.log('edit data', editFormData);

    const [documentTypeOptions] = useState<selectOption[]>([
        { value: 'Устав', label: 'Устав' },
        { value: 'Доверенность', label: 'Доверенность' }
    ]);
    const { control, watch, register, handleSubmit, formState: { errors } } = useForm<createFormData>({
        defaultValues: {
            name: editFormData?.name,
            inn: editFormData?.inn,
            kpp: editFormData?.kpp,
            index: editFormData?.index,
            ogrn: editFormData?.ogrn,
            email: editFormData?.email,
            house: editFormData?.house,
            flat: editFormData?.flat,
            property_name: editFormData?.property_name,
            position: editFormData?.position,
            city: editFormData?.city,
            object_area: editFormData?.object_area,
            floor: editFormData?.floor,
            number_of_floors: editFormData?.number_of_floors,
            signer: editFormData?.signer,
            // phone: "+7(___)___-__-__",
            phone: editFormData?.phone,
            document_type: { value: 'Устав', label: 'Устав' },
            kladr: {
                name: "г Москва",
                value: "7700000000000"
            },
            // premium: safe ? safe.premium : undefined
        }
    });
    useEffect(() => {
        if (!safe) {
            navigate('/admin/new');
        }
    }, [safe]);
    useEffect(() => {
        if (police.success) {
            dispatch(resetUpdatePolicy());
            navigate('/admin/new/');
        }
    }, [police]);
    const prefix = watch(['legal_type']);
    const documentType = watch(['document_type']);
    const full_name = watch(['name']);
    const cardData = watch(['signer', 'kladr']);

    const onSubmit = (data: any) => {
        let risks: any[] = [];
        if (safe?.coverages) {
            risks = safe.coverages.map((coverage) => {
                return {
                    code: coverage.code,
                    sum: coverage.sum
                }
            });
        };
        const objectToSend = {
            ...data,
            street: data ? data.kladr.name : null,
            kladr: data ? data.kladr.kladr_id : null,
            legal_type: data ? data.legal_type.value : null,
            document_type: data ? data.document_type.value : null,
            tariff: safe ? safe.orderNo : 0,
            risks
        };
        console.log(objectToSend);
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
                                <div className="form-group">
                                    <input className='form-control' type="text" placeholder='Наименование организации' {...register('name', {
                                        required: requiredPattern
                                    })} />
                                    {errors.name && <span className="error-message">{errors.name.message}</span>}
                                </div>
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
                                    <h5>Индекс</h5>
                                    <input placeholder='Индекс' className='form-control' type="text" {...register('index', {
                                        required: requiredPattern
                                    })} />
                                    {errors.index && <span className="error-message">{errors.index.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>ОГРН</h5>
                                    <input placeholder='ОГРН' className='form-control' type="text" {...register('ogrn', {
                                        required: requiredPattern,
                                        minLength: {
                                            value: 13,
                                            message: 'Минимальная длина 13'
                                        },
                                        maxLength: {
                                            value: 13,
                                            message: 'Максимальная длина 13'
                                        }
                                    })} />
                                    {errors.ogrn && <span className="error-message">{errors.ogrn.message}</span>}
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
                                    <h5>Корпус</h5>
                                    <input placeholder='Корпус' className='form-control' type="text" {...register('building', {
                                        required: false
                                    })} />
                                    {errors.building && <span className="error-message">{errors.building.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Дом</h5>
                                    <input placeholder='Дом' className='form-control' type="text" {...register('house', {
                                        required: requiredPattern
                                    })} />
                                    {errors.house && <span className="error-message">{errors.house.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Квартира</h5>
                                    <input placeholder='Квартира' className='form-control' type="text" {...register('flat', {
                                        required: requiredPattern
                                    })} />
                                    {errors.flat && <span className="error-message">{errors.flat.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Название недвижимости</h5>
                                    <input className='form-control' type="text" placeholder='Название недвижимости' {...register('property_name', {
                                        required: requiredPattern
                                    })} />
                                    {errors.property_name && <span className="error-message">{errors.property_name.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Подписант</h5>
                                    <input placeholder='Подписант' className='form-control' type="text" {...register('signer', {
                                        required: requiredPattern
                                    })} />
                                    {errors.signer && <span className="error-message">{errors.signer.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Должность</h5>
                                    <input placeholder='Должность' className='form-control' type="text" {...register('position', {
                                        required: requiredPattern
                                    })} />
                                    {errors.position && <span className="error-message">{errors.position.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Юридический адрес</h5>
                                    <Controller
                                        name="kladr"
                                        control={control}
                                        rules={{ required: requiredPattern }}
                                        render={({ field }) => {
                                            return (
                                                <SearchableSelect
                                                    {...field}
                                                />
                                            );
                                        }}
                                    />
                                    {errors.kladr && <span className="error-message">{errors.kladr.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Город</h5>
                                    <input placeholder='Город' className='form-control' type="text" {...register('city', {
                                        required: requiredPattern
                                    })} />
                                    {errors.city && <span className="error-message">{errors.city.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Тип документа</h5>
                                    <Controller
                                        name="document_type"
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <ParentSimpleSelect
                                                    options={documentTypeOptions}
                                                    {...field}
                                                />
                                            );
                                        }}
                                    />
                                </div>
                                {documentType && documentType[0]?.value === 'Доверенность' ? (
                                    <>
                                        <div className="form-group">
                                            <h5>Номер доверенности</h5>
                                            <input placeholder='Номер доверенности' className='form-control' type="text" {...register('attorney', {
                                                required: requiredPattern
                                            })} />
                                            {errors.attorney && <span className="error-message">{errors.attorney.message}</span>}
                                        </div>
                                        <div className="form-group">
                                            <h5>Дата доверенности</h5>
                                            <Controller
                                                name="attorney_date"
                                                control={control}
                                                rules={{ required: requiredPattern }}
                                                render={({ field }) => {
                                                    return (
                                                        <DateSelect
                                                            {...field}
                                                        />
                                                    );
                                                }}
                                            />
                                        </div>
                                        {errors.attorney_date && <span className="error-message">{errors.attorney_date.message}</span>}
                                    </>
                                )
                                    : null}
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
                                    <h5>Квадратура</h5>
                                    <input placeholder='Квадратура' className='form-control' type="text" {...register('object_area', {
                                        required: requiredPattern
                                    })} />
                                    {errors.object_area && <span className="error-message">{errors.object_area.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Этаж</h5>
                                    <input placeholder='Этаж' className='form-control' type="number" {...register('floor', {
                                        required: requiredPattern
                                    })} />
                                    {errors.floor && <span className="error-message">{errors.floor.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Количество этажей</h5>
                                    <input placeholder='Количество этажей' className='form-control' type="number" {...register('number_of_floors', {
                                        required: requiredPattern
                                    })} />
                                    {errors.number_of_floors && <span className="error-message">{errors.number_of_floors.message}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <InfoCardCreate submitTitle='Обновить полис' organization_name={prepareOrgName('', full_name[0] ? full_name[0] : '')} data={cardData} premium={safe?.premium} loading={police.loading} />
                    </div>
                </div>
            </form >
        </div >
    );
}

export default EditForm;