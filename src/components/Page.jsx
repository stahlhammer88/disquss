import React from 'react';

const Page = ({index, selectedPage, handleClick}) => {    
    return (
        <div className={`pagination__page ${index === selectedPage ? 'selected' : ''}`} onClick={() => handleClick(index)}>
            {index}
        </div>
    );
};

export default Page;