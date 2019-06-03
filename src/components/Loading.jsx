import React from 'react';
import { Fade } from 'react-reveal';

const Loading = ({size, height}) => {
    const styles = {
        width: size,
        height: size
    }
    return (
        <Fade duration={200}>
            <div className="loading" style={{minHeight: height}}>
                <div className="loading__container">
                    <div style={{...styles}} className="loading__contents"></div>
                    <div style={{...styles}} className="loading__contents"></div>
                </div>            
            </div>
        </Fade>
    );
};

export default Loading;