import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import React, { useContext } from 'react'
import { ImageContext } from '../../context/ImageContext'
import EarthInput from './EarthInput'
import SolInput from './SolInput'

const DateSelect = () => {
    const {handleDate, dateType, date, sol} = useContext(ImageContext)
    return (
        <>
            <ToggleButtonGroup
            value={dateType}
            exclusive
            onChange={handleDate}
            aria-label="Mars Rover Selection"
            >
                <ToggleButton value="earth_date" aria-label="earth date">
                Earth Date
                </ToggleButton>
                <ToggleButton value="sol" aria-label="sol">
                Sol
                </ToggleButton>
            </ToggleButtonGroup>
            {
                (dateType==='earth_date') ? <EarthInput/> : <SolInput/>
            }
        </>
      )
    }

export default DateSelect