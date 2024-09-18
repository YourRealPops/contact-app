import React from 'react';
import { useNavigate } from 'react-router-dom'
import './styles.scss';

const Button = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/contact");
    };
    return (
<>
<button className="contact-btn" onClick={handleNavigation}>Go to Contacts</button>
</>
    )
}


export default Button;