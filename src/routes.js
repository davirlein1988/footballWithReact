import React from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';


import PrivateRoute from './components/authRoutes/PrivateRoutes';
import PublicRoute from './components/authRoutes/PublicRoutes';
//Public routes
import Home from './components/home/index';
import SignIn from './components/signin/index';
import TheTeam from './components/theTeam/index';
import TheMatches from './components/theMatches/index';
import NotFound from './components/ui/not_found';


//Admin routes
import Dashboard from './components/admin/Dashboard';
import AdminMatches from './components/admin/matches';
import AddEditMatch from './components/admin/matches/addEditMatch';
import AdminPlayers from './components/admin/players';
import addEditPlayers from './components/admin/players/addEditPlayers';




const Routes = (props) => {
  console.log(props)
  return (
    <Layout>
      <Switch>

          <PrivateRoute {...props} path="/dashboard" exact component={Dashboard} />
          <PrivateRoute {...props} path="/admin_players" exact component={AdminPlayers}/>
          <PrivateRoute {...props} path="/admin_players/add_edit_player/:id" exact component={addEditPlayers}
          />
          <PrivateRoute {...props} path="/admin_players/add_edit_player" exact component={addEditPlayers}
          />
          <PrivateRoute {...props} path="/admin_matches" exact component={AdminMatches}/>
          <PrivateRoute {...props} path="/admin_matches/edit_match/:id" exact component={AddEditMatch}
          />
          <PrivateRoute {...props} path="/admin_matches/edit_match" exact component={AddEditMatch}
          />
          <PublicRoute {...props} restricted={true} path="/sign_in" exact component={SignIn} />
          <PublicRoute {...props} restricted={false} path="/the_team" exact component={TheTeam} />
          <PublicRoute {...props} restricted={false} path="/the_matches" exact component={TheMatches} />
          <PublicRoute {...props} restricted={false} path="/" exact component={Home} />
          <PublicRoute {...props} restricted={true}   component={NotFound} />
      </Switch>  
    </Layout>
  )
}

export default Routes;
