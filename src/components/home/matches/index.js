import React from 'react';
import {Tag} from '../../ui/misc';
import Blocks from './Blocks';

const MatchesHome = () => {
    return (
        <div className="home_matches_wrapper">
            <div className="container">
                <Tag
                bck="#0e1731"
                size="50px"
                color="#ffffff"                
                >
                Matches
                </Tag>
                <br/>
                <Blocks/>
                <br/>
                <Tag
                    bck="#0e1731"
                    size="22px"
                    color="white"
                    link={true}
                    linkto='/the_team' 
                >
                    See more matches
                </Tag>
            </div>
        </div>
    );
};

export default MatchesHome;