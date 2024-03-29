import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import SearchBar from './search_bar';
import RatingComponent from './rating_component';
import MessageDropDown from './message_dropdown';
import { NavBarDiv, NavBarMenu, MenuItem, DropDownMenuDiv, UserDropDownMenuDiv, LogoutButton } from './style';
import { Row, Col, Dropdown, Divider, Image, Input } from 'antd';
import { DownOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons'
import { NavbarItems, UserProfileItems } from './navbar_items';
import { getToken } from '../../utils/storage';
import { Fragment } from 'react';
import { logoutUser } from '../../redux';
import 'font-awesome/css/font-awesome.min.css';
import logo from '../../assests/images/logo.png';
import $ from 'jquery';

const Navbar = ({ displaySearchBar }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const User = useSelector(state => state.user?.user);
    const fullName = `${User?.first_name} ${User?.last_name ? User?.last_name : ""}`;

    const onLogout = () => {
        dispatch(logoutUser(history));
    }

    //Display Nav Bar on Scroll
    useEffect(() => {
        var previousScrollPos = window.pageYOffset;
        window.onscroll = function () {
            var currentScrollPos = window.pageYOffset;
            if (previousScrollPos > currentScrollPos) {
                $("#navBarDiv").css({ top: "0" })
            } else {
                $("#navBarDiv").css({ top: "-100px" })
            }
            previousScrollPos = currentScrollPos;
        };
    });


    const DropDownMenu = (props) => {
        return (
            <DropDownMenuDiv>
                {
                    (props.subMenu && props.subMenu.length > 0)
                        ? props.subMenu.map(({ name, label, path }, i) => {
                            return (
                                <NavBarMenu>
                                    <MenuItem
                                        key={i}
                                    >
                                        <Link to={path}>
                                            {label}
                                        </Link>

                                    </MenuItem>
                                </NavBarMenu>
                            )
                        }) :
                        ""
                }
            </DropDownMenuDiv>
        )
    }

    const UserDropDownMenu = () => {
        return (
            <UserDropDownMenuDiv>
                <Row className="userMenuLabel">
                    <h4><b>{fullName}</b></h4>
                </Row>
                <Row className="userMenuLabel userMenuEmail">
                    <p>{User?.email}</p>
                </Row>
                <Row className="userMenuLabel">
                    <Link to="/profile">
                        <h4><UserOutlined style={{
                            fontSize: "1rem",
                            marginRight: "0.5rem"
                        }} /><b>Your Profile</b></h4>
                    </Link>

                </Row>
                <Divider style={{ margin: "2px 0px" }} />
                <Row>
                    <LogoutButton
                        size="small"
                        onClick={() => {
                            onLogout()
                        }}
                    >
                        Log out
                    </LogoutButton>
                </Row>
            </UserDropDownMenuDiv>
        )
    };


    //Return Main Component
    return (
        <NavBarDiv id="navBarDiv">
            <Row gutter={24}>
                <Col
                    md={{ span: 5, offset: 0 }}
                    xl={{ span: 5, offset: 0 }}
                    style={{ display: "flex", alignItems: "baseline", flexDirection: "row", justifyContent: "space-between", zIndex: "999", textAlign: "center" }}
                >
                    <div style={{ padding: "1rem" }}>
                        <Link to="/">
                            <Image src={logo}
                                width="50%"
                                alt="Logo.png"
                                onClick={() => {
                                    <Redirect to="/"></Redirect>
                                }}
                                preview={false}
                            />
                        </Link>
                    </div>
                    {/* Conditional Search Bar Rendering */}

                    {displaySearchBar ?
                        (
                            <div style={{ padding: "1rem" }}>
                                <div id="searchIconDiv">
                                    <div>
                                        <SearchBar></SearchBar>
                                    </div>
                                    <div>
                                        Search
                                </div>
                                </div>
                                <div>
                                    <Input id="searchInput" placeholder="Search" />
                                </div>

                            </div>
                        )
                        :
                        (
                            ""
                        )
                    }
                </Col>

                <Col
                    md={{ span: 8 }}
                    xl={{ span: 14 }}
                >
                    <Row style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
                        <Col>
                            <h2><b>Saman.com</b></h2>
                            {/* <Image
                                width={100}
                                src={logo}
                            >
                            </Image> */}
                        </Col>
                        <Col>
                            <NavBarMenu
                                mode="horizontal"
                            >
                                {NavbarItems.map(({ name, label, subMenu, path }, i) =>
                                    subMenu ?
                                        (
                                            <Dropdown
                                                overlay={<DropDownMenu subMenu={subMenu}></DropDownMenu>}
                                            >

                                                <a className="nav-bar-anchor">
                                                    <div>{label}<DownOutlined /></div>
                                                </a>


                                            </Dropdown>
                                        )
                                        :
                                        (
                                            <MenuItem
                                                key={i}
                                            >
                                                <Link to={path}>
                                                    <h3>{label}</h3>
                                                </Link>

                                            </MenuItem>
                                        )

                                )}
                            </NavBarMenu>
                        </Col>
                    </Row>

                </Col>
                <Col
                    md={{ span: 8 }}
                    xl={{ span: 4, offset: 0 }}
                    style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", zIndex: "999", padding: "1rem", textAlign: "center" }}
                >
                    <RatingComponent />

                    {/* To display messages or not */}
                    {getToken() ?
                        (
                            <MessageDropDown />
                        ) :
                        ""
                    }


                    {/* To display Profile Icon or signup/register icon */}
                    {getToken() ?
                        (
                            UserProfileItems.map(({ name, label }) => {
                                return (
                                    <Fragment>
                                        <Dropdown
                                            overlay={<UserDropDownMenu />}
                                            trigger={['click']}
                                            style={{
                                                pointer: "cursor"
                                            }}
                                        >
                                            <div>
                                                <div>
                                                    <UserOutlined style={{
                                                        fontSize: "2.5rem",
                                                    }} />
                                                </div>
                                                <a className="nav-bar-anchor" style={{ color: "black" }}>Profile</a>
                                            </div>

                                        </Dropdown>

                                    </Fragment>
                                )
                            })
                        )
                        :
                        (
                            <div>
                                <Link to="/users/register" className="nav-bar-anchor" style={{ color: "black" }}>
                                    <div>
                                        <i className="fa fa-hand-paper-o" style={{ fontSize: "2.5rem" }}></i>
                                    </div>
                                    <div>
                                        Sign Up/Register
                                    </div>
                                </Link>

                            </div>
                        )
                    }
                </Col>
            </Row>
        </NavBarDiv>
    )
}

export default Navbar;