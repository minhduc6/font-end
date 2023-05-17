import { useEffect, useState } from "react";
import { Image, message } from 'antd';
import "./item.scss";
import { useParams } from "react-router-dom";
import { httpClient } from '../../service/httpClient'
import { useNavigate } from "react-router-dom";


export const DetailBlog = () => {
  const { id } = useParams()
  const [item, setItem] = useState();

  useEffect(() => {
    httpClient
      .get(`/api/blog/${id}`, {
      })
      .then((response) => {
        console.log(response)
        setItem(response.data)
      }
      );
  }, [])


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
                src={item?.image}
              />
            </div>
            <div class="row">
              <div class="col-lg-10 offset-lg-1">
                <div class="row gx-0">
                  <div class="col-md-12 text-justify">
                    <div dangerouslySetInnerHTML={{ __html: item?.content }} />
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
