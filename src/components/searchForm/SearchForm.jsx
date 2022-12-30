import React, { useContext } from 'react'
import {Container} from '@mui/material'
import { ImageContext } from '../../context/ImageContext'
import RoverSelect from './RoverSelect'
import DateSelect from './date/DateSelect'
import CamSelect from './camera/CamSelect'
import SavedSearches from '../savedSearches/SavedSearches'

const SearchForm = () => {

  return (
    <Container className='form-container' maxWidth='sm' >
        <RoverSelect/>
        <DateSelect/>
        <CamSelect/>
        <SavedSearches/>
    </Container>
  )
}

export default SearchForm