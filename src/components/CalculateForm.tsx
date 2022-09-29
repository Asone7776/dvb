import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import CoveragesCard from './CoveragesCard';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { calculatePolicy } from '../redux/actions/policeActions';
import InputRange from './InputRange';
import { resetCalculatedPolicy } from '../redux/slices/policeSlice';
import { saveItem } from '../redux/slices/safeSlice';
const allowed = ["BUSINESS_PROTECTION_CONSTRUCTIVE", "BUSINESS_PROTECTION_FINISHING_AND_EQUIPMENT"];
const CalculateForm = () => {
    const dispatch = useAppDispatch();
    const safe = useAppSelector(state => state.safe.data);
    const police = useAppSelector(state => state.police.calculatedPolicy);
    const coverages = safe?.coverages;
    const codes = coverages?.map((item) => item.code);
    const [disabledValues, setDisabledValues] = useState(coverages?.map((item, index) => {
        if (index === 0) {
            return true;
        }
        return item.required;
    }));
    const defaultValues: any = {};
    coverages?.forEach((item) => {
        // defaultValues[item.code] = item.sum;
        defaultValues[item.code] = 0;
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
        const arrayOfSum = risks.filter(item => allowed.includes(item!.code)).map(item => item!.sum).reduce((prev, next) => {
            return Number(prev) + Number(next);
        });
        const otherRisks = risks.filter(item => !allowed.includes(item!.code));
        const variants = [...disabledValues!].splice(0, 2).map((variant, index) => {
            if (variant) {
                return index + 1;
            } else {
                return;
            }
        }).filter(item => item);
        const objectToSend = {
            tariff: safe ? safe.orderNo : 0,
            risks: [
                {
                    code: "BUSINESS_PROTECTION",
                    sum: arrayOfSum
                },
                ...otherRisks
            ],
            variants
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
                                                                if (index === 1) {
                                                                    if (disabledValues) {
                                                                        let values = [...disabledValues];
                                                                        if (disabledValues[0] && disabledValues[1]) {
                                                                            values[1] = false;
                                                                        }
                                                                        if (disabledValues[0] && !disabledValues[1]) {
                                                                            values[1] = true;
                                                                        }
                                                                        if (!disabledValues[0] && !disabledValues[1]) {
                                                                            values[1] = true;
                                                                        }
                                                                        setDisabledValues(values);
                                                                    }
                                                                } else {
                                                                    if (index === 0) {
                                                                        if (disabledValues) {
                                                                            if (disabledValues[0]) {
                                                                                if (disabledValues[1]) {
                                                                                    changeDisabled(index, checked);
                                                                                }
                                                                            } else {
                                                                                changeDisabled(index, checked);
                                                                            }
                                                                        }
                                                                    } else {
                                                                        changeDisabled(index, checked);
                                                                    }
                                                                }
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
                                                // max={index < 3 && disabledValues && disabledValues[2] ? 20000000 : risk.sum}
                                                onChangeValue={(value) => {
                                                    // console.log('val',value);
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