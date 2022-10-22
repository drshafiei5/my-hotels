import React, { PropsWithChildren, ReactElement, useCallback, useState, useEffect } from 'react';
import { validator, ValidatorConfigType } from '../utils/validator';


function useForm<T>(initialData: T, validateOnChange: boolean, validatorConfig: ValidatorConfigType) {
    const [data, setData] = useState<T>(initialData);
    const [errors, setErrors] = useState<{ [x: string]: string }>({});
    const [enterError, setEnterError] = useState<boolean>(false);

    const validate = useCallback(
        (data: any) => {
            const errors = validator(data, validatorConfig);
            setErrors(errors);
            setEnterError(Object.keys(errors).length > 0);
            return Object.keys(errors).length === 0;
        },
        [validatorConfig, setErrors]
    );

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setData(prevState => ({
                ...prevState,
                [name]: value,
            }));

            if (validateOnChange) validate({ [name]: value });
        },
        [validateOnChange, validate]
    );

    const handleResetForm = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setData(initialData);
        setErrors({});
        setEnterError(false);
    };

    return {
        data,
        setData,
        errors,
        setErrors,
        validate,
        enterError,
        setEnterError,
        handleInputChange,
        handleResetForm,
    };
}

type FormType = {
    data: {
        [key: string]: any;
    };
    errors?: {
        [key: string]: any;
    };
    children?: React.ReactNode;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type FormItemProps = {
    name: string;
    data?: {
        [key: string]: any;
    };
    value?: string;
    error?: string;
    type?: string;
    props?: {
        [key: string]: any;
    };
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};


function Form({ children, handleChange, data, errors, ...rest }: FormType) {
    const clonedElements = React.Children.map(children, child => {
        const item = child as ReactElement<PropsWithChildren<FormItemProps>>;
        let config: FormItemProps = { name: '' };

        if (
            (item.props.type !== 'submit' && item.props.type !== 'button')
        ) {
            config = {
                ...item.props,
                onChange: handleChange,
                value: data[item.props.name],
                error: errors?.[item.props.name],
                data,
            };
        }

        return React.cloneElement(item, config);
    });

    return (
        <form className='form' {...rest}>
            {clonedElements}
        </form>
    );
}

export { useForm, Form };
