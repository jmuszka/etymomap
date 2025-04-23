import React from 'react';
import IconButton from '@mui/material/Button';
import { FaArrowLeft } from "react-icons/fa";

interface Props {
    setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const BackButton = ({setActivePage}: Props) => {

    return(
        <>
            <IconButton 
                size="large" 
                color="secondary" 
                style={{position: "absolute", top:"1vh", left:"1vh"}}
                onClick={() => {setActivePage("main")}}
            >
                <FaArrowLeft />
            </IconButton>
        </>
    );
}

export default BackButton;