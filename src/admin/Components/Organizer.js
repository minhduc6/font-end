import { Table, Input } from 'antd';
import { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { createCategoryColumns, createOrganizerColumns } from '../Helper/constants';
import { getOrganizer } from '../Service/api';
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import { DialogModalCategory } from './Modal/CategoryModel';
import { httpClient } from '../../service/httpClient';
import { message } from 'antd';
import { DialogModalOrganizer } from './Modal/OrganizerModel';

const { confirm } = Modal;
const { Title } = Typography;

const Organizer = () => {

    const [searchText, setSearchText] = useState('')
    const [data, setData] = useState([])
    const [value, setValue] = useState({})
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusAction, setStatusAction] = useState(-1)

    useEffect(() => {
        getOrganizer(setData, setLoading);
    }, []);


    const editOrganizer = (item) => {
        console.log("Item : ", item)
        setValue(item)
        setIsModalOpen(true)
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
                    .delete(`/api/admin/organizer/${item?.id}`
                    )
                    .then((response) => {
                        message.success('Delete Success')
                        console.log("Res", response)
                        getOrganizer(setData, setLoading);
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

    const gridColumnsDict = createOrganizerColumns(searchText, editOrganizer, showDeleteConfirm)
    const userColumns = [
        gridColumnsDict.id,
        gridColumnsDict.image,
        gridColumnsDict.name,
        gridColumnsDict.email,
        gridColumnsDict.sdt,
        gridColumnsDict.city,
        gridColumnsDict.district,
        gridColumnsDict.ward,
        gridColumnsDict.action
    ]

    return (
        <>
            <Title>Organizer Management</Title>
            <Input.Search style={{ marginBottom: '10px' }} placeholder='Seach Here'
                onSearch={(value) => {
                    setSearchText(value)
                }}
                onChange={(e) => {
                    setSearchText(e.target.value)
                }} />
            <Table loading={loading} columns={userColumns} dataSource={data} />;
            <DialogModalOrganizer
                setLoading={setLoading}
                setData={setData}
                statusAction={statusAction}
                refreshOrganizer={getOrganizer}
                value={value}
                isModalOpen={isModalOpen}
                hideModal={() => setIsModalOpen(false)}
            />
        </>
    );
}

export default Organizer