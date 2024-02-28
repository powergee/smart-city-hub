"use client";
import React, { useState, useEffect, useRef } from "react";

function useInterval(callback: () => void, delay?: number) {
  const savedCallback = useRef<typeof callback>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }

    if (delay) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function Carousel(props: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
  recursive?: boolean;
  interval?: number;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { className, style, duration = 500, recursive, interval } = props;
  const slides = React.Children.toArray(props.children);

  const handlePrevious = () => {
    if (currentSlide === 0) {
      if (recursive) {
        setCurrentSlide(slides.length - 1); // go to the last slide
      }
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNext = () => {
    console.log("handleNext" + currentSlide + ", " + slides.length);
    if (currentSlide === slides.length - 1) {
      if (recursive) {
        setCurrentSlide(0); // go to the first slide
      }
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  useInterval(() => {
    if (interval) {
      handleNext();
    }
  }, interval);

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      <div
        className="flex flex-row w-full h-full transition-transform"
        style={{
          transform: `translate(${-100 * currentSlide}%)`,
          transitionDuration: `${duration}ms`,
        }}
      >
        {slides.map((slide, idx) => (
          <div className="flex-none w-full h-full" key={idx}>
            {slide}
          </div>
        ))}
      </div>
      <button
        className="rounded-full bg-uos-gray-light/50 hover:bg-uos-gray-light/90 transition w-10 h-10 absolute top-1/2 left-4 -translate-y-1/2 flex justify-center items-center"
        onClick={handlePrevious}
        type="button"
        aria-label="Previous"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
        </svg>
      </button>
      <button
        className="rounded-full bg-uos-gray-light/50 hover:bg-uos-gray-light/90 transition w-10 h-10 absolute top-1/2 right-4 -translate-y-1/2 flex justify-center items-center"
        onClick={handleNext}
        type="button"
        aria-label="Next"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
        </svg>
      </button>
    </div>
  );
}
