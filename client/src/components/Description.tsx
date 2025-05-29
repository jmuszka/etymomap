import React from 'react';

interface Props {
    text: String;
}

const Description: React.FC<Props> = ({text}) => {

    return (
        <div className="my-5 text-shadow text-shadow-gray-500 text-sm 2xl:text-lg">
            {text}
        </div>
    );
}

export default Description;