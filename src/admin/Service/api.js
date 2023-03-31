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

export const getOrganizer = (setData,setLoading) => {
    httpClient
        .get("/api/admin/organizers", {
        }).then((response) => {
             console.log(response)
             setData(response.data)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        });
};


export const getEvent = (setData,setLoading) => {
    httpClient
        .get("/api/admin/event", {
        }).then((response) => {
             console.log(response)
             setData(response.data)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        });
};


export const getInvoice = (filter,setData,setLoading) => {
    httpClient
        .get("/api/admin/filter/invoice", {
             params : {
                from : filter?.date?.at(0)?.toISOString().split('T')[0],
                to : filter?.date?.at(1)?.toISOString().split('T')[0],
                keyword : filter.name,
             }
        }).then((response) => {
             console.log(response)
             setData(response.data)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        });
};

export const getInvoiceReset = (setData,setLoading) => {
    httpClient
        .get("/api/admin/invoice", {
        }).then((response) => {
             console.log(response)
             setData(response.data)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        });
};

