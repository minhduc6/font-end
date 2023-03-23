import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Avatar } from 'antd';

export const createUserColumns = (searchText, onClickEdit, showDeleteConfirm) => {
    // TODO
    return {
        id: {
            title: 'Id',
            dataIndex: 'id',
        }
        ,
        name: {
            title: 'Name',
            dataIndex: 'displayName',
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return String(record?.displayName).toLowerCase()?.includes(value?.toLowerCase());
            }
        },
        email: {
            title: 'Email',
            dataIndex: 'email',
        },
        image: {
            title: 'Image',
            dataIndex: '',
            render: (rowdata) => <>
                <Avatar size={64} src={rowdata.imgUrl} />
            </>
        },
        action: {
            title: 'Action',
            dataIndex: '',
            render: (rowdata) => <>
                <Button type="ghost" onClick={() => onClickEdit(rowdata)} icon={<EditOutlined />} size='middle' />
                <Button type="ghost" onClick={() => showDeleteConfirm(rowdata)} style={{ color: 'red' }} icon={<DeleteOutlined />} size='middle' />
            </>
        },
    }
}

export const createCategoryColumns = (searchText, onClickEdit, showDeleteConfirm) => {
    // TODO
    return {
        id: {
            title: 'Id',
            dataIndex: 'id',
        }
        ,
        name: {
            title: 'Name',
            dataIndex: 'name',
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return String(record?.name).toLowerCase()?.includes(value?.toLowerCase());
            }
        },
        description: {
            title: 'Description',
            dataIndex: 'description',
        },
        action: {
            title: 'Action',
            dataIndex: '',
            render: (rowdata) => <>
                <Button type="ghost" onClick={() => onClickEdit(rowdata)} icon={<EditOutlined />} size='middle' />
                <Button type="ghost" onClick={() => showDeleteConfirm(rowdata)} style={{ color: 'red' }} icon={<DeleteOutlined />} size='middle' />
            </>
        },
    }
}


export const createTypeTicket = (onClickEdit, showDeleteConfirm) => {
    // TODO
    return {
        id: {
            title: 'Id',
            dataIndex: 'id',
        }
        ,
        name: {
            title: 'Name',
            dataIndex: 'name',
        },
        description: {
            title: 'Description',
            dataIndex: 'description',
        },
        price : {
            title: 'Price',
            dataIndex: 'price',
        },
        quantity : {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        action: {
            title: 'Action',
            dataIndex: '',
            render: (rowdata) => <>
                <Button type="ghost" onClick={() => onClickEdit(rowdata)} icon={<EditOutlined />} size='middle' />
                <Button type="ghost" onClick={() => showDeleteConfirm(rowdata)} style={{ color: 'red' }} icon={<DeleteOutlined />} size='middle' />
            </>
        },
    }
}
