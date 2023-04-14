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
import { createTypeTicket } from '../../admin/Helper/constants';
import { TypeTicketModal } from '../../admin/Components/Modal/TypetiketModal'
import { httpClient } from '../../service/httpClient'
import getUrlParameter from '../../ultil/TokenUltil';
import { message } from 'antd';

const { Title } = Typography;


const EventForm = () => {
    const navigate = useNavigate();
    const [dataTable, setDataTable] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusAction, setStatusAction] = useState(-1)
    const [valueCategory, setValueCategory] = useState();
    const [valueStatus, setValueStatus] = useState();
    const [item123, setItem123] = useState({})
    const [value, setValue] = useState('');
    const ref = useRef(null);
    const refFile = useRef(null);
    const [formValues, setFormValues] = useState(value);
    const [image, setImage] = useState(null);
    const [options, setOptions] = useState([]);
    let id = getUrlParameter("id")


    useEffect(() => {
        httpClient
            .get("/api/category", {
            }).then((response) => {
                const temp = []
                console.log(response.data)
                for (let i = 0; i < response?.data?.length; i++) {
                    temp.push({
                        value: response.data[i].id,
                        label: response.data[i].name,
                    });
                    setOptions(temp)
                }
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                console.log("done")
            });

        console.log("ID :" ,id)


        if (id != false) {
            httpClient
                .get(`/api/event/${id}`, {
                }).then((response) => {
                    let temp = []
                    for (let index = 0; index < response.data.categoryList.length; index++) {
                        const element = response.data.categoryList[index];
                        temp.push(element?.id)
                    }
                    setValueStatus(response.data.status)
                    setValueCategory(temp);
                    setDataTable(response.data.typeTickets)
                    console.log("Response  event: ", response)
                    setValue(response.data.description)
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
        address: '',
        day: '',
        time: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        address: Yup.string()
            .required('Address is required'),
        time: Yup.string()
            .required('Time is required'),
    });

    const someFuncton = () => {
        console.log("id", id)
        if (valueCategory == null) {
            message.error("Không để trống Category")
        } else {
            if (id == false) {
                const dataRequest = {
                    address: ref.current.values.address,
                    description: value,
                    listCategory: valueCategory,
                    name: ref.current.values.name,
                    status: valueStatus,
                    ticketList: dataTable,
                    day: ref.current.values.day,
                    time: ref.current.values.time
                }
                const formData = new FormData();
                formData.append("file", image)
                formData.append("event", JSON.stringify(dataRequest))
                httpClient
                    .post(`/api/event`, formData,
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
                            pathname: '/my-event',
                        });
                    })
                    .catch(() =>
                        alert("CC !")
                    );
                console.log("Data request khong co id :", dataRequest)
            } else {
                const dataRequest = {
                    address: ref.current.values.address,
                    description: value,
                    listCategory: valueCategory,
                    name: ref.current.values.name,
                    status: valueStatus,
                    ticketList: dataTable,
                    day: ref.current.values.day,
                    time: ref.current.values.time
                }
                const formData = new FormData();
                formData.append("file", image)
                formData.append("event", JSON.stringify(dataRequest))
                httpClient
                    .put(`/api/event/${id}`, formData,
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
                            pathname: '/my-event',
                        });
                    })
                    .catch(() =>
                        alert("CC !")
                    );
                console.log("Data request khong co id :", dataRequest)
            }
        }
    }

    const addTypeTicket = () => {
        setItem123({})
        setIsModalOpen(true)
        setStatusAction(0)
    }

    const editTypeTicket = (item) => {
        setStatusAction(1)
        setIsModalOpen(true)
        setItem123(item)
    }

    const showDeleteConfirm = (item) => {
        console.log("item", item)
        let filtered = dataTable.filter(function (el) { return el.id != item.id });
        setDataTable(filtered)
    }

    const gridColumnsDict = createTypeTicket(editTypeTicket, showDeleteConfirm)
    const userColumns = [
        gridColumnsDict.name,
        gridColumnsDict.description,
        gridColumnsDict.price,
        gridColumnsDict.quantity,
        gridColumnsDict.action
    ]

    const handleFileSelected = (e) => {
        setImage(e.target.files[0])
    }

    return (
        <>
            <div style={{marginTop : '100px'}} className="container">
                <Title>Save Event</Title>
                <div className="row">
                    <div className="col-md-8">
                        <ReactQuill style={{ height: '500px' }} theme="snow" value={value} onChange={setValue} modules={EventForm.modules} formats={EventForm.formats} />
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
                                                <label>Title : </label>
                                                <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                                <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-12">
                                                <label>Address : </label>
                                                <Field name="address" type="text" className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')} />
                                                <ErrorMessage name="address" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-12">
                                                <label>Day : </label>
                                                <Field name="day" type="date" className={'form-control' + (errors.day && touched.day ? ' is-invalid' : '')} />
                                                <ErrorMessage name="day" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-12">
                                                <label>Time : </label>
                                                <Field name="time" type="time" className={'form-control' + (errors.time && touched.time ? ' is-invalid' : '')} />
                                                <ErrorMessage name="time" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-12">
                                                <label>Category : </label>
                                                <Select
                                                    mode="multiple"
                                                    size='large'
                                                    value={valueCategory}
                                                    placeholder="Please select"
                                                    onChange={(value) => setValueCategory(value)}
                                                    style={{ width: '100%' }}
                                                    options={options}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-12">
                                                <label>Status : </label>
                                                <Select
                                                    defaultValue={1}
                                                    style={{ width: 120 }}
                                                    value={valueStatus}
                                                    onChange={(e) => setValueStatus(e)}
                                                    options={[
                                                        { value: 0, label: 'Đóng' },
                                                        { value: 1, label: 'Mở Bán' },
                                                    ]}
                                                />
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
                <div class="row" style={{ marginTop: '50px' }} />
                <Divider>Loại Vé</Divider>
                <Button onClick={addTypeTicket} type="primary" ghost>
                    Add
                </Button>
                <Table columns={userColumns} dataSource={dataTable} size="small" />
                <TypeTicketModal
                    data={dataTable}
                    setData={setDataTable}
                    statusAction={statusAction}
                    value={item123}
                    isModalOpen={isModalOpen}
                    hideModal={() => setIsModalOpen(false)}
                />
                <div />
            </div>
        </>
    );
}

EventForm.modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }, { 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ]
}

EventForm.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

export default EventForm