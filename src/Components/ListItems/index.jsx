import Filter from "../../Components/Filter"
import React, { useState, useEffect } from 'react'
import { List, Space, Card, Button } from 'antd';
import { GoLocation } from "react-icons/go";
import { FcCalendar } from "react-icons/fc";
import { getEvent } from "../../service/api";
import { useNavigate } from "react-router-dom";

let initFilter =
{
  name: '',
  address: '',
  category: [],
  date: [
  ]
};


export default function ListItem() {

  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [filter, setFilter] = useState(initFilter)
  const navigate = useNavigate();

  const onFilter = (f) => {
    console.log('onFilter: ', f)
    setFilter({ ...filter, ...f })
  }

  useEffect(() => {
    console.log("Filter : ", filter)
    getEvent(filter, setData, setLoading)
  }, [filter])

  const detailItem = (id) => {
      navigate({
        pathname: `/event/detail/${id}`,
    });
  }


  return (
    <div className="home-page">
      <Filter filter={filter} onFilter={onFilter} />
      <List
        style={{ marginTop: '50px' }}
        itemLayout="vertical"
        size="large"
        loading={loading}
        grid={{ gutter: 12, column: 3 }}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          align: 'center',
          pageSize: 12,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item >
            <Card   hoverable >
              <div>
                <img style={{ height: '200px', width: '100%' }} src={item.img} alt="" />
                <h5>{item.name}</h5>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p><GoLocation />  {item.address}</p>
                  <p><FcCalendar /> : {item.day}</p>
                </div>
                <Button  onClick={() => detailItem(item.id)}  block>
                  Xem Ngay
                </Button>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
