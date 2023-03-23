import React, { useState, useEffect, useRef } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modal } from 'antd';
import { Button } from 'antd';
import { httpClient } from '../../../service/httpClient';
import { message } from 'antd';
import { getCategory } from '../../Service/api';






export function TypeTicketModal({
    value = null,
    statusAction = -1,
    setLoading = () => null,
    data = [],
    setData = () => null,
    isModalOpen = false,
    hideModal = () => null,
}) {
    const ref = useRef(null);
    const [formValues, setFormValues] = useState(value);


    useEffect(() => {
        console.log("Item :", value)
        setFormValues({ ...value })
    }, [value])



    const handerCancle = (e) => {
        hideModal()
    }


    const initialValues = {
        id: '',
        name: '',
        price: '',
        quantity: '',
        description: '',
    };

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        description: Yup.string()
            .required('Description is required'),
        price: Yup.number()
            .required('Price is required'),
        quantity: Yup.number()
            .required('Quantity is required'),
    });



    const someFuncton = () => {
        if (Object.keys(ref.current.errors).length === 0) {
            const ticket = {
                id: randomIntFromInterval(1, 10000),
                name: ref.current.values.name,
                description: ref.current.values.description,
                price: ref.current.values.price,
                quantity: ref.current.values.quantity
            }
            if (statusAction == 0) {
                console.log('Ticket ,', ticket)
                hideModal()
                setData([...data, ticket])
            } else if (statusAction == 1) {
                const newData = data.map(obj =>
                    obj.id === value?.id ? {
                        ...obj,
                        id: ref.current.values.id,
                        name: ref.current.values.name,
                        description: ref.current.values.description,
                        price: ref.current.values.price,
                        quantity: ref.current.values.quantity
                    } : obj
                );
                hideModal()
                setData(newData)
            }
        }
    }


    const onSubmit = async (values, { setSubmitting, setErrors, setStatus, resetForm }) => {
        try {
            console.log("Submit : ", values)
            someFuncton()
            resetForm({ values: initialValues })
            hideModal()
            setStatus({ success: true })
        } catch (error) {
            setStatus({ success: false })
            setSubmitting(false)
            setErrors({ submit: error.message })
        }
    }

    const footer = <></>

    return (
        <>
            <Modal title="Basic Modal" open={isModalOpen} footer={footer} onCancel={(e) => handerCancle(e)}>
                <Formik
                    innerRef={ref}
                    initialValues={formValues || initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={onSubmit} >
                    {({ errors, handleSubmit, handleChange, isSubmitting, isValid, status, values, touched, resetForm }) => {
                        return (
                            <Form onSubmit={handleSubmit} >
                                <h1>{statusAction == 0 ? 'Add Category' : 'Edit Category'}</h1>
                                <div className="form-row">
                                    <div className="form-group col-12">
                                        <label>Name :</label>
                                        <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-12">
                                        <label>Description</label>
                                        <Field name="description" type="text" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                                        <ErrorMessage name="description" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-12">
                                        <label>Price</label>
                                        <Field name="price" type="text" className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')} />
                                        <ErrorMessage name="price" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-12">
                                        <label>Quantity</label>
                                        <Field name="quantity" type="text" className={'form-control' + (errors.quantity && touched.quantity ? ' is-invalid' : '')} />
                                        <ErrorMessage name="quantity" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form>
                        );
                    }}
                </Formik>
            </Modal>
        </>
    )
}
