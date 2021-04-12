import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Layout, Image } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { WelcomeDiv, PCBackgroundImg, RightBackGround, LandingRightColumn } from './style';
import pcBackgroundImg from '../../assests/images/pcBackgroundImg.jpg';
import logo from '../../assests/images/logo.png';
import $ from 'jquery';
import { DownCircleFilled } from '@ant-design/icons';
import ReactRotatingText from 'react-rotating-text';

import HowSamanWorksDiv from './components/how_saman_works_info';
import BuySellInformation from './components/buy_sell_info';
import ChatBot from './components/chat_bot/chat-bot';

const LandingPage = () => {

    const [animationColor, setAnimationColor] = useState("yellow");

    //Animation Div Ref
    const landingRightColumnElement = useRef(null);
    const totalDegreesToRotateLandingRightDiv = 20;
    const totalDegreesToRotateLandingBuySellDiv = 40;

    const animationColors = ["#dec852", "#587abf", "#36a87b", "#e0994c"];
    const textToRender = ["buy new and old products.", "sell your own products.", "sell products for free."]

    useEffect(() => {
        const handleScroll = (event) => {
            let innerHeightValue = $("#landingRightColumnDiv").innerHeight() / 2;

            //Animation
            const landingRightDivDegreesToRotate = calculateRotation(innerHeightValue, totalDegreesToRotateLandingRightDiv);
            const landingBuySellDivDegreesToRotate = calculateRotation(innerHeightValue, totalDegreesToRotateLandingBuySellDiv);

            if (landingRightDivDegreesToRotate <= totalDegreesToRotateLandingRightDiv && landingRightDivDegreesToRotate >= 0) {

                $("#landingRightColumnDiv").css({
                    "transform": `rotate(${totalDegreesToRotateLandingRightDiv - landingRightDivDegreesToRotate}deg)`
                });


            } else {
                $("#landingRightColumnDiv").css({
                    "transform": `rotate(0deg)`
                });

            }

            if (landingBuySellDivDegreesToRotate < totalDegreesToRotateLandingBuySellDiv) {
                $(".landingBuySellDiv").css({
                    "transform": `rotate(${totalDegreesToRotateLandingBuySellDiv - landingBuySellDivDegreesToRotate}deg)`
                });

            } else {
                $(".landingBuySellDiv").css({
                    "transform": `rotate(0deg)`
                });
            }
        }

        window.addEventListener("scroll", handleScroll);

    }, []);


    //Color Animation     
    useEffect(() => {
        const animationInterval = setInterval(animateColor, 4000);
        return () => clearInterval(animationInterval);
    }, []);

    let colorIndex = 0;

    const animateColor = () => {
        for (var i = 0; i < animationColors.length; i++) {
            if (i == colorIndex) setAnimationColor(animationColors[colorIndex]);
        }

        colorIndex++;

        if (colorIndex > animationColors.length - 1) {
            colorIndex = 0;
        }
    };


    const calculateRotation = (innerHeightValue, totalDegreesToRotate) => {
        let oneDegreePixelValue = innerHeightValue / totalDegreesToRotate;
        let onePixelDegree = 1 / oneDegreePixelValue;

        let degreesToRotate = totalDegreesToRotate;
        let marginToDecrease = window.scrollY * onePixelDegree;
        $("#landingRightBackgroundDiv").css({
            "right": `-${marginToDecrease * 1.2}%`
        });

        degreesToRotate = window.scrollY * onePixelDegree;
        return degreesToRotate;
    }

    const getRotationDegree = (elementObj) => {
        var matrix = elementObj.css("-webkit-transform") ||
            elementObj.css("-moz-transform") ||
            elementObj.css("-ms-transform") ||
            elementObj.css("-o-transform") ||
            elementObj.css("transform");
        if (matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        } else { var angle = 0; }

        if (angle < 0) angle += 360;
        return angle;
    }



    return (
        <>
            <Layout style={{
                backgroundColor: "white"
            }}
            >
                <Content>
                    <Row gutter={24} style={{ textAlign: "center" }}>
                        <Col md={{ span: 6, offset: 3 }}>
                            <WelcomeDiv animatedbackgroundColor={animationColor}>
                                <div>
                                    Welcome To
                                </div>
                                <div>
                                    Saman.com
                                </div>
                                <div className="welcome-div-text">
                                    A place where you can
                                    <span className="welcome-span"> <ReactRotatingText items={textToRender} /></span>

                                </div>
                            </WelcomeDiv>

                        </Col>
                        <Col md={{ span: 11, offset: 1 }}>
                            <LandingRightColumn ref={landingRightColumnElement} id="landingRightColumnDiv">
                                <RightBackGround id="landingRightBackgroundDiv" animatedbackgroundColor={animationColor}>
                                </RightBackGround>
                                <PCBackgroundImg
                                    src={pcBackgroundImg}
                                >
                                </PCBackgroundImg>
                                {/* <div style={{ zIndex: "99999" }}>
                                    <Image src={logo}></Image>
                                </div> */}

                            </LandingRightColumn>
                        </Col>
                    </Row>
                    <BuySellInformation animatedbackgroundColor={animationColor} />
                    <HowSamanWorksDiv />
                    <ChatBot />
                </Content>
            </Layout>

        </>
    )
}

export default LandingPage;