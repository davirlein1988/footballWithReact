import React, { Component } from 'react'
import AdminLayout from '../../../Hoc/AdminLayout';

import FormFields from '../../ui/formFields';
import { validate} from '../../ui/misc';

import { firebaseTeams, firebaseDB, firebaseMatches } from '../../../firebase';
import {firebaseLooper} from '../../ui/misc';

export default class AddEditMatch extends Component {
    state = {
        matchId:'',
        formType:'',
        formError: false,
        formSuccess: '',
        teams:[],
        formdata:{
            date:{
                element: 'input',
                value: '',
                config: {
                    label: 'Event date',
                    name: 'date_input',
                    type: 'date'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            local:{
                element: 'select',
                value: '',
                config: {
                    label: 'Select a team from the list',
                    name: 'select_local',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: false
            },
            resultLocal:{
                element: 'input',
                value: '',
                config: {
                    label: 'Result Local',
                    name: 'result_local_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: false
            },
            away:{
                element: 'select',
                value: '',
                config: {
                    label: 'Select a team from the list',
                    name: 'select_away',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: false
            },
            resultAway:{
                element: 'input',
                value: '',
                config: {
                    label: 'Result Away',
                    name: 'result_away_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: false
            },
            referee:{
                element: 'input',
                value: '',
                config: {
                    label: 'Referee',
                    name: 'referee_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            stadium:{
                element: 'input',
                value: '',
                config: {
                    label: 'Stadium',
                    name: 'stadium_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            result:{
                element: 'select',
                value: '',
                config: {
                    label: 'Team result',
                    name: 'select_result',
                    type: 'select',
                    options: [
                        {key:'W', value: 'W'},
                        {key:'L', value: 'L'},
                        {key:'D', value: 'D'},
                        {key:'N/A', value: 'N/A'}
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            final:{
                element: 'select',
                value: '',
                config: {
                    label: 'Game Played ?',
                    name: 'select_played',
                    type: 'select',
                    options: [
                        {key:'Yes', value: 'Yes'},
                        {key:'No', value: 'No'}
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            }
        }
    }

    updateForm(element){
        const newFormdata = {...this.state.formdata}
        const newElement = {...newFormdata[element.id]}

        newElement.value = element.event.target.value;

        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
        newFormdata[element.id] = newElement;

        
        

        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    updateFields(match, teamOption, teams, type, matchId){
        const newFormdata = {
            ...this.state.formdata
        }
        for(let key in newFormdata){
            if(match){
                newFormdata[key].value = match[key];
                newFormdata[key].valid = true
            }
            if(key === 'local' || key ==='away'){
                newFormdata[key].config.options = teamOption
            }


        }
        this.setState({
            matchId,
            formType: type,
            formdata: newFormdata,
            teams
        })

    }

    componentDidMount(){
        const matchId = this.props.match.params.id;
        const getTeams = (match, type) => {
            firebaseTeams.once('value').then((snapshot)=> {
                const teams = firebaseLooper(snapshot);
                const teamOption = [];
                snapshot.forEach((childSnapshot)=>{
                    teamOption.push({
                        key: childSnapshot.val().shortName,
                        value: childSnapshot.val().shortName
                    })
                });
                this.updateFields(match, teamOption, teams, type, matchId)
            })
        }

        if(!matchId){
            getTeams(false, 'Add Match')
        } else {
            firebaseDB.ref(`matches/${matchId}`).once('value')
            .then((snapshot)=>{
                const match = snapshot.val();
                getTeams(match, 'Edit Match')
            })
        }
    }
    successForm(message){
        this.setState({
            formSuccess: message
        });
        setTimeout(()=>{
            this.setState({
                formSuccess: ''
            });
        },2000);
    }

    submitForm(event){
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;
        let data =  this.state.formdata;

        for(let key in data){
            dataToSubmit[key] = data[key].value;
            formIsValid = data[key].valid && formIsValid            
        }

        this.state.teams.forEach((team)=>{
            if(team.shortName === dataToSubmit.local){
                dataToSubmit['localThmb'] = team.thmb
            }
            if(team.shortName === dataToSubmit.away){
                dataToSubmit['awayThmb'] = team.thmb
            }
        })
        if(formIsValid){
            if(this.state.formType === 'Edit Match'){
                firebaseDB.ref(`matches/${this.state.matchId}`)
                .update(dataToSubmit).then(()=>{
                    this.successForm("Updated correctly...");
                }).catch((e)=>{
                    console.error("Something went wrong whensaving data");
                    this.setState({
                        formError: true
                    })
                })
            } else {
                firebaseMatches.push(dataToSubmit).then(()=>{
                    this.props.history.push('/admin_matches');
                }).catch((e)=>{
                    this.state({
                        formError: true
                    })
                })
            }                    
        }else {
            this.setState({
                formError: true
            })
        }
    }

  render() {
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
            <h2>
                {this.state.formType}
            </h2>
            <div>
                <form onSubmit={(event)=> this.submitForm(event)}>
                    <FormFields
                        id={'date'}
                        formdata={this.state.formdata.date}
                        change={(element)=> this.updateForm(element)}
                    />
                    <div className="select_team_layout">
                        <div className="label_inputs">Local</div>
                        <div className="wrapper">
                            <div className="left">
                                <FormFields
                                    id={'local'}
                                    formdata={this.state.formdata.local}
                                    change={(element)=> this.updateForm(element)}
                                />
                            </div>
                            <div>
                                <FormFields
                                    id={'resultLocal'}
                                    formdata={this.state.formdata.resultLocal}
                                    change={(element)=> this.updateForm(element)}
                                />
                            </div>

                        </div>
                        <div className="label_inputs">Away</div>
                        <div className="wrapper">
                            <div className="left">
                                <FormFields
                                    id={'away'}
                                    formdata={this.state.formdata.away}
                                    change={(element)=> this.updateForm(element)}
                                />
                            </div>
                            <div>
                                <FormFields
                                    id={'resultAway'}
                                    formdata={this.state.formdata.resultAway}
                                    change={(element)=> this.updateForm(element)}
                                />
                            </div>

                        </div>


                    </div>
                    <div className="split_fields">
                        <FormFields
                            id={'referee'}
                            formdata={this.state.formdata.referee}
                            change={(element)=> this.updateForm(element)}
                        />

                        <FormFields
                            id={'stadium'}
                            formdata={this.state.formdata.stadium}
                            change={(element)=> this.updateForm(element)}
                        />
                    </div>
                    <div className="split_fields">
                        <FormFields
                            id={'result'}
                            formdata={this.state.formdata.result}
                            change={(element)=> this.updateForm(element)}
                        />

                        <FormFields
                            id={'final'}
                            formdata={this.state.formdata.final}
                            change={(element)=> this.updateForm(element)}
                        />
                    </div>
                    <div className="success_label">{this.state.formSuccess}</div>
                    {this.state.formError  ? 
                        <div className="error_label">
                            Something is wrong
                        </div>
                        : ''
                    }
                    <div className="admin_submit">
                        <button onClick={(event)=> this.submitForm(event) }>
                            {this.state.formType}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </AdminLayout>
    )
  }
}
