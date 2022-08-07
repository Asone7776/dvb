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
import InputRange from './InputRange';
import { tariffs } from '../constants';
import { RISK_CONSTANTS } from '../risk-constants';
const CalculateForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const safe = useAppSelector(state => state.safe.data);
    const coverages = safe?.coverages;
    const codes = coverages?.map((item) => item.code);
    const [disabledValues, setDisabledValues] = useState(coverages?.map((item) => item.required));
    const defaultValues: any = {};
    coverages?.forEach((item) => {
        // if (safe?.orderNo === 0) {
        //     if (item.code === RISK_CONSTANTS.REAL_ESTATE.BUSINESS_PROTECTION) {
        //         defaultValues[item.code] = item.sum;
        //     }
        // }
        // else {
        //     defaultValues[item.code] = item.sum;
        // }
        defaultValues[item.code] = item.sum;
    });
    console.log(disabledValues);


    const { unregister, getValues, setValue, watch, register, handleSubmit, formState: { errors } } = useForm<any>({
        defaultValues
    });
    // useEffect(() => {
    //     if (!safe) {
    //         navigate('/admin/new');
    //     }
    // }, [safe]);
    useEffect(() => {
        codes?.forEach((code) => {
            register(code);
        });
    }, [register]);
    const allFields = watch();
    useEffect(() => {
        console.log(allFields);
    }, [allFields])


    const changeDisabled = (index: number, checked: boolean) => {
        if (disabledValues) {
            let values = [...disabledValues];
            values[index] = checked;
            setDisabledValues(values);
            // if (checked) {
            //     setValue(code, sum);
            // } else {
            //     register(code);
            //     unregister(code);
            // }
        }
    }

    const onSubmit = (data: createFormData) => {
        const objectToSend = {
            ...data,
            // tariff: safe ? safe.tariffNumber : 0
        };
        // if (data.full_name && data.organization_prefix) {
        //     objectToSend.full_name = `${data.organization_prefix.value} ${data.full_name}`;
        // }
        // delete objectToSend.organization_prefix;
        // // console.log(objectToSend);
        // dispatch(savePolicy(objectToSend));
    };
    return (
        <div className="calculate-form create-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-8 small-gutters">
                        {safe?.coverages.filter((item, index) => item.code !== RISK_CONSTANTS.CIVIL_LIABILITY).map((risk, index) => (
                            <div className="card custom-card" key={`risk-slider-${index}`}>
                                <div className="card-body">

                                    <div className="form-group">
                                        <div className='with-checkbox'>
                                            <label className="check-wrapper">
                                                <input type="checkbox" onChange={(e) => {
                                                    let { checked } = e.target;
                                                    if (!risk.required) {
                                                        changeDisabled(index, checked);
                                                    }
                                                }} checked={disabledValues && disabledValues[index]} />
                                                <span className="checkmark">
                                                    <svg width="15" height="10" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1.76744 3.76744L4 6L8.46512 1.53488" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                            </label>
                                            <label>{risk.description}</label>
                                        </div>
                                        <InputRange
                                            withInput={true}
                                            disabled={false}
                                            step='50000'
                                            suffix={'₽'}
                                            needToFormat={true}
                                            defaultValue={getValues(risk.code)}
                                            min={0}
                                            max={risk.sum}
                                            onChangeValue={(value) => {
                                                setValue(risk.code, value);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="card custom-card">
                            <div className="card-body">

                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        {/* <InfoCardCreate organization_name={prepareOrgName(prefix[0] ? prefix[0].label ? prefix[0].label : '' : '', full_name[0] ? full_name[0] : '')} data={safe} loading={police.loading} /> */}
                    </div>
                    {/* <button onClick={() => {
                        unregister("BUSINESS_PROTECTION_PP");
                    }}>remove</button>
                    <button onClick={() => {
                        register("BUSINESS_PROTECTION_PP");
                    }}>register</button> */}
                </div>
            </form>
        </div>
    );
}

export default CalculateForm;