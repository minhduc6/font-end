import React, { useState, useEffect, useRef } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from 'antd';
import { useSelector } from "react-redux";
import { message } from 'antd';
import { httpClient } from '../../service/httpClient';



export function OrganizersForm() {
    const refresh = () => window.location.reload(true)
    const ref = useRef(null);
    const refFile = useRef();
    const [statusAction, setStatusAction] = useState(0)
    const [image, setImage] = useState(null);
    const [formValues, setFormValues] = useState(null);
    const [id,setId] = useState(null)

    




    useEffect(() => {
        httpClient
            .get(`/api/organizerByUser`)
            .then((response) => {
                console.log(response)
                setFormValues(response.data)
                setStatusAction(1)
                setId(response.data.id)
            }
            ).catch(() =>
                setStatusAction(0)
            );
    }, [])


    useEffect(() => {
       console.log("Status " , statusAction)
    }, [statusAction])

    const handleFileSelected = (e) => {
        setImage(e.target.files[0])
    }


    const initialValues = {
        name: '',
        codeBusiness: '',
        sdt: '',
        email: '',
        district: '',
        city: '',
        ward: '',
        address: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        codeBusiness: Yup.string()
            .required('CodeBusiness is required'),
        sdt: Yup.string()
            .required('Phone is required'),
        email: Yup.string()
            .email('Valid is email')
            .required('Email is required'),
    });



    const someFuncton = () => {
        if (Object.keys(ref.current.errors).length === 0) {

            const dataRequest = {
                name: ref.current.values.name,
                codeBusiness:  ref.current.values.codeBusiness,
                sdt: ref.current.values.sdt,
                email: ref.current.values.email,
                district: ref.current.values.district,
                city: ref.current.values.city,
                ward: ref.current.values.ward,
                address: ref.current.values.address
            }
            const formData = new FormData();
                formData.append("file", image)
                formData.append("organizer", JSON.stringify(dataRequest))
            
            if(id == null) {
                httpClient
                .post(`/api/organizer`, formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    }
                )
                .then((response) => {
                    message.success('Success')
                    console.log("Res", response)
                    refresh()
                })
                .catch(() =>
                    alert("CC !")
                )
            } else if (id != null)  {
                httpClient
                .put(`/api/organizer/${id}`, formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    }
                )
                .then((response) => {
                    message.success('Success')
                    console.log("Res", response)
                })
                .catch(() =>
                    alert("CC !")
                )
            }
        }
    }

    const footer = <></>

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={formValues || initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={someFuncton}>
                {({ errors, touched }) => {
                    return (
                        <Form className='container' style={{ marginTop: '100px' }}>
                            <h1>Hồ Sơ Ban Tổ Chức</h1>
                            <div className="row">
                                <div className="col-6">
                                    <label>Name :</label>
                                    <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                </div>
                                <div className="col-6">
                                    <label>Code Business :</label>
                                    <Field name="codeBusiness" type="text" className={'form-control' + (errors.codeBusiness && touched.codeBusiness ? ' is-invalid' : '')} />
                                    <ErrorMessage name="codeBusiness" component="div" className="invalid-feedback" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <label>Email :</label>
                                    <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </div>
                                <div className="col-6">
                                    <label>Phone :</label>
                                    <Field name="sdt" type="text" className={'form-control' + (errors.sdt && touched.sdt ? ' is-invalid' : '')} />
                                    <ErrorMessage name="codeBusiness" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <label>Ward : </label>
                                    <Field name="ward" type="text" className={'form-control' + (errors.ward && touched.ward ? ' is-invalid' : '')} />
                                    <ErrorMessage name="ward" component="div" className="invalid-feedback" />
                                </div>
                                <div className="col-4">
                                    <label>District :</label>
                                    <Field name="district" type="text" className={'form-control' + (errors.district && touched.district ? ' is-invalid' : '')} />
                                    <ErrorMessage name="district" component="div" className="invalid-feedback" />
                                </div>
                                <div className="col-4">
                                    <label>City : </label>
                                    <Field name="city" type="text" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} />
                                    <ErrorMessage name="codeBusiness" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-12">
                                    <label>Address : </label>
                                    <Field name="address" type="text" className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')} />
                                    <ErrorMessage name="codeBusiness" component="div" className="invalid-feedback" />
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


                            <Button style={{ marginTop: '10px' }} onClick={someFuncton} >{id == null ? 'Thêm' : 'Sửa'}</Button>
                        </Form>
                    );
                }}
            </Formik>
        </>
    )
}
