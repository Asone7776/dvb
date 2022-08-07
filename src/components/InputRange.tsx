// import { forwardRef, useEffect, useState, ChangeEvent } from 'react';
// import { formatPrice } from '../functions';

// interface InputRangeProps {
//     suffix: string
//     needToFormat: boolean
//     min: string | number
//     max: string | number
//     onChange: (event: ChangeEvent) => void
//     defaultValue: number
//     step: string
//     disabled: boolean
// }

// const InputRange = forwardRef<any, InputRangeProps>(({ disabled, suffix, needToFormat, min, max, onChange, defaultValue, step, ...rest }, ref) => {
//     const [currentValue, setCurrentValue] = useState<string | number>('100%');
//     const [bgSize, setBgSize] = useState<string | number>(0);
//     const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//         let { value } = event.target;
//         changeBg(Number(value));
//         setCurrentValue(value);
//         onChange(event);
//     }
//     useEffect(() => {
//         if (defaultValue) {
//             setCurrentValue(defaultValue);
//             changeBg(Number(defaultValue));
//         }
//     }, [defaultValue]);
//     const changeBg = (val: number) => {
//         setBgSize((val - Number(min)) * 100 / (Number(max) - Number(min)) + '% 100%');
//     }
//     return (
//         <div className='custom-range-input'>
//             <input step={step ? step : '1'} disabled={disabled} onChange={handleChange} style={{ backgroundSize: bgSize }} value={currentValue} type="range" min={min} max={max} ref={ref} {...rest} />
//             <div className="values d-flex justify-content-between">
//                 <div className="left">{`${needToFormat ? formatPrice(min) : min} ${suffix}`}</div>
//                 <div className="center">{`${needToFormat ? formatPrice(currentValue) : currentValue} ${suffix}`}</div>
//                 <div className="right">{`${needToFormat ? formatPrice(max) : max} ${suffix}`}</div>
//             </div>
//         </div>
//     );
// });
// export default InputRange;

import { useEffect, useState, FC, ChangeEvent } from 'react';
import { formatPrice } from '../functions';
import InputNumber from 'rc-input-number';

interface InputRangeProps {
    suffix: string
    needToFormat: boolean
    min: number
    max: number
    onChangeValue: (value: number) => void
    defaultValue: number
    step: string
    disabled: boolean
    withInput: boolean
}

const InputRange: FC<InputRangeProps> = ({ withInput = false, onChangeValue, suffix, needToFormat, min, max, defaultValue, step, disabled }) => {
    const [currentValue, setCurrentValue] = useState(defaultValue);
    const [bgSize, setBgSize] = useState<string | number>(0);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let { value } = event.target;
        setCurrentValue(Number(value));
        onChangeValue(Number(value));
    }

    const handleChangeInput = (value: number) => {
        onChangeValue(value);
    }

    useEffect(() => {
        if (defaultValue) {
            setCurrentValue(defaultValue);
            changeBg(defaultValue);
        }
    }, [defaultValue]);

    useEffect(() => {
        changeBg(currentValue);
    }, [currentValue]);

    const changeBg = (val: number) => {
        setBgSize((val - Number(min)) * 100 / (Number(max) - Number(min)) + '% 100%');
    }
    return (
        <div className='custom-range-input'>
            <input step={step ? step : '1'} onChange={handleChange} style={{ backgroundSize: bgSize }} value={currentValue} type="range" min={min} max={max} disabled={disabled} />
            <div className="values d-flex justify-content-between align-items-center">
                <div className="left">{`${needToFormat ? formatPrice(min) : min} ${suffix}`}</div>
                <div className="center">
                    {withInput ? (
                        <InputNumber
                            disabled={disabled}
                            onChange={handleChangeInput}
                            value={currentValue}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                            min={min}
                            max={max}
                        />
                    ) : (
                        `${needToFormat ? formatPrice(currentValue) : currentValue} ${suffix}`
                    )}
                </div>
                <div className="right">{`${needToFormat ? formatPrice(max) : max} ${suffix}`}</div>
            </div>
        </div>
    );
};
export default InputRange;