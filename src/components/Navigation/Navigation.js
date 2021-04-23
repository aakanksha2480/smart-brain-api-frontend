import React from 'react';

const Navigation = (props) => {
    //console.log("Nvigation", props.isSignedIn)
    if(props.isSignedIn)
    {
    return (
       <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
           <p className='f3 dim black underline pa3 pointer' onClick={() => props.onRouteChange('SignOut')}>Sign out</p>
       </nav> 
    )
    }
    else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p className='f3 dim black underline pa3 pointer' onClick={() => props.onRouteChange('SignIn')}>Sign In</p>
                <p className='f3 dim black underline pa3 pointer' onClick={() => props.onRouteChange('Register')}>Register</p>
            </nav> 
         )
    }
};

export default Navigation;