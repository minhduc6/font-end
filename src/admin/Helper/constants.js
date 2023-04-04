import { EditOutlined, DeleteOutlined, InfoCircleOutlined,AreaChartOutlined  } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import { Avatar } from 'antd';
import { Image } from 'antd';
import { QRCode } from 'antd';

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


export const createOrganizerColumns = (searchText, onClickEdit, showDeleteConfirm) => {
    // TODO
    return {
        id: {
            title: 'Id',
            dataIndex: 'id',
        },
        image: {
            title: 'Image',
            dataIndex: '',
            render: (rowdata) => <>
                <Image
                    width={200}
                    src={rowdata.image}
                />
            </>
        },
        name: {
            title: 'Name',
            dataIndex: 'name',
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return String(record?.name).toLowerCase()?.includes(value?.toLowerCase());
            }
        },
        email: {
            title: 'Email',
            dataIndex: 'email',
        },
        sdt: {
            title: 'Phone',
            dataIndex: 'sdt',
        },
        codeBusiness: {
            title: 'Code Business',
            dataIndex: 'codeBusiness',
        },
        city: {
            title: 'City',
            dataIndex: 'city',
        },
        district: {
            title: 'District',
            dataIndex: 'district',
        },
        ward: {
            title: 'Ward',
            dataIndex: 'ward',
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

export const createInvoiceColumns = (onCickDetail) => {
    // TODO
    return {
        id: {
            title: 'Id',
            dataIndex: 'id',
        },
        name: {
            title: 'Name',
            dataIndex: 'nameRecv',
        },
        phone: {
            title: 'Phone',
            dataIndex: 'phoneRecv',
        },
        address: {
            title: 'Address',
            dataIndex: 'addressRecv',
        },
        amount: {
            title: 'Amount',
            dataIndex: 'amount',
        },
        time: {
            title: 'Times',
            dataIndex: 'times',
        },
        status: {
            title: 'Status',
            dataIndex: '',
            render: (rowdata) => <>
                <Tag color={rowdata.status == 1 ? 'green' : 'red'} >
                    {rowdata.status == 1 ? 'DONE' : 'PROCESSING'}
                </Tag>
            </>
        },
        action: {
            title: 'Action',
            dataIndex: '',
            render: (rowdata) => <>
                <Button type="ghost" onClick={() => onCickDetail(rowdata)} icon={<InfoCircleOutlined />} size='middle' />
            </>
        },

    }
}


export const createMyTicketColumns = () => {
    // TODO
    return {
        typeTicket: {
            title: 'Type Ticket',
            dataIndex: 'typeTicket',
        },
        serialCode: {
            title: 'Serial Code',
            dataIndex: 'serialCode',
        },
        qrCode: {
            title: 'Qr Code',
            dataIndex: '',
            render: (rowdata) => <>
                <QRCode value={rowdata.serialCode} />;
            </>
        },
        price: {
            title: 'Price',
            dataIndex: 'price',
        }
    }
}


export const createEventColumns = (searchText, satisticalEvent, onClickEdit, showDeleteConfirm) => {
    // TODO
    return {
        id: {
            title: 'Id',
            dataIndex: 'id',
        },
        name: {
            title: 'Name',
            dataIndex: 'name',
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return String(record?.name).toLowerCase()?.includes(value?.toLowerCase());
            }
        },
        image: {
            title: 'Image',
            dataIndex: '',
            render: (rowdata) => <>
                <Avatar size={64} src={rowdata.img} />
            </>
        },
        status: {
            title: 'Status',
            dataIndex: '',
            render: (rowdata) => <>
                <Tag color={rowdata.status == 1 ? 'green' : 'red'} >
                    {rowdata.status == 1 ? 'MỞ BÁN' : 'ĐÓNG'}
                </Tag>
            </>
        },
        action: {
            title: 'Action',
            dataIndex: '',
            render: (rowdata) => <>
                <Button type="ghost" onClick={() => satisticalEvent(rowdata)} icon={<AreaChartOutlined />} size='middle' />
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
        price: {
            title: 'Price',
            dataIndex: 'price',
        },
        quantity: {
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
