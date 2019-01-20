import React from 'react';
import Featured from './featured/index';
import Matches from './matches';
import Players from './players/index';
import Promotion from './promotions/index';

const Home = () => {
    return (
        <div className="bck_blue">
            <Featured/>
            <Matches/>
            <Players/>
            <Promotion/>

        </div>
    );
};

export default Home;