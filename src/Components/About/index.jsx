import { useEffect, useState } from "react";
import "./about.scss";
import logo from '../../images/banner.jpg'


export const About = () => {

    return (
        <section class="about-us">
            <div class="about">
                <img class="" style={{ width: '500px', height: '500px', marginTop: '100px' }} src={logo} alt="" />
                <div class="text">
                    <h2>About Us</h2>
                    <h5>Front-end Developer & <span>Designer</span></h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita natus ad sed harum itaque ullam enim quas,
                        veniam accusantium, quia animi id eos adipisci iusto molestias asperiores explicabo cum vero atque amet corporis! Soluta illum facere consequuntur magni. Ullam dolorem repudiandae cumque voluptate consequatur consectetur, eos provident necessitatibus reiciendis corrupti!</p>
                    <div class="data">
                        <a href="#" class="hire">Hire Me</a>
                    </div>
                </div>
            </div>
        </section>
    );
};
