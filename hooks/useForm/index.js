import { useState } from 'react';

export const useForm = (inicialState = {} ) => {
    const [values, setValues] = useState(inicialState);
    const [showForm, setShowForm] = useState(false);

    const inputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        })
    }

    const showFormChange = () => {
        return showForm ? setShowForm(false) : setShowForm(true);
    }

    return [ values, inputChange, showFormChange, showForm, setShowForm ];
}