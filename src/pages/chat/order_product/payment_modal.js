import { useState, useEffect } from 'react';
import { Col, Row, Image, Button, notification, Input } from 'antd';
import { PaymentModalModal, PaymentTypeDiv } from './style';
import CashInHandImg from '../../../assests/images/cash_in_hand.png';
import { useDispatch, useSelector } from 'react-redux';
import OnlinePaymentImg from '../../../assests/images/online_payment.png'
import axios from 'axios';
import { getAllProducts } from '../../../redux';
import { API_URL } from '../../../config';
import $ from "jquery";

const PaymentModal = ({
    product,
    sellerId,
    currentUserId,
    openModalBool,
    setOpenModalBool
}) => {
    const dispatch = useDispatch();
    const [registerOrderError, setRegisterOrderError] = useState(null);
    const [currentUserAddress, setCurrentUserAddress] = useState(null);
    const [inputValue, setInputValue] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [sellerAddress, setSellerAddress] = useState(null);
    const [registerOrderMessage, setRegisterOrderMessage] = useState(null);

    useEffect(() => {
        if (registerOrderError) {

            notification.error({
                message: registerOrderError,
                duration: 5
            });
            setRegisterOrderError(null);
        }

        if (registerOrderMessage) {
            notification.info({
                message: registerOrderMessage,
                duration: 5
            });

            dispatch(getAllProducts(currentUserId));

            setRegisterOrderMessage(null);
        }

    }, [registerOrderError, registerOrderMessage]);

    useEffect(() => {
        axios.get(`${API_URL}/users/get-user-address?user_id=${currentUserId}`)
            .then(res => {
                console.log(res);
                let userAddress = {
                    latitude: res?.data[0][0]["latitude"],
                    longitude: res?.data[0][0]["longitude"]
                }
                setCurrentUserAddress(userAddress);

                let sellerAddress = {
                    latitude: product?.user_detail?.address?.latitude,
                    longitude: product?.user_detail?.address?.longitude,
                }

                setSellerAddress(sellerAddress);
            })
            .catch(err => {
                console.log(err);
            });
    }, [currentUserId, product]);

    const registerOrder = () => {
        const values = {
            product_quantity: inputValue,
            payment_method: paymentMethod,
            user_id: currentUserId,
            seller_id: sellerId,
            product_id: product.product_id,
            current_user_address: currentUserAddress,
            seller_address: sellerAddress,
            delivered: false,
            paid: false,
            time_for_delivery: product?.time_for_delivery_in_hours
        }


        axios.post(`${API_URL}/users/register-order`, values)
            .then(res => {
                setRegisterOrderMessage(res.data);
            })
            .catch(err => {
                if (err.response.data.details) {
                    setRegisterOrderError(err.response.data.details[0]["message"]);
                } else {
                    setRegisterOrderError(err.response.data.message);
                }

            })
    };

    const handleImageClick = (paymentType) => {
        setPaymentMethod(paymentType);
        if (paymentType == "cash_in_hand") {
            $("#cash-in-hand-img").css({
                border: "2px solid green"
            });
            $("#online-payment-img").css({
                border: "1px solid black"
            });
        } else {
            $("#cash-in-hand-img").css({
                border: "1px solid black"
            });
            $("#online-payment-img").css({
                border: "2px solid green"
            });
        }
    };

    return (
        <PaymentModalModal
            centered
            visible={openModalBool}
            width={900}
            onCancel={() => { setOpenModalBool(false) }}
            maskClosable={false}
            footer={[
                <div>
                    <Button
                        type="primary"
                        onClick={() => { registerOrder() }}
                    >
                        Order
                    </Button>
                    <Button
                        type="danger"
                        onClick={() => { setOpenModalBool(false) }}
                    >
                        Cancel
                    </Button>
                </div>
            ]}
        >
            <div>
                <div>
                    <span style={{ fontSize: "1rem" }}>Products Quantity:</span>
                    <Input style={{ width: "50%", margin: "10px" }} onChange={(e) => { setInputValue(e.target.value) }} placeholder="Number of products you want" />
                </div>
                <Row justify="center" style={{ textAlign: "center" }}>
                    <Col md={12}
                        xs={24}

                    >
                        <PaymentTypeDiv
                            onClick={() => {
                                handleImageClick("cash_in_hand")
                            }}
                            id="cash-in-hand-img"
                        >
                            <div>
                                <Image

                                    preview={false}
                                    width={200}
                                    src={CashInHandImg}
                                />
                            </div>
                            <div>
                                <h1>Cash In Hand</h1>
                            </div>
                        </PaymentTypeDiv>

                    </Col>
                    <Col md={12}
                        xs={24}
                    >
                        <PaymentTypeDiv
                            onClick={() => {

                                handleImageClick("online_payment")
                            }}
                            id="online-payment-img"
                        >
                            <div>
                                <Image

                                    preview={false}
                                    width={200}
                                    src={OnlinePaymentImg}
                                />
                            </div>
                            <div>
                                <h1>Online Payment</h1>
                            </div>
                        </PaymentTypeDiv>
                    </Col>
                </Row>
            </div>
        </PaymentModalModal>
    );
};

export default PaymentModal;