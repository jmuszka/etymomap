import React, {useContext, useEffect} from 'react';
import { ctx } from './GlobeBackgroundProvider';


function UserInput() {
    const { currentCountryName, setCurrentCountryName } = useContext(ctx);
    
    useEffect(() => {
        setCurrentCountryName("Portugal");
    }, [setCurrentCountryName]);

    // const setFocusCountry = (countryName) => {
    //     setCurrentCountryName(countryName);
    // }

    //return(<form type="text" ><input type="text"></input> <button onClick={setFocusCountry()}>Change country</button></form>)
    return(<></>)
}

export default UserInput;