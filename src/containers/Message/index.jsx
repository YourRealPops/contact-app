import React from "react";
import './styles.scss';
import Header from '../../components/Header';


const Message = () => {
    return (
        <>
        <Header />
        <div className="message">
            <h1>
                Message
            </h1>
        </div>
        </>
    );
}

export default Message;