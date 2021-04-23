import React,{Component} from 'react';

import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';



import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const particlesOptions={
  particles: {
    number: {
      value: 2000,
      density: {
        enable: true,
        value_area: 1000,
      }
    }   
  }
 
};




const initialState={
  input: '',
  imageUrl: '',
  box: {},
  route: 'SignIn',
  isSignedIn: false,
  user : {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}


class App extends Component {
  constructor(){
    super();
    this.state=initialState;
  }

  // componentDidMount() {
  //   fetch("http://localhost:3000")
  //   .then(response => response.json())
  //   .then(data => console.log(data));
  // }


  async setImageUrl(input){
    console.log("Async function")
    await this.setState({imageUrl:input});
    console.log("Aynch function url",this.state.imageUrl)
    //return this.state.imageUrl;
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

  onButtonSubmit = (event) => {
    //console.log(event.target.value);
    console.log("Detect input before",this.state.input)
    this.setImageUrl(this.state.input);
    //this.setState({imageUrl:this.state.input});
    console.log("Detect input",this.state.input)
    console.log("Detect url",this.state.imageUrl)
    fetch('https://quiet-dawn-04874.herokuapp.com/imageurl',{
          method: 'post',
          headers: {'Content-Type' :'application/json'},
          body: JSON.stringify({
              input: this.state.input
          })
        })
    .then(response => response.json())
    .then(response => {
      console.log("Response from server api call",response)
      if(response)
      {
        fetch('https://quiet-dawn-04874.herokuapp.com/image',{
          method: 'put',
          headers: {'Content-Type' :'application/json'},
          body: JSON.stringify({
              id: this.state.user.id
          })
        })
        .then(response => {
          console.log("Detect", response)
          return response.json()
        })
        .then(user => {
              console.log("User Detect",user)
              this.setState(Object.assign(this.state.user, { entries: user}))  
            }
            )
            .catch(console.log)
        this.displayFaceBox(this.calculateFacelocation(response))
      }
      }).catch(err => console.log("Oops",err));
    
  }

  calculateFacelocation = (data) => {
      const face=data.outputs[0].data.regions[0].region_info.bounding_box;
      const img=document.getElementById('inputimage');
      const width=img.width;
      const height=img.height;
      return {
        leftcol: width*face.left_col,
        rightcol: width - (width*face.right_col),
        toprow: height*face.top_row,
        bottomrow: height - (height*face.bottom_row)

      }
    
  }

  displayFaceBox = (box) => {
    console.log("Display funcion box",box);
    this.setState({box: box});
  }

  onRouteChange= (route) => {
    //console.log("Routechange", route);
    if(route === 'SignOut') {
      this.setState({isSignedIn: false})
      this.setState(initialState);
      this.renderSwitch(route);
      // console.log("Routechange", this.state.user);
      // console.log("Initial", initialState.user);
    } 
    else if (route === 'Home') {
    this.setState({isSignedIn: true})
    }
    else if (route === 'SignIn') {
      this.setState({isSignedIn: true})
      }
    this.setState({route: route})
  }

  loadUser = (data) => {
    //console.log("Load User",data);
    this.setState({ user: {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
       }
      }
    );
    //console.log("Load user out")
  }

  renderSwitch = (route) => {
    //console.log('Render switch - Route:', route)
    switch(this.state.route) {
      case 'SignIn':
       return <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
      case 'Home':
       return (  
            <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm 
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            </div> 
            )
      case 'Register':
       return <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
      default: return <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
    }
  }

 

  render(){
    //console.log("App render");
      return (
        <div className="App">
          <Particles className='particles'
                    params={{particlesOptions}} />
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
          {this.renderSwitch(this.state.route)}
        </div>
      );
          }
}

export default App;
