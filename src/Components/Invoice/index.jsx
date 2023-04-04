import { Table } from 'antd';
import { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { createInvoiceColumns } from '../../admin/Helper/constants';
import { getMyInvoice } from '../../service/api';
import { useNavigate } from "react-router-dom";



const { Title } = Typography;




export const InvoiceClient = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        getMyInvoice(setData, setLoading)
    }, []);

    const openModelDetail = (item) => {
        setValue({ ...item })
        navigate(`/my-invoice/${item.id}`)
        
    }

    const gridColumnsDict = createInvoiceColumns(openModelDetail)
    const invoiceColumns = [
        gridColumnsDict.id,
        gridColumnsDict.name,
        gridColumnsDict.address,
        gridColumnsDict.phone,
        gridColumnsDict.time,
        gridColumnsDict.amount,
        gridColumnsDict.status,
        gridColumnsDict.action
    ]

    return (
        <>
            <div className='container' style={{marginTop : '100px'}}>
                <Title>Danh Sách Hoá Đơn Của Bạn</Title>
                <Table style={{ marginTop: '30px' }} loading={loading} columns={invoiceColumns} dataSource={data} />
            </div>
        </>
    );
}

