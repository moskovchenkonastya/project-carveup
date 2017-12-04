import React, { Component } from 'react';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            phone: '',
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            username: event.target.username,
            phone: event.target.phone,

        });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.username);
        event.preventDefault();
    }

   

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                 <div>
                    <label>
                    Name:
                    <input type="text" username={this.state.username} onChange={this.handleChange} />
                    </label>
                </div> 
                <div>   
                    <label>
                    Phone:
                    <input type="text" phone={this.state.phone} onChange={this.handleChange} />
                    </label>
            </div>
            <input type="submit" value="Submit" />
          </form>
        )
    }
}        

export default LoginPage;