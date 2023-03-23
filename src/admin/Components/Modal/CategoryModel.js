import React, { useState, useEffect, useRef } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modal } from 'antd';
import { Button } from 'antd';
import { httpClient } from '../../../service/httpClient';
import { message } from 'antd';
import { getCategory } from '../../Service/api';






export function DialogModalCategory({
    value = {},
    statusAction = -1,
    setLoading = () => null,
    setData = () => null,
    isModalOpen = false,
    hideModal = () => null,
    refreshCategory = () => null
}) {
    const ref = useRef(null);
    const [formValues, setFormValues] = useState(value);


    useEffect(() => {
        console.log("value a2312q "  ,value)
        setFormValues(value)
    }, [value])



    const handerCancle = (e) => {
        hideModal()
    }


    const initialValues = {
        id: '',
        name: '',
        description: '',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        description: Yup.string()
            .required('Description is required'),
    });



    const someFuncton = () => {
        if(Object.keys(ref.current.errors).length === 0) {
            console.log(ref.current.values)
            console.log("Valid")
            if(statusAction == 0) {
                httpClient
                .post(`/api/admin/category`,
                    {
                        name: ref.current.values.name,
                        description: ref.current.values.description,
                    }
                )
                .then((response) => {
                    message.success('Add Success')
                    getCategory(setData, setLoading);
                    hideModal()
                    console.log("Res", response)
                })
                .catch(() =>
                    alert("CC !")
                );
            } else if (statusAction == 1) {
                httpClient
            .put(`/api/admin/category/${ref.current.values?.id}`,
                {
                    name: ref.current.values.name,
                    description: ref.current.values.description
                }
            )
            .then((response) => {
                message.success('Edit Success')
                getCategory(setData, setLoading);
                hideModal()
                console.log("Res", response)
            })
            .catch(() =>
                alert("CC !")
            );
            }
        }
    }

    const footer = <></>

    return (
        <>
            <Modal title="Basic Modal" open={isModalOpen} footer={footer} onCancel={(e) => handerCancle(e)}>
                <Formik
                    innerRef={ref}
                    initialValues={formValues || initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={someFuncton}>
                    {({ errors, touched }) => {
                        return (
                            <Form>
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
                                <Button style={{marginTop : '10px'}} onClick={someFuncton} >Save</Button>
                            </Form>
                        );
                    }}
                </Formik>
            </Modal>
        </>
    )
}
