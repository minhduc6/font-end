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

const Event = () => {
    useEffect(() => {
        // getCategory(setData, setLoading);
    }, []);


    const editEvent = (item) => {
        // setStatusAction(1);
        // console.log("Item : ", item)
        // setValue(item)
        // setIsModalOpen(true)
    }


    
    const addEvent = () => {
        // setValue(null)
        // console.log("Item : ", value)
        // setStatusAction(0);
        // setIsModalOpen(true)
    }


    const showDeleteConfirm = (item) => {
      
    };

    // const gridColumnsDict = createCategoryColumns(searchText, editCategory, showDeleteConfirm)
    // const userColumns = [
    //     gridColumnsDict.id,
    //     gridColumnsDict.name,
    //     gridColumnsDict.description,
    //     gridColumnsDict.action
    // ]

    return (
        <>
            <Title>Event Management</Title>
            <Button type="ghost" onClick={addEvent} style={{color : 'red'}} icon={<PlusOutlined />} size='middle' />
        </>
    );
}

export default Event