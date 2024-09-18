import React from 'react';
import Header from '../../components/Header';
import Button from '../Button'; 
import './styles.scss';

const Home = () => {

   

    return (
        <>
        <Header />
        <div className="home">
        <h1>Home</h1>
        <Button />
        </div>

           
        </>
    )
}

export default Home;