import { useEffect, useState } from "react";
import "./blog.scss";
import { httpClient } from "../../service/httpClient";
import logo from '../../images/banner.jpg'
import { Image } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Avatar, List, Space,Button } from 'antd';
import React from 'react';


export const Blog = () => {

    const [data, setData] = useState();
    const [loading, setLoading] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        httpClient
            .get("/api/blog").then((response) => {
                console.log(response)
                setData(response.data)
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
            });
    }, [])

    const detailItem = (id) => {
        navigate({
            pathname: `/blog/detail/${id}`,
        });
    }


    return (

        <><section class="wrapper bg-soft-primary">
            <div class="container pt-10 pb-19 pt-md-14 pb-md-20 text-center">
                <div class="row">
                    <div class="col-md-7 col-lg-6 col-xl-5 mx-auto">
                        <h1 class="display-1 mb-3">Blog My Event</h1>
                        <p class="lead px-lg-5 px-xxl-8">Welcome to our journal. Here you can find the latest company news and event  articles.</p>
                    </div>

                </div>

            </div>
        </section><section class="wrapper bg-light">
                <div class="container pb-14 pb-md-16">
                    <div class="row">
                        <div class="col-lg-10 mx-auto">
                            <div class="blog classic-view mt-n17">
                                <article class="post">
                                    <div class="card">
                                        <figure class="card-img-top overlay overlay-1 hover-scale"><a class="link-dark" href="blog-post.html"><img src="https://static.tkbcdn.com/site/global/content-v2/img/home-search-bg-03.jpg" alt="" /></a>
                                            <figcaption>
                                                <h5 class="from-top mb-0">Read More</h5>
                                            </figcaption>
                                        </figure>
                                        <div class="card-body">
                                            <div class="post-header">
                                                <div class="post-category text-line">
                                                    <a href="#" class="hover" rel="category">Teamwork</a>
                                                </div>

                                                <h2 class="post-title mt-1 mb-0"><a class="link-dark" href="blog-post.html">Amet Dolor Bibendum Parturient Cursus</a></h2>
                                            </div>

                                            <div class="post-content">
                                                <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Nullam quis risus eget urna mollis ornare vel. Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh. Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur.</p>
                                            </div>

                                        </div>

                                        <div class="card-footer">
                                            <ul class="post-meta d-flex mb-0">
                                                <li class="post-date"><i class="uil uil-calendar-alt"></i><span>5 Jul 2022</span></li>
                                                <li class="post-author"><a href="#"><i class="uil uil-user"></i><span>By Sandbox</span></a></li>
                                                <li class="post-comments"><a href="#"><i class="uil uil-comment"></i>3<span> Comments</span></a></li>
                                                <li class="post-likes ms-auto"><a href="#"><i class="uil uil-heart-alt"></i>3</a></li>
                                            </ul>

                                        </div>

                                    </div>

                                </article>

                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    pagination={{
                                        onChange: (page) => {
                                            console.log(page);
                                        },
                                        pageSize: 3,
                                    }}
                                    dataSource={data}
                                    renderItem={(item) => (
                                        <List.Item
                                            key={item.title}
                                            extra={
                                                <img
                                                    width={272}
                                                    alt="logo"
                                                    src={item.image}
                                                />
                                            }
                                        >
                                            <List.Item.Meta
                                                avatar={<Avatar src={item.image} />}
                                                title={<a href={item.href}>{item.name}</a>}
                                                description={item.description}
                                            />
                                            <Button onClick={() => detailItem(item.id)} block>
                                                Xem Ngay
                                            </Button>
                                        </List.Item>
                                    )}
                                />


                            </div>




                        </div>

                    </div>

                </div>
            </section></>
    );
};
