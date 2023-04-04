import { Table } from 'antd';
import { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { createMyTicketColumns } from '../../admin/Helper/constants';
import { httpClient } from '../../service/httpClient';
import { useParams } from "react-router-dom";


const { Title } = Typography;


export const DetailInvoiceClient = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
   

    useEffect(() => {
        httpClient
        .get(`/api/myInvoice/detail/${id}`).then((response) => {
             console.log(response)
             setData(response.data)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        });
    }, []);

   

    const gridColumnsDict = createMyTicketColumns()
    const invoiceColumns = [
        gridColumnsDict.typeTicket,
        gridColumnsDict.serialCode,
        gridColumnsDict.qrCode,
        gridColumnsDict.price
    ]

    return (
        <>
            <div className='container' style={{marginTop : '100px'}}>
                <Title>My Ticket</Title>
                <Table style={{ marginTop: '30px' }} loading={loading} columns={invoiceColumns} dataSource={data} />
            </div>
        </>
    );
}

