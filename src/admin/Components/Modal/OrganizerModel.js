import React, { useState, useEffect, useRef } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modal } from 'antd';
import { Checkbox, Col, Row, Upload, Button } from 'antd';
import { httpClient } from '../../../service/httpClient';
import { message } from 'antd';
import { getOrganizer, getUser } from '../../Service/api';





export function DialogModalOrganizer({
    value = null,
    statusAction = -1,
    setLoading = () => null,
    setData = () => null,
    isModalOpen = false,
    hideModal = () => null,
    refreshOrganizer = () => null
}) {
    const refFile = useRef();
    const ref = useRef(null);
    const [formValues, setFormValues] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        setFormValues({ ...value })
    }, [value])

    const handerCancle = (e) => {
        hideModal()
        refFile.current.value = "";
    }


    const initialValues = {
        id: '',
        name: '',
        email: '',
        sdt: '',
        city: '',
        district: '',
        ward: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Title is required'),
        sdt: Yup.string()
            .required('Phone is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        city: Yup.string()
            .required('City is required'),
        district: Yup.string()
            .required('District is required'),
        Ward: Yup.string()
            .required('Ward is required')
    });

    const handleFileSelected = (e) => {
        setImage(e.target.files[0])
    }

    const someFuncton = () => {
        console.log(ref.current.values)
        const formData = new FormData();
        setLoading(true)
        const dataRequest = {
           name : ref.current.values.name,
           codeBusiness: ref.current.values.codeBusiness,
           sdt : ref.current.values.sdt,
           email : ref.current.values.email,
           district : ref.current.values.district,
           city : ref.current.values.city,
           ward : ref.current.values.ward
        }
        formData.append("file", image)
        formData.append("organizer",JSON.stringify(dataRequest))
        httpClient
            .put(`/api/admin/organizer/${ref.current.values?.id}`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            .then((response) => {
                message.success('Edit Success')
                getOrganizer(setData, setLoading);
                hideModal()
                console.log("Res", response)
            })
            .catch(() =>
                alert("CC !")
            );
}

const footer = <></>

return (
    <>
        <Modal title="Basic Modal" open={isModalOpen} footer={footer} onCancel={(e) => handerCancle(e)}>
            <Formik
                innerRef={ref}
                initialValues={formValues || initialValues} enableReinitialize validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                    }, 1000);
                }}>
                {({ errors, touched }) => {
                    return (
                        <Form>
                            <h1>Edit Organizer</h1>
                            <div className="form-row">
                                <div className="form-group col-12">
                                    <label>Name</label>
                                    <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-12">
                                    <label>Email</label>
                                    <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group col">
                                    <div className="form-group col-12">
                                        <label>Phone</label>
                                        <Field name="sdt" type="text" className={'form-control' + (errors.sdt && touched.sdt ? ' is-invalid' : '')} />
                                        <ErrorMessage name="sdt" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-12">
                                        <label>City</label>
                                        <Field name="city" type="text" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} />
                                        <ErrorMessage name="city" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-12">
                                        <label>District</label>
                                        <Field name="district" type="text" className={'form-control' + (errors.district && touched.district ? ' is-invalid' : '')} />
                                        <ErrorMessage name="district" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-12">
                                        <label>Ward</label>
                                        <Field name="ward" type="text" className={'form-control' + (errors.ward && touched.ward ? ' is-invalid' : '')} />
                                        <ErrorMessage name="ward" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div style={{ marginTop: '10px' }} className="form-group col" >
                                    <label style={{ display: 'block' }}>Upload</label>
                                    <label style={{
                                        display: 'inline-block',
                                        border: '1px solid #ccc',
                                        padding: '6px 12px',
                                        cursor: 'pointer'
                                    }}>
                                        <input ref={refFile} onChange={handleFileSelected} type="file" accept="image/*" />
                                    </label>
                                </div>
                            </div>
                            <Button style={{ marginTop: '10px' }} onClick={someFuncton} >Save </Button>
                        </Form>
                    );
                }}
            </Formik>
        </Modal>
    </>
)
}
