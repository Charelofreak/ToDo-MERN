import { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
export default function Header({ active }) {
  const [isToggled, setToggled] = useState(false);
  return (
    <>
      <div className="header">
        <div className="logo">TODO</div>
        <ul className="list-header">
          <li className={active === "features" ? "active" : " "}>
            <Link to={"/"}>Features</Link>
          </li>
          <li className={active === "about" ? "active" : " "}>
            <Link to={"/about"}>about using</Link>
          </li>
          <li className={active === "contact" ? "active" : " "}>
            <Link to={"/contact"}>contact team</Link>
          </li>
          <li>
            <Link to={"/login"}>login</Link>
          </li>
        </ul>

        <button
          className="nav-toggle"
          style={{
            transform: isToggled ? "rotate(0deg)" : "rotate(90deg)",
            transition: "transform .3s linear",
          }}
          onClick={() => {
            setToggled((t) => !t);
          }}
        >
          |||
        </button>
      </div>
      <ul  className={isToggled ? "toggled-ul show" : "toggled-ul"}>
        <li className={active === "features" ? "active" : " "}>
          <Link to={"/"}>Features</Link>
        </li>
        <li className={active === "about" ? "active" : " "}>
          <Link to={"about"}>about using</Link>
        </li>
        <li className={active === "contact" ? "active" : " "}>
          <Link to={"contact"}>contact team</Link>
        </li>
        <li>
          <Link to={"/login"}>login</Link>
        </li>
      </ul>
    </>
  );
}
