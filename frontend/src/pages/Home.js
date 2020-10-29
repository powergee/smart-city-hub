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
                    <h2>도시과학연구원 스마트도시수출 거점HUB</h2>
                    <p>각 국가의 스마트도시 기술을 한 눈에 볼 수 있습니다!</p>
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
