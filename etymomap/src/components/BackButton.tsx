import React from 'react';
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
    setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const BackButton = ({setActivePage}: Props) => {

    const returnHome = () => {
        setActivePage("main");
    }

    return(
        <div className="absolute">
            <IconButton size="medium" color="inherit" onClick={returnHome}>
                <ArrowBackIcon />
            </IconButton>
        </div>
    );
}

export default BackButton;