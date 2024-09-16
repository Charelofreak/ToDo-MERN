import React, { useEffect } from "react";
import "./Features.css";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../conponents/Header";
import todo from "../imgs/list.png";
import addTodo from "../imgs/add.png";
import calender from "../imgs/calendar.png";
import crono from "../imgs/stopwatch.png";
import groupe from "../imgs/diversity.png";
import Footer from "../conponents/Footer";
export default function Features() {
  const img1 = useRef(null);
  const img2 = useRef(null);
  const img3 = useRef(null);
  const img4 = useRef(null);
  const img5 = useRef(null);

  let imgs = [img1, img2, img3, img4, img5];

  function onscroll(imgs) {
    let arr = Array.from(imgs);
    arr.forEach((e, i) => {
      if (
        e !== null &&
        Math.abs(+e?.current?.getAttribute("data-scroll") - window.scrollY) >
          300
      ) {
        e.current.style.position = "relative";

        if (i % 2 === 0)
          e.current.style.right =
            -Math.abs(+e.current.getAttribute("data-scroll") - window.scrollY) +
            "px";
        else
          e.current.style.left =
            -Math.abs(+e.current.getAttribute("data-scroll") - window.scrollY) +
            "px";
      } else{
        if (i % 2 === 0 && e.current !== null) 
         (e.current.style.right = "0px");
        else if(e.current !== null)
         (e.current.style.left = "0px")
      }
    });
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      onscroll(imgs);
    });

    return window.removeEventListener("scroll", () => {
      onscroll(imgs);
    });
  }, []);
  return (
    <div>
      <Header active={"features"}></Header>
      <div className="container">
        <div className="todo">
          <h1>Organize all aspect of your life</h1>
          <p>Organize all aspects of your life</p>
          <img ref={img1} data-scroll="0" id="img0" src={todo} alt="todo" />
        </div>
        <div className="todo">
          <h1>Add tasks faster and easier</h1>
          <p>
            you can add task faster ,just click on ADD TASK and you life will be
            easy
          </p>
          <img
            ref={img2}
            data-scroll="600"
            id="img1"
            src={addTodo}
            alt="todo"
          />
        </div>
        <div className="todo">
          <h1>All in one place</h1>
          <p style={{ textAlign: "center" }}>
            you can see all task for one month in one place in ours tasks is
            'calender'
          </p>
          <img
            ref={img3}
            data-scroll="1200"
            id="img2"
            src={calender}
            alt="todo"
          />
        </div>
        <div className="todo">
          <h1>Focus on your goals</h1>
          <p>
            Practice the Pomodoro Technique in TODO. Stay focused, stay
            productive.
          </p>
          <img ref={img4} data-scroll="1800" id="img3" src={crono} alt="todo" />
        </div>
        <div className="todo">
          <h1>team works</h1>
          <p style={{ textAlign: "center" }}>
            you can work alone and you can work as a groupe and finish it faster
          </p>
          <img
            ref={img5}
            data-scroll="2400"
            id="img4"
            src={groupe}
            alt="todo"
          />
        </div>
        <div className=" todo get-started" style={{ height: "40vh" }}>
          <span>
            <Link to={"login"}>get started</Link>
          </span>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}
