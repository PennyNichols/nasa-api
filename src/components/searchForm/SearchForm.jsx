import React, { useContext } from 'react'
import {Container} from '@mui/material'
import { ImageContext } from '../../context/ImageContext'
import RoverSelect from './RoverSelect'
import DateSelect from './date/DateSelect'

const SearchForm = () => {

  return (
    <Container className='form-container' maxWidth='sm' >
        <RoverSelect/>
        <DateSelect/>
    </Container>
  )
}

export default SearchForm