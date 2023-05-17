import { Table, Input } from 'antd';
import { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { createBlog, createEventColumns } from '../Helper/constants';
import { getBlog, getEvent } from '../Service/api';
import { PlusOutlined } from '@ant-design/icons';
import { Modal , Button} from 'antd';
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { httpClient } from '../../service/httpClient'

const { confirm } = Modal;
const { Title } = Typography;

const Blog = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('')
    const [data, setData] = useState([])
    const [value, setValue] = useState({})
    const [loading, setLoading] = useState(true)
 

    useEffect(() => {
        getBlog(setData, setLoading);
    }, []);


    const editBlog = (item) => {
        navigate({
            pathname: '/admin/blog/save',
            search: `?id=${item?.id}`,
          });
    
    }


    
    const addBlog = () => {
        navigate({
            pathname: '/admin/blog/save',
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
                    .delete(`/api/blog/event/${item?.id}`
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

    const gridColumnsDict = createBlog(searchText, editBlog, showDeleteConfirm)
    const blogColumns = [
        gridColumnsDict.id,
        gridColumnsDict.name,
        gridColumnsDict.description,
        gridColumnsDict.action
    ]

    return (
        <>
            <Title>Blog Management</Title>
            <Button onClick={addBlog} style={{ marginBottom: '10px' }} type="primary" icon={<PlusOutlined />} size="middle"> Add </Button>
            <Input.Search style={{ marginBottom: '10px' }} placeholder='Seach Here'
                onSearch={(value) => {
                    setSearchText(value)
                }}
                onChange={(e) => {
                    setSearchText(e.target.value)
                }} />
            <Table loading={loading} columns={blogColumns} dataSource={data} />;
        </>
    );
}

export default Blog