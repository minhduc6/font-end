import { Table, Input } from 'antd';
import { useState, useEffect } from 'react';
import { Typography } from 'antd';
import {  createInvoiceColumns } from '../Helper/constants';
import { getInvoice} from '../Service/api';
import InvoiceFilter from './InvoiceFilter';
import { InvoiceDetailModel } from './Modal/InvoiceDetailModel';



const { Title } = Typography;

let initFilter =
{
  name: '',
  date: [
  ]
};


const Invoice = () => {

 

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusAction, setStatusAction] = useState(-1)
    const [filter, setFilter] = useState(initFilter)

    const onFilter = (f) => {
        console.log('onFilter: ', f)
        setFilter({ ...filter, ...f })
      }


    useEffect(() => {
        getInvoice(filter,setData,setLoading)
    }, [filter]);

    const openModelDetail = (item) => {
         setValue({...item})
         setIsModalOpen(true)
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
            <Title>Invoice Management</Title>
            <InvoiceFilter filter={filter} onFilter={onFilter}></InvoiceFilter>
            <Table style={{marginTop : '30px'}} loading={loading} columns={invoiceColumns} dataSource={data} />;
            <InvoiceDetailModel
                setLoading={setLoading}
                setData={setData}
                refreshInvoice={getInvoice}
                value={value}
                isModalOpen={isModalOpen}
                hideModal={() => setIsModalOpen(false)}
            />
        </>
    );
}

export default Invoice