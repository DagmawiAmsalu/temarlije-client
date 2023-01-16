import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../components/cards/CourseCard";
import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Slider from "react-slick";

const Index = ({courses}) => {
    // const [courses, setCourse] = useState([])

    // useEffect(() => {
    //     const fetchCourses = async () => {
    //         const {data} = await axios.get("/api/courses")
    //         setCourse(data);
    //     };
    //     fetchCourses();
    // }, []);


    return(
        <>
        <div className="jumbotron text-center square">
            <div>
              <Carousel 
                infiniteLoop 
                useKeyboardArrows 
                autoPlay 
                showIndicators={false} 
                showStatus={false}
                showThumbs={false}
                >
                <div>
                  <img src="/www.temarLije.com.png" width={1340} height={300}/>
                </div>
                <div>
                  <img src="/1.png" width={1340} height={300}/>
                </div>
                <div>
                  <img src="/2.png" width={1340} height={300}/>
                </div>
                <div>
                  <img src="/3.png" width={1340} height={300}/>
                </div>
                <div>
                  <img src="/4.png" width={1340} height={300}/>
                </div>
              </Carousel>
        </div>
    </div>
        <div className="container-fluid">
            <div className="row">
                {courses.map((course) => <div key={course._id} className="col-md-4">{
                     <CourseCard course={course}/>
                }</div>)}
            </div>
        </div>
        </>
    );
};

export async function getServerSideProps() {
    const {data} = await axios.get(`${process.env.API}/courses`);
    return {
        props: {
            courses: data,
        }
    }
}

export default Index;

