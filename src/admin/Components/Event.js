import { Table, Input } from 'antd';
import { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { createEventColumns } from '../Helper/constants';
import { getEvent } from '../Service/api';
import { PlusOutlined } from '@ant-design/icons';
import { Modal , Button} from 'antd';
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { httpClient } from '../../service/httpClient'

const { confirm } = Modal;
const { Title } = Typography;

const Event = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('')
    const [data, setData] = useState([])
    const [value, setValue] = useState({})
    const [loading, setLoading] = useState(true)
 

    useEffect(() => {
        getEvent(setData, setLoading);
    }, []);


    const editEvent = (item) => {
        navigate({
            pathname: '/admin/event/save',
            search: `?id=${item?.id}`,
          });
    
    }


    
    const addEvent = () => {
        navigate({
            pathname: '/admin/event/save',
          });
    }


    const showDeleteConfirm = (item) => {
        confirm({
            title: 'Are you sure delete this record?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                httpClient
                    .delete(`/api/admin/event/${item?.id}`
                    )
                    .then((response) => {
                        message.success('Delete Success')
                        getEvent(setData, setLoading);
                        console.log("Res", response)
                    })
                    .catch((err) =>
                        message.error("Không xoá được để bảo toàn vẹn dữ liệu")
                    );
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const gridColumnsDict = createEventColumns(searchText, editEvent, showDeleteConfirm)
    const eventColumns = [
        gridColumnsDict.id,
        gridColumnsDict.image,
        gridColumnsDict.name,
        gridColumnsDict.status,
        gridColumnsDict.action
    ]

    return (
        <>
            <Title>Event Management</Title>
            <Button onClick={addEvent} style={{ marginBottom: '10px' }} type="primary" icon={<PlusOutlined />} size="middle"> Add </Button>
            <Input.Search style={{ marginBottom: '10px' }} placeholder='Seach Here'
                onSearch={(value) => {
                    setSearchText(value)
                }}
                onChange={(e) => {
                    setSearchText(e.target.value)
                }} />
            <Table loading={loading} columns={eventColumns} dataSource={data} />;
        </>
    );
}

export default Event