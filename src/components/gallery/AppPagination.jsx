import { Pagination, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import { ImageContext } from '../../context/ImageContext';

const AppPagination = () => {
    const { setPage, page, handlePage, pageCount } = useContext(ImageContext);
    const theme = useTheme();
  return (
    <div className='pagination-container'>
        <div className='pagination-wrapper'>
            <Pagination 
                shape='rounded'
                count={pageCount}
                color='primary'
                onChange={(e) => handlePage(e)}
            />
        </div>
    </div>
  )
}

export default AppPagination