import React, { useEffect, useState } from 'react';
import Navbar from "../../Components/Navbar";
import { Footer } from "../../Components/Footer";
import { useParams } from "react-router-dom";
import { httpClient } from '../../service/httpClient'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};



function Statistical() {

    const { id } = useParams()
    const [valueState, setValueState] = useState()
    const [sale, setSale] = useState();


    useEffect(() => {
        httpClient
            .get(`/api/admin/test/statistical/${id}`).then((response) => {
                console.log(response)
                setValueState(response.data)
            }).catch(err => {
                console.log(err)
            }).finally(() => {
            });

        httpClient
            .get(`/api/admin/test/sales/${id}`).then((response) => {
                console.log(response)
                setSale(response.data)
            }).catch(err => {
                console.log(err)
            }).finally(() => {
            });
    }, []);

    useEffect(() => {
        console.log("Value ", valueState)
    }, [valueState]);

    const doanhThu = () => {
        return sale?.reduce(function (acc, obj) { return acc + obj.sumPrice}, 0);
    }


    const labels = valueState?.map((item) => item.name) || [];

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Dataset 2',
                data: valueState?.map((item) => item.sumTicket) || [],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return (
        <div>
            <Navbar />
            <div className='container' style={{ marginTop: '150px' }}>
                <h2>Doanh Thu</h2>
                <Line title='Doanh Thu' className='container' options={options} data={data} />
                <h3>Doanh Thu : {doanhThu()} VND </h3>
                <h3>Sau Khi Bán Nhận Được {doanhThu() * 0.95} VND</h3>
            </div>
            <Footer />
        </div>
    );
}

export default Statistical