import React from 'react'
import preval from 'preval.macro'

const BuildVersion = ({setActivePage}) => {
    return(
        <div 
            className="absolute left-0 bottom-0 w-full text-center lg:text-right text-sm opacity-50 px-5 py-1 select-none underline hover:text-blue-500"
            onClick={() => {setActivePage("changelog")}}
        >
            {`v${process.env.REACT_APP_VERSION}.${preval`module.exports = new Date().toLocaleString("en-CA").substring(0,10).replaceAll("-", ".");`}`}
        </div>
    );
}

export default BuildVersion;