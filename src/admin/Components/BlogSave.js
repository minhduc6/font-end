import { Typography } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { Select } from 'antd';
import { Divider, Table } from 'antd';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { httpClient } from '../../service/httpClient'
import getUrlParameter from '../../ultil/TokenUltil';
import { message } from 'antd';

const { Title } = Typography;


const BlogSave = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const ref = useRef(null);
    const refFile = useRef(null);
    const [formValues, setFormValues] = useState(value);
    const [image, setImage] = useState(null);
    let id = getUrlParameter("id")


    useEffect(() => {
        if (id != false) {
            httpClient
                .get(`/api/admin/blog/${id}`, {
                }).then((response) => {
                    setValue(response.data.content)
                    setFormValues(response.data)
                }).catch(err => {
                    console.log(err)
                }).finally(() => {
                    console.log("done")
                });
        }
    }, []);


    useEffect(() => {
        console.log("Fomr Value change : ", formValues)
    }, [formValues]);

    const initialValues = {
        id: '',
        name: '',
        description: '',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        description: Yup.string()
            .required('Address is required'),
    });

    const someFuncton = () => {
        if (id == false) {
            const dataRequest = {
                content: value,
                name: ref.current.values.name,
                description:  ref.current.values.description
            }
            const formData = new FormData();
            formData.append("file", image)
            formData.append("blog", JSON.stringify(dataRequest))
            httpClient
                .post(`/api/admin/blog`, formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    }
                )
                .then((response) => {
                    message.success('Add Success')
                    console.log("Res", response)
                    navigate({
                        pathname: '/admin/blog',
                    });
                })
                .catch(() =>
                    alert("CC !")
                );
            console.log("Data request khong co id :", dataRequest)
        } else {
            const dataRequest = {
                content: value,
                name: ref.current.values.name,
                description:  ref.current.values.description
            }
            const formData = new FormData();
            formData.append("file", image)
            formData.append("blog", JSON.stringify(dataRequest))
            httpClient
                .put(`/api/admin/blog/${id}`, formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    }
                )
                .then((response) => {
                    message.success('Edit Success')
                    console.log("Res", response)
                    navigate({
                        pathname: '/admin/blog',
                    });
                })
                .catch(() =>
                    alert("CC !")
                );
            console.log("Data request khong co id :", dataRequest)
        }
    }



    const handleFileSelected = (e) => {
        setImage(e.target.files[0])
    }



    return (
        <>
            <Title>Save Blog</Title>

            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <ReactQuill style={{ height: '500px' }} theme="snow" value={value} onChange={setValue} modules={BlogSave.modules} formats={BlogSave.formats} />
                    </div>
                    <div className="col-md-4">
                        <Formik
                            innerRef={ref}
                            initialValues={formValues || initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={someFuncton}>
                            {({ errors, touched }) => {
                                return (
                                    <Form>

                                        <div className="form-row">
                                            <div className="form-group col-12">
                                                <label>Title :</label>
                                                <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                                <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-12">
                                                <label>Description : </label>
                                                <Field name="description" type="text" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                                                <ErrorMessage name="description" component="div" className="invalid-feedback" />
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

                                        <Button style={{ marginTop: '10px' }} onClick={someFuncton} >Save</Button>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
}

BlogSave.modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }, { 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ]
}

BlogSave.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

export default BlogSave