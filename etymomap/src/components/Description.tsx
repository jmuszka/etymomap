import React from 'react';
import '../index.css'

interface Props {
    text: String;
}

const Description: React.FC<Props> = ({text}) => {

    return (
        <>
            <p className="description">{text}</p>
        </>
    );
}

export default Description;