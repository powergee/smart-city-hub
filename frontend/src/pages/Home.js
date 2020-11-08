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

            <div className="comment-background">
                <div className="comment-container">
                    <h2>국제도시 및 인프라 연구센터</h2>
                    <p>서울시립대학교의 국제도시 및 인프라 연구센터에 오신 것을 환영합니다!</p>
                </div>
            </div>

            <div className="board-background">
                <div className="board-container">
                    <NoticeBoard></NoticeBoard>
                    <LinkBoard></LinkBoard>
                </div>
            </div>
        </React.Fragment>
    )
}
