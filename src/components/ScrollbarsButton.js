import React, { useState } from 'react';

import './ScrollbarsButton.scss';

const ScrollbarsButton = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 30) {
            setVisible(true)
        }
        else if (scrolled <= 30) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'auto'
            /* you can also use 'auto' behaviour 
                in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <button onClick={scrollToTop}>
            {/* // style={{ display: visible ? 'block' : 'none' }} > */}
dsadasdjhklhjkljhl
        </button>
    );
}

export default ScrollbarsButton; 
