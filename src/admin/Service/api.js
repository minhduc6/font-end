import { httpClient } from '../../service/httpClient'


export const getUser = (setData,setLoading) => {
    httpClient
        .get("/api/admin/user", {
        }).then((response) => {
             console.log(response)
             setData(response.data)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        });
};

export const getCategory = (setData,setLoading) => {
    httpClient
        .get("/api/admin/category", {
        }).then((response) => {
             console.log(response)
             setData(response.data)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        });
};