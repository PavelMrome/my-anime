import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Slider.css';
import { Link } from 'react-router-dom';

function UpdatesSlider() {
    const [updates, setUpdates] = useState([]);

    useEffect(() => {
        fetch('https://api.anilibria.tv/v3/title/updates?page=1&limit=40')
            .then(response => response.json())
            .then(data => {
                console.log(data); 
                setUpdates(data.list || []); 
            })
            .catch(error => console.error('Ошибка:', error));
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 4000,
        adaptiveHeight: false,
        swipeToSlide: true,
          
        
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3
                }
            }
        ]
    };

    return (
        <div className="slider-container">
            {/* <h1 className='goooooal'>Актуальные выпуски</h1> */}
            <Slider {...settings}>
                {updates.map((update, index) => (
                    <div key={index} className="slide">
                        <Link to={`/anime/${update.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img className='slider-img' src={`https://www.anilibria.tv${update.posters.small.url}`} alt={update.names.ru} />
                        <h3>{update.names.ru}</h3>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default UpdatesSlider;