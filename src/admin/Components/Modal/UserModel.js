import React, { useState, useEffect, useRef } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modal } from 'antd';
import { Checkbox, Col, Row, Upload, Button } from 'antd';
import { httpClient } from '../../../service/httpClient';
import { message } from 'antd';
import { getUser } from '../../Service/api';





export function DialogModalUser({
    value = null,
    statusAction = -1,
    setLoading = () => null,
    setData = () => null,
    isModalOpen = false,
    hideModal = () => null,
    refreshUser = () => null
}) {
    const refFile = useRef();
    const ref = useRef(null);
    const [formValues, setFormValues] = useState(null);
    const [role, setRole] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const x = []
        value?.roles?.map((item) => {
            x.push(
                item?.roleId
            );
            setRole(x)
        })

        setFormValues({ ...value})
    }, [value])

    useEffect(() => {
        console.log("role : ", role)
    }, [role])

    const handerCancle = (e) => {
        hideModal()
        refFile.current.value = "";
    }

    const onChange = (checkedValues) => {
        setRole(checkedValues)
    };

    const initialValues = {
        id: '',
        displayName: '',
        email: '',
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        displayName: Yup.string()
            .required('Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
    });

    const handleFileSelected = (e) => {
        setImage(e.target.files[0])
    }

    const someFuncton = () => {
        console.log(ref.current.values)
        const formData = new FormData();
        setLoading(true)
        formData.append("file", image)
        if (role.length != 0) {
            httpClient
            .put(`/api/admin/user/${ref.current.values?.id}`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    params: {
                        name: ref.current.values.displayName,
                        email: ref.current.values.email,
                        roleID: role.toString()
                    }
                }
            )
            .then((response) => {
                message.success('Edit Success')
                getUser(setData, setLoading);
                hideModal()
                console.log("Res", response)
            })
            .catch(() =>
                alert("CC !")
            );
        } else {
            message.error('Phải có Role')
        }
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
                                <h1>Edit User</h1>
                                <div className="form-row">
                                    <div className="form-group col-12">
                                        <label>Display Name</label>
                                        <Field readOnly name="displayName" type="text" className={'form-control' + (errors.displayName && touched.displayName ? ' is-invalid' : '')} />
                                        <ErrorMessage name="displayName" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-12">
                                        <label>Email</label>
                                        <Field readOnly name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col">
                                        <label>Role</label>
                                        <Checkbox.Group
                                            value={role}
                                            style={{
                                                width: '100%',
                                            }}
                                            onChange={onChange}
                                        >
                                            <Row>
                                                <Col span={12}>
                                                    <Checkbox value={1}>ROLE_USER</Checkbox>
                                                </Col>
                                                <Col span={12}>
                                                    <Checkbox value={2}>ROLE_ADMIN</Checkbox>
                                                </Col>
                                            </Row>
                                        </Checkbox.Group>
                                    </div>
                                    <div style={{ marginTop: '10px' }} className="form-group col" >
                                        <label style={{display : 'block'}}>Upload</label>
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
                                <Button style={{marginTop : '10px'}} onClick={someFuncton} >Save </Button>
                            </Form>
                        );
                    }}
                </Formik>
            </Modal>
        </>
    )
}
