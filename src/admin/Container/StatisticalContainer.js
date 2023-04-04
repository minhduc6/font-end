import React, { useEffect } from 'react';
import AdminLayout from '../Layout/AdminLayout';
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




function StatisticalContainer() {

    const { id } = useParams()
    let label = [];
    let value = [];

    useEffect(() => {
        httpClient
            .get(`/api/admin/test/statistical/${id}`).then((response) => {
                console.log(response)
                label = response.data.map((item => label.push(item.name)))
                value = response.data.map((item => value.push(item.sumTicket)))
            }).catch(err => {
                console.log(err)
            }).finally(() => {
            });
    }, []);


    console.log("Label :", label)
    console.log("Value :", value)


    const labels = label || [];

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Dataset 2',
                data: value,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <AdminLayout>
            <Line options={options} data={data} />
        </AdminLayout>
    );
}

export default StatisticalContainer