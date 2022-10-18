import React, { useState } from 'react'
import { useLoadScript} from '@react-google-maps/api'
import { Map } from "./Map";
import './styles.css'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from '@reach/combobox';


export const MapComponent = () => {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY_MAPS,
        libraries: ["places"],
    })
    const [selected,setSelected] = useState(null)
 if(!isLoaded)return<h1>Loading...</h1>
  return (
      <>
      <PlacesAutocomplete setSelected={setSelected}/>
      { selected && <Map positionMarker={selected}/>}
      </>
  )
}

const PlacesAutocomplete = ({setSelected}) =>{
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
      } = usePlacesAutocomplete();

    const handleSelect = async(address) =>{
        setValue(address, false)
        clearSuggestions()

        const results = await getGeocode({address})
        const {lat,lng} = await getLatLng(results[0])
        setSelected({lat,lng})

        console.log(address,results)
    }
    
    return(
        <Combobox onSelect={handleSelect}>
            <ComboboxInput
                value={value}
                onChange={(e)=>handleSelect(e.target.value)}
                disabled={!ready}
                className="combobox-input"
                placeholder='Search an address'
            />
            <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
        </Combobox>
    )
}

