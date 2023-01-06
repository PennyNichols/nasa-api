import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useContext } from 'react';
import { ImageContext } from '../../context/ImageContext';

const SavedList = () => {
  const { savedSearches, handleDelete, handleSavedClick } =
    useContext(ImageContext);
  return (
    <List>
      {savedSearches.map((search, id, index) => (
        <ListItem
          key={id}
          id={id}
          color="primary"
          secondaryAction={
            <IconButton
              color="primary"
              edge="end"
              aria-label="delete"
              onClick={(event, id) => handleDelete(event, id)}
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText
            onClick={(event) => handleSavedClick(event)}
            style={{ color: '#ffa6009e', cursor: 'pointer' }}
            primary={`${search.rover.toUpperCase()} - ${
              search.date
              // search.dateType === "earth_date"
              // 	? `EARTH:  ${search.date.slice(11)}`
              // 	: `SOL: ${search.date.slice(4)}`
            } 
						${
              search.camera !== null
                ? ` - CAMERA: ${
                    search.camera === undefined || search.camera === '' ? 'ALL' : search.camera
                  }`
                : ''
            } `}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default SavedList;