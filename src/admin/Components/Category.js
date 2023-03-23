import { Table, Input } from 'antd';
import { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { createCategoryColumns } from '../Helper/constants';
import { getCategory, getUser } from '../Service/api';
import { ExclamationCircleFilled ,PlusOutlined } from '@ant-design/icons';
import { Modal , Button} from 'antd';
import { DialogModalCategory } from './Modal/CategoryModel';
import { httpClient } from '../../service/httpClient';
import { message } from 'antd';

const { confirm } = Modal;
const { Title } = Typography;

const Category = () => {

    const [searchText, setSearchText] = useState('')
    const [data, setData] = useState([])
    const [value, setValue] = useState({})
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusAction, setStatusAction] = useState(-1)

    useEffect(() => {
        getCategory(setData, setLoading);
    }, []);


    const editCategory = (item) => {
        setStatusAction(1);
        console.log("Item : ", item)
        setValue(item)
        setIsModalOpen(true)
    }


    
    const addCategory = () => {
        setValue(null)
        console.log("Item : ", value)
        setStatusAction(0);
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
                    .delete(`/api/admin/category/${item?.id}`
                    )
                    .then((response) => {
                        message.success('Delete Success')
                        console.log("Res", response)
                        getCategory(setData, setLoading);
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

    const gridColumnsDict = createCategoryColumns(searchText, editCategory, showDeleteConfirm)
    const userColumns = [
        gridColumnsDict.id,
        gridColumnsDict.name,
        gridColumnsDict.description,
        gridColumnsDict.action
    ]

    return (
        <>
            <Title>Category Management</Title>
            <Button type="ghost" onClick={addCategory} style={{color : 'red'}} icon={<PlusOutlined />} size='middle' />
            <Input.Search style={{ marginBottom: '10px' }} placeholder='Seach Here'
                onSearch={(value) => {
                    setSearchText(value)
                }}
                onChange={(e) => {
                    setSearchText(e.target.value)
                }} />
            <Table loading={loading} columns={userColumns} dataSource={data} />;
            <DialogModalCategory
                setLoading={setLoading}
                setData={setData}
                statusAction={statusAction}
                refreshCategory={getCategory}
                value={value}
                isModalOpen={isModalOpen}
                hideModal={() => setIsModalOpen(false)}
            />
        </>
    );
}

export default Category