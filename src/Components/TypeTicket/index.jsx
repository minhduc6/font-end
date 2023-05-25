import { List } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { InputNumber } from 'antd';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Button, message, Steps, Tag } from 'antd';
import { useParams } from "react-router-dom";
import { Image } from 'antd';
import { httpClient } from '../../../src/service/httpClient';
import  img  from '../../assets/img/qrbank.jpg'


export const BuyTicket = () => {
  const [sum, setSum] = useState(0)
  const [nameRcev, setNameRcev] = useState()
  const [emailRcev, setEmailRcev] = useState()
  const [sdtRcev, setSdtRcev] = useState()
  const [formValues, setFormValues] = useState(null);
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState()
  const { id } = useParams()
  const ref = useRef()
  const [dataTemp, setDataTemp] = useState([])

  const initialValues = {
    nameRecv: '',
    emailRecv: '',
    sdtRecv: '',
  };


  useEffect(() => {
    httpClient
      .get(`/api/type-ticket/${id}`, {
      }).then((response) => {
        setData(response.data)
        setDataTemp(response?.data?.map(obj => ({ ...obj, soLuong: 0 })))
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        console.log("done")
      });
  }, []);


  useEffect(() => {
    console.log("Data temp ", dataTemp)
  }, [dataTemp]);

  const validationSchema = Yup.object().shape({
    nameRecv: Yup.string()
      .required('Name is required'),
    sdtRecv: Yup.string()
      .required('Phone is required'),
    emailRecv: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
  });

  const steps = [
    {
      title: 'First',
      content: (<div className='container'>
        <List
          style={{ marginTop: '100px' }}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item >
              <List.Item.Meta
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.description}
              />
              
              <div>
              {item.quantity == 0 ? <Tag color="red">Hết Vé</Tag> : ""}
                <p>Price :  {item.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                <InputNumber disabled={item.quantity == 0 ? true : false}  accept='number' value={dataTemp[index].soLuong} onChange={(event) => onChangeProductQuantity(index, event)} min={0} max={3} defaultValue={0} />
              </div>

            </List.Item>
          )}
        />
        <h3>Tổng Tiền : {sum}</h3>
      </div>),
    },
    {
      title: 'Second',
      content: (<Formik
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
              <div style={{ marginTop: '100px' }} className="container">
                <h1>Infomation</h1>
                <div className="form-row">
                  <div className="form-group col-6">
                    <label>Name Recv</label>
                    <Field name="nameRecv" type="text" className={'form-control' + (errors.nameRecv && touched.nameRecv ? ' is-invalid' : '')} />
                    <ErrorMessage name="nameRecv" component="div" className="invalid-feedback" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-6">
                    <label>Email Recv</label>
                    <Field name="emailRecv" type="text" className={'form-control' + (errors.emailRecv && touched.emailRecv ? ' is-invalid' : '')} />
                    <ErrorMessage name="emailRecv" component="div" className="invalid-feedback" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-6">
                    <label>Phone Recv</label>
                    <Field name="sdtRecv" type="text" className={'form-control' + (errors.sdtRecv && touched.sdtRecv ? ' is-invalid' : '')} />
                    <ErrorMessage name="sdtRecv" component="div" className="invalid-feedback" />
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>),
    },
    {
      title: 'Last',
      content: (
        <Image
        style={{marginLeft : '800px'}}
        width={200}
        src={img}
      />
      ),
    },
  ];
  const next = () => {
    if (sum == 0) {
      message.error('Vui Lòng Chọn Vé Đi')
    } else {
      setCurrent(current + 1);
    }

  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));


  const onChangeProductQuantity = (index, value) => {

    console.log("Value : ", value)
    console.log("Index : ", index)

    dataTemp[index].soLuong = value;
    let sum = 0
    for (let index = 0; index < dataTemp.length; index++) {
      const element = dataTemp[index];
      sum += element.soLuong * element.price
    }

    setSum(sum)
    console.log("Data : ", data)
  };

  const onSubmit = () => {
    if (Object.keys(ref.current.errors).length !== 0) {
      message.error("Vui lòng điền đủ thông tin")
    } else if (ref.current.values.nameRecv === '') {
      message.error("Vui lòng điền đủ thông tin")
    } else {
      setNameRcev(ref.current.values.nameRecv)
      setEmailRcev(ref.current.values.emailRecv)
      setSdtRcev(ref.current.values.sdtRecv)
      message.success('Ok')
      next()
    }
    console.log("REF", ref.current.errors)
  }

  const done = () => {
    const result = dataTemp.filter(item => item.soLuong > 0);
    console.log("Result : ", result)
    console.log("Amount : ", sum)
    console.log("Name : ", nameRcev)
    console.log("Email : ", emailRcev)
    console.log("sdt : ", sdtRcev)

    const dataRequest = {
      addressRecv: emailRcev,
      amount: sum,
      nameRecv: nameRcev,
      payTicketRequestList: result,
      phoneRecv: sdtRcev
    }

    const formData = new FormData();
    formData.append("payRequest", JSON.stringify(dataRequest))
    httpClient
      .post(`/api/payment`, formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }).then((response) => {
          message.success('OK')
        }).catch(err => {
          message.error("Có Lỗi Gì Đó || Số Lượng Vé Đã Bán Hết Không Đủ")
          console.log(err)
        }).finally(() => {
          console.log("done")
        });

  }



  return (

    <>
      <Steps current={current} items={items} />
      <div>{steps[current].content}</div>
      <div
        style={{
          marginTop: 100,
          marginLeft: 100
        }}
      >
        {current < steps.length - 1 && current == 1 ? (
          <Button type="primary" onClick={onSubmit}>
            Next
          </Button>
        ) : (current < steps.length - 1) ? (<Button type="primary" onClick={() => next()}>
          Next
        </Button>) : ('')}
        {current === steps.length - 1 && (
          <Button onClick={done} type="primary">
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
