
import Navbar from "../../Components/Navbar";
import Filter from "../../Components/Filter"
import React, { useState, useEffect } from 'react'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import "./home.scss";
import { Card } from 'antd';


let initFilter =
{
  name: '',
  address: 0,
  category: [],
  date: [

  ]
};

const data = Array.from({ length: 23 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: `https://joesch.moe/api/v1/random?key=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const Home = () => {

  const [filter, setFilter] = useState(initFilter)

  const onFilter = (f) => {
    console.log('onFilter: ', f)
    setFilter({ ...filter, ...f })
  }

  useEffect(() => {
    console.log('filter: ', filter)
    console.log("Filter Address", filter.address);
    console.log("filter Category  : ", filter.category)
    console.log("filter Name :", filter.name)
    console.log("filter time from ", filter?.date?.at(0)?.toISOString())
    console.log("filter time to ", filter?.date?.at(1)?.toISOString())
  }, [filter])

  const gridStyle = {
    width: '32%',
    textAlign: 'center',
    marginLeft : '20px' ,
    marginTop : '20px' ,
    borderColor : 'red'
  };

  return (
    <div className="home-page">
      <Navbar />
      <Filter filter={filter} onFilter={onFilter} />
      <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      align: 'center',
      pageSize: 10,
    }}
    dataSource={data}
    footer={
      <div>
        <b>ant design</b> footer part
      </div>
    }
    renderItem={(item) => (
      <List.Item
        key={item.title}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
    </div>
  );
};
