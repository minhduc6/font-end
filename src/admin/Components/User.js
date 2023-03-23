import { Table, Input } from 'antd';
import { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { DialogModalUser } from './Modal/UserModel';
import { createUserColumns } from '../Helper/constants';
import { getUser } from '../Service/api';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import { httpClient } from '../../service/httpClient';
import { message } from 'antd';

const { confirm } = Modal;
const { Title } = Typography;

const User = () => {

    const [searchText, setSearchText] = useState('')
    const [data, setData] = useState([])
    const [item, setItem] = useState()
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusAction, setStatusAction] = useState(-1)

    useEffect(() => {
        getUser(setData, setLoading);
    }, []);


    const editUser = (item) => {
        console.log("Item : ", item)
        setItem({ ...item })
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
                    .delete(`/api/admin/user/${item?.id}`
                    )
                    .then((response) => {
                        message.success('Delete Success')
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

    const gridColumnsDict = createUserColumns(searchText, editUser, showDeleteConfirm)
    const userColumns = [
        gridColumnsDict.id,
        gridColumnsDict.image,
        gridColumnsDict.name,
        gridColumnsDict.email,
        gridColumnsDict.action
    ]

    return (
        <>
            <Title>User Management</Title>
            <Input.Search style={{ marginBottom: '10px' }} placeholder='Seach Here'
                onSearch={(value) => {
                    setSearchText(value)
                }}
                onChange={(e) => {
                    setSearchText(e.target.value)
                }} />
            <Table loading={loading} columns={userColumns} dataSource={data} />;
            <DialogModalUser
                setLoading={setLoading}
                setData={setData}
                statusAction={statusAction}
                refreshPermission={getUser}
                value={item}
                isModalOpen={isModalOpen}
                hideModal={() => setIsModalOpen(false)}
            />
        </>
    );
}

export default User