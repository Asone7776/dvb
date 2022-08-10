import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import CoveragesCard from './CoveragesCard';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { calculatePolicy } from '../redux/actions/policeActions';
import InputRange from './InputRange';
import { resetCalculatedPolicy } from '../redux/slices/policeSlice';
import { saveItem } from '../redux/slices/safeSlice';
const CalculateForm = () => {
    const dispatch = useAppDispatch();
    const safe = useAppSelector(state => state.safe.data);
    const police = useAppSelector(state => state.police.calculatedPolicy);
    const coverages = safe?.coverages;
    const codes = coverages?.map((item) => item.code);
    const [disabledValues, setDisabledValues] = useState(coverages?.map((item) => item.required));
    const defaultValues: any = {};
    coverages?.forEach((item) => {
        defaultValues[item.code] = item.sum;
    });

    const { getValues, setValue, watch, register, handleSubmit } = useForm<any>({
        defaultValues
    });

    useEffect(() => {
        return () => {
            dispatch(resetCalculatedPolicy());
        }
    }, []);

    useEffect(() => {
        if (police.data) {
            dispatch(saveItem({
                ...safe,
                premium: police.data
            }))
        }
    }, [police.data]);

    useEffect(() => {
        codes?.forEach((code) => {
            register(code);
        });
    }, [register]);
    const allFields = watch();


    const changeDisabled = (index: number, checked: boolean) => {
        if (disabledValues) {
            let values = [...disabledValues];
            values[index] = checked;
            setDisabledValues(values);
        }
    }

    const onSubmit = (data: any) => {
        let risks = Object.entries(data).map(([key, value], index) => {
            if (disabledValues && disabledValues[index]) {
                return {
                    code: key,
                    sum: value
                }
            }
            return;
        }).filter(item => item != null);
        const objectToSend = {
            tariff: safe ? safe.orderNo : 0,
            risks
        };
        dispatch(calculatePolicy(objectToSend));
    };
    return (
        <div className="calculate-form create-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-8 small-gutters">
                        {safe?.coverages.map((risk, index) => (
                            <div className="card custom-card" key={`risk-slider-${index}`}>
                                <div className="card-body">
                                    {risk.asSlider ? (
                                        <div className="form-group">
                                            <div className='with-checkbox'>
                                                <div className='d-flex'>
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
                                                    <h4>{risk.description}</h4>
                                                </div>
                                                <div className='summ'>Сумма страхования</div>
                                            </div>
                                            <InputRange
                                                withInput={true}
                                                disabled={safe.orderNo !== 0}
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
                                    ) : (
                                        <div className='with-checkbox'>
                                            <div className="d-flex">
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
                                                <h4>{risk.description}</h4>
                                            </div>
                                            <div className='summ'>Сумма страхования</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-4">
                        <CoveragesCard price={police.data} data={allFields} loading={police.loading} disabledValues={disabledValues ? disabledValues : null} />
                    </div>
                </div >
            </form >
        </div >
    );
}

export default CalculateForm;