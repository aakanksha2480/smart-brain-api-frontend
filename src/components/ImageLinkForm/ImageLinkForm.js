import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = (props) => {
    return (
        <div>
            <p className='f3'>
                {'This brain will detect faces in your picture. Give it a try!'}
            </p>
            <div className='center'>
                <div className=' center form pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex' placeholder='enter image url'
                    onChange={props.onInputChange}></input>
                    <button 
                    className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                    onClick={props.onButtonSubmit}>
                        Detect
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ImageLinkForm;