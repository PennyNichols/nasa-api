import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import React, { useContext } from 'react'
import { ImageContext } from '../../context/ImageContext'

const RoverSelect = () => {
    const {handleRover, roverName} = useContext(ImageContext)

  return (
    <ToggleButtonGroup
    value={roverName}
    exclusive
    onChange={handleRover}
    aria-label="Mars Rover Selection"
  >
    <ToggleButton value="curiosity" aria-label="curiosity">
      Curiosity
    </ToggleButton>
    <ToggleButton value="opportunity" aria-label="opportunity">
      Opportunity
    </ToggleButton>
    <ToggleButton value="spirit" aria-label="spirit">
      Spirit
    </ToggleButton>
  </ToggleButtonGroup>
  )
}

export default RoverSelect