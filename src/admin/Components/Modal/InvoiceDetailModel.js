import React, { useState, useEffect, useRef } from 'react'
import { Button, List } from 'antd';
import { Select } from 'antd';
import { Modal } from 'antd';
import { httpClient } from '../../../service/httpClient';



export function InvoiceDetailModel({
    setLoading = () => null,
    setData = () => null,
    value = {},
    isModalOpen = false,
    hideModal = () => null,
    refreshInvoice = () => null
}) {
  

    const refresh = () => window.location.reload(true)
    const [dataDetail, setDataDetail] = useState()
    const [status, setStatus] = useState()




    useEffect(() => {
        setStatus(value.status)

        httpClient
            .get(`/api/admin/invoice/${value.id}`, {
            }).then((response) => {
                console.log(response)
                setDataDetail(response.data)
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                console.log('DONE')
            });

    }, [value])



    const handerCancle = (e) => {
        hideModal()
    }

    const changeStatusInvoice = () => {
        httpClient
            .put(`/api/admin/updateInvoice/${value.id}?status=${status}`).then((response) => {
                console.log(response)
                refresh();
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                hideModal()
            });
    }



    const footer = <></>

    return (
        <>
            <Modal title="Detail Invoice" open={isModalOpen} footer={footer} onCancel={(e) => handerCancle(e)}>
                <List
                    itemLayout="horizontal"
                    dataSource={dataDetail || []}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a>{item.typeTicket.name}</a>}
                                description={'Description :' + item.typeTicket.description
                                    + ' ||    Price : ' + item.typeTicket.price}
                            />
                            <div>SL : {item.quantity}</div>
                        </List.Item>
                    )}
                />
                <div style={{ marginTop: '30px' }}>
                    Amout : {value.amount}
                </div>
                <div style={{ marginTop: '20px' }}>
                    <p>Status :</p>
                    <Select
                        value={status}
                        size='large'
                        style={{ minWidth: '300px' }}
                        onChange={(value) => setStatus(value)}
                        options={[
                            { value: 1, label: 'DONE' },
                            { value: 0, label: 'PROCESSING' },
                        ]}
                    />
                    <Button onClick={changeStatusInvoice} style={{ marginLeft: '85px' }} type="primary" size='large'>
                        Change
                    </Button>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <p>Send Ticket Online :</p>
                    <Button type="primary" size='large'>
                        Send Mail
                    </Button>
                </div>
            </Modal>
        </>
    )
}
