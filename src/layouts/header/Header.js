/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Router from "next/router";
import { useRouter } from "next/router";
import authHeader from "./../../services/authHeader";
import { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import LogoWhite from "../../assets/images/logos/xtremelogowhite.svg";
import user1 from "../../assets/images/users/user1.jpg";

const Header = ({ showMobmenu }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();

  const {
    query: { userInfo },
  } = router;
  const dataFromUrl = JSON.stringify(userInfo);

  const getToken = async () => {
    userInfo
      ? localStorage.setItem("user", dataFromUrl)
      : console.log("nothing");
  };

  const tokenChek = async () => {
    try {
      console.log("localStorage state", localStorage.getItem("user"));
      const url = "https://yuding.herokuapp.com/restaurants/by-account";
      const requestoptions = {
        method: "GET",
        headers: authHeader(),
      };

      const response = await fetch(url, requestoptions);

      if (response.status === 401) {
        // Router.push({
        //   pathname: "http://localhost:8081/Login",
        // });
        console.log("nothing");
      } else {
        const jsonData = await response.json();
        if (jsonData.restaurant.length === 0) {
          Router.push({
            pathname:
              "https://yuding-client-mardoxhee.vercel.app/Creationrestaurant",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    Router.push({
      pathname: "http://localhost:8081/Login",
    });
  };

  useEffect(() => {
    getToken();
    tokenChek();
  }, [dataFromUrl]);

  return (
    <Navbar color="primary" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <Image src={LogoWhite} alt="logo" />
        </NavbarBrand>
        <Button color="primary" className="d-lg-none" onClick={showMobmenu}>
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link href="/">
              <a className="nav-link">Starter</a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/reglages">
              <a className="nav-link">Reglages</a>
            </Link>
          </NavItem>
          <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
              Notre menu
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="primary">
            <div style={{ lineHeight: "0px" }}>
              <Image
                src={user1}
                alt="profile"
                className="rounded-circle"
                width="30"
                height="30"
              />
            </div>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem>My Account</DropdownItem>
            <DropdownItem>Edit Profile</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>My Balance</DropdownItem>
            <DropdownItem>Inbox</DropdownItem>
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
