import { httpClient } from "./httpClient";


export const getEvent = (filter,setData,setLoading) => {
    httpClient
        .get("/api/event", {
             params : {
                from : filter?.date?.at(0)?.toISOString().split('T')[0],
                to : filter?.date?.at(1)?.toISOString().split('T')[0],
                param : filter.category.toString(),
                search : filter.name,
                address : filter.address
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
