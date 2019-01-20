import React, { Component } from 'react'
import PlayerCard from '../ui/playerCard';
import Fade  from 'react-reveal/Fade';
import Stripes from '../../Resources/images/stripes.png';
import { firebasePlayers, firebase }from '../../firebase';
import { firebaseLooper } from '../ui/misc';
import { Promise } from 'core-js'


export default class TheTeam extends Component {
    state = {
        loading:true,
        players: []
    }
    

    componentDidMount(){
        firebasePlayers.once('value').then( snapshot => {
            const players = firebaseLooper(snapshot);
            console.log(players);
        })
    }
  render() {
    return (
      <div>
        The team
      </div>
    )
  }
}
