import { useEffect, useState } from "react";
import { getCountries } from "../service/CountryService";

export function useCountries(){
    const [countries,setCountries] = useState([]);
    useEffect(()=>{
        let isCountriesLoaded = false
        if(!isCountriesLoaded)
        getCountries()
        .then(setCountries)
        .catch(console.error)
        return (()=>{
            isCountriesLoaded = true
        })
    },[]);
    return countries;
}