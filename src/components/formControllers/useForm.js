import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            setIsSubmitting(false);
            callback()
        }
    }, [errors])

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    const handleChange = (event) => {
        event.persist();
        console.log(errors);
        setValues(values => ({...values, [event.target.name]: event.target.value }));
        setErrors(errors => ({...errors, ...validate(event.target) }));
    };

    return {
        handleChange,
        handleSubmit,
        values,
        setValues,
        errors
    }
};

export default useForm;