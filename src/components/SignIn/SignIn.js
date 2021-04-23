import React from 'react';

class SignIn extends React.Component {
    
    constructor(props) {
        super(props);
       // console.log("SignIn constructor", props)
        this.state={
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange=(event) =>{
        this.setState({signInPassword: event.target.value})
    }

    onSignInSubmit() {
       // console.log("SignIn submit")
        fetch("https://quiet-dawn-04874.herokuapp.com/signin",{
            method: 'post',
            headers: {'Content-Type' :'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => 
            {
            return response.json();
            }
        )
        .then(user => {
            if(user.id) {
                //console.log("User is",user);
                //console.log(this.props)
                this.props.loadUser(user);
                this.props.onRouteChange('Home');
                //console.log("Sign In Routechange outxxx"); 
            }
            else {
                //console.log('else')
                this.props.onRouteChange('SignIn');
            }
        })
        //console.log("Sign In Routechane out"); 
    }

    onRegisterSubmit() {
        this.props.onRouteChange('Register');
    }
    
    render() {
        //console.log("SignIn render")
    return (
        <article className="br3 dark-gray b--black-10 ba mv4 w-100 w-50-m w-25-l mw6 center">
            <main className="pa4 black-80" >
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={this.onEmailChange}
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={this.onPasswordChange}
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" name="password"  id="password" />
                    </div>
                    </fieldset>
                    <div className="">
                    <input 
                    onClick={() => this.onSignInSubmit()}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                    <input 
                    onClick={() => this.onRegisterSubmit()}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" value="Register" />
                    </div>
                </div>
            </main>
        </article>
    )
    }
}

export default SignIn;