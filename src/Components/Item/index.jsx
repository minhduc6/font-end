import { useEffect, useState } from "react";
import { Image, message } from 'antd';
import { Avatar } from 'antd';
import "./item.scss";
import { Collapse } from 'antd';
import { useParams } from "react-router-dom";
import { httpClient } from '../../service/httpClient'
import { useNavigate } from "react-router-dom";

const { Panel } = Collapse;


export const Item = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  const [item, setItem] = useState();

  console.log("Date :", id)

  useEffect(() => {
    httpClient
      .get(`/api/event/${id}`, {
      })
      .then((response) => {
        console.log(response)
        setItem(response.data)
      }
      );
  }, [])


  const onClickBuyNow = () => {
    if (item?.typeTickets?.length == 0 || item?.typeTickets == null) {
      message.warning("Vé Chưa Được Phát Hành")
    } else {
      navigate({
        pathname: `/event/ticket/${item.id}`,
      });
    }
  }


  return (
    <>
      <section style={{ marginTop: '20px' }} class="wrapper bg-light">
        <div class="container pt-10 pb-9 pt-md-14 pb-md-11 text-center">
          <div class="row">
            <div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
              <div class="post-header">
                <h1 class="display-1 mb-3">{item?.name}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="wrapper bg-light wrapper-border">
        <div class="container pb-14 pb-md-16">
          <article>
            <div data-margin="5" >
              <Image
                width='100%'
                height='650px'
                src={item?.img}
              />
            </div>
            <div class="row">
              <div class="col-lg-10 offset-lg-1">
                <h2 class="display-6 mb-4">Thông Tin Về Sự Kiện</h2>
                <div class="row gx-0">
                  <div class="col-md-12 text-justify">
                    <div dangerouslySetInnerHTML={{ __html: item?.description }} />
                    <div class="col-md-12">
                      <ul style={{ display: 'flex' }} class="list-unstyled">
                        <li >
                          <h5 class="mb-1">Date</h5>
                          <p>{item?.day}</p>

                        </li>
                        <li style={{ marginLeft: '100px' }}>
                          <h5 class="mb-1">Time</h5>
                          <p>{item?.time}</p>

                        </li>
                      </ul>
                      <a href="#" onClick={onClickBuyNow} class="more hover">Bye Now</a>
                    </div>
                    <h2 class="display-6 mb-4">Thông Tin Về Vé</h2>
                    <Collapse>
                      {
                        item?.typeTickets.map((data) => <Panel header={data.name} key={data.id}>
                          <p>{data.description}</p>
                        </Panel>)
                      }
                    </Collapse>
                    <h2 class="display-6 mb-4 mt-4">Thông Tin Về Nhà Tổ Chức</h2>
                    <div class="row gx-0">
                      <div class="col-md-3">
                        <Avatar
                          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                          src={item?.organizers?.image}
                        />
                      </div>
                      <div class="col-md-9 text-justify">
                        <h3></h3>
                        <p>Email : {item?.organizers?.email} </p>
                        <p>Sdt : {item?.organizers?.sdt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};
