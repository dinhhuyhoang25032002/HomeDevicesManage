import React, { useState, useEffect,useRef } from "react";


const ScrollbarsButton = (props) => {
    const [scrollPosition, setSrollPosition] = useState(0);
    let[showGoTop, setshowGoTop] = useState("goTopHidden")
    const handleVisibleButton = () => {
        const position = window.pageYOffset;
        setSrollPosition(position);

        if (scrollPosition > 50) {
            return setshowGoTop("goTop");
        } else if (scrollPosition < 50) {
            return setshowGoTop("goTopHidden");
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleVisibleButton);
    });
    const refScrollUp = useRef();
    const handleScrollUp = () => {
        refScrollUp.current.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <>
            <div className={props.showGoTop} onClick={props.scrollUp}>
                <button className="goTop">
                    <i className="goTop _text fas fa-chevron-up" />
                </button>
            </div>
        </>
    );
};
export default ScrollbarsButton;


