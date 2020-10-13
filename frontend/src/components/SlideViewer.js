import React, { useState, useEffect, useRef } from 'react'
import './SlideViewer.scss'

export default function SlideViewer(props) {
    const [slides, setSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useState(() => {
        setSlides(props.slides);
        setCurrentSlide(0);
    }, [props.slides]);

    useState(() => {

    }, [currentSlide]);

    function viewNext() {
        if (currentSlide >= slides.length)
            setCurrentSlide(0);
        else
            setCurrentSlide(currentSlide+1);
    }

    function viewPrev() {
        if (currentSlide === 0)
            setCurrentSlide(slides.length-1);
        else
            setCurrentSlide(currentSlide-1);
    }

    return (
        <div>
            
        </div>
    )
}