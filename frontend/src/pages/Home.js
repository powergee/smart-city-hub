import React from 'react'
import { NoticeBoard, LinkBoard } from '../components'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import slide1 from "../images/slide-sample-1.png";
import slide2 from "../images/slide-sample-2.png";
import './Home.scss'

export default function Home() {
    return (
        <React.Fragment>
            <Slide easing="ease" className="slide-container">
                <div className="each-slide">
                    <div style={{ 'backgroundImage': `url(${slide1})` }}>
                        <span>예시 슬라이드 1</span>
                    </div>
                </div>
                <div className="each-slide">
                    <div style={{ 'backgroundImage': `url(${slide2})` }}>
                        <span>예시 슬라이드 2</span>
                    </div>
                </div>
            </Slide>

            <div className="board-background">
                <div className="board-container">
                    <NoticeBoard></NoticeBoard>
                    <LinkBoard></LinkBoard>
                </div>
            </div>
        </React.Fragment>
    )
}
