import React, { Component } from 'react'

import { firebase } from '../../firebase';
import FormFields from '../ui/formFields';
import { validate } from '../ui/misc';


export default class SignIn extends Component {
    state = {
        formError: false,
        formSuccess:'',
        formdata:{
            email:{
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: "Enter your email"
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            },
            password:{
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: "Enter your password"
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: ''
            }
        }
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
        if(formIsValid){
              firebase.auth().signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)              
              .then(()=> {
                this.props.history.push('/dashboard')
              }).catch(error => {
                  this.setState({
                      formError: true
                  })
              })                            
        }else {
            this.setState({
                formError: true
            })
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


  render() {
    return (
      <div className="container">
        <div className="signin_wrapper" style={{margin: '100px'}}>
            <form onSubmit={(event) => this.submitForm(event)}>
                <h2>Please login</h2>

                <FormFields
                    id={'email'}
                    formdata={this.state.formdata.email}
                    change={(element)=> this.updateForm(element)}
                />
                <FormFields
                    id={'password'}
                    formdata={this.state.formdata.password}
                    change={(element)=> this.updateForm(element)}
                />
                { this.state.formError ? <div className="error_label">Somethin went wrong while submitting the form, try again...</div>
                    :null 
                }
                <button onClick={(event)=> this.submitForm(event)}>Log in</button>
                
            </form>
        </div>
      </div>
    )
  }
}
