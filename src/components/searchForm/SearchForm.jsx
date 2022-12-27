import React, { useContext } from 'react'
import {Container} from '@mui/material'
import { ImageContext } from '../../context/ImageContext'
import RoverSelect from './RoverSelect'
import DateSelect from './DateSelect'

const SearchForm = () => {

  return (
    <Container className='container' maxWidth='sm' >
        <RoverSelect/>
        <DateSelect/>
    </Container>
  )
}

export default SearchForm