import { Table, Input } from 'antd';
import { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { createEventColumns } from '../../admin/Helper/constants';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import { useNavigate } from "react-router-dom";
import { getEventByOrganizer } from '../../service/api';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { message } from 'antd';
import { httpClient } from '../../service/httpClient'

const { confirm } = Modal;
const { Title } = Typography;

const EventOrganizer = () => {

    const user = useSelector((state) => state.profile.user);
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('')
    const [data, setData] = useState([])
    const [value, setValue] = useState({})
    const [loading, setLoading] = useState(true)


    const organizer = user.organizers

    useEffect(() => {
        getEventByOrganizer(setData, setLoading);
    }, []);




    const editEvent = (item) => {
        navigate({
            pathname: '/my-event/save',
            search: `?id=${item?.id}`,
          });
    
    }


    
    const addEvent = () => {
        navigate({
            pathname: '/my-event/save',
          });
    }

    const satisticalEvent = (item) => {
        navigate({
            pathname: `/my-event/statistical/${item.id}`,
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
                    .delete(`/api/event/${item?.id}`
                    )
                    .then((response) => {
                        message.success('Delete Success')
                        getEventByOrganizer(setData, setLoading);
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


    const gridColumnsDict = createEventColumns(searchText, satisticalEvent, editEvent, showDeleteConfirm)
    const eventColumns = [
        gridColumnsDict.id,
        gridColumnsDict.image,
        gridColumnsDict.name,
        gridColumnsDict.status,
        gridColumnsDict.action
    ]

    return (
        <>
            {
                organizer != null ? (<div className='container' style={{ marginTop: '100px' }}>
                    <Title>Event Created</Title>
                    <Button onClick={addEvent} style={{ marginBottom: '10px' }} type="primary" size="middle"> + Create </Button>
                    <Input.Search style={{ marginBottom: '10px' }} placeholder='Seach Here'
                        onSearch={(value) => {
                            setSearchText(value)
                        }}
                        onChange={(e) => {
                            setSearchText(e.target.value)
                        }} />
                    <Table loading={loading} columns={eventColumns} dataSource={data} />;
                </div>) : (<div className='container' style={{ marginTop: '100px' }}>
                    <Title>Bạn Chưa Có Hồ Sơ Ban Tổ Chức. Vui Lòng Tạo Hồ Sơ</Title>
                </div>)
            }
        </>

    );
}

export default EventOrganizer