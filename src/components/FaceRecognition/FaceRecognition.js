import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = (props) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                    <img alt='' id='inputimage'
                    src={props.imageUrl}
                    width='500px'
                    height='auto'
                    ></img> 
                    <div className='bounding-box' style={
                    {
                        top: props.box.toprow,
                        right: props.box.rightcol,
                        bottom: props.box.bottomrow,
                        left: props.box.leftcol
                    }
                    }>
                </div>
            </div>
        </div> 
    )
};

export default FaceRecognition;