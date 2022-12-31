import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import React, { cloneElement, useContext } from "react";
import { ImageContext } from "../../context/ImageContext";

const SavedList = () => {
	const { savedSearches, handleDelete, handleSavedClick } =
		useContext(ImageContext);
	const generateList = (element) => {
		return savedSearches.map((index, item) =>
			cloneElement(element, {
				key: index,
			})
		);
	};
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
								onClick={(e, id) => handleDelete(e, id)}
							>
								<DeleteIcon />
							</IconButton>
					}
				>
					<ListItemText
						onClick={(e) => handleSavedClick(e)}
						style={{ color: "#ffa6009e", cursor: 'pointer', zIndex:'1000' }}
						primary={`${search.rover.toUpperCase()} - ${
							search.dateType === "earth_date"
								? `EARTH:  ${search.date.slice(11)}`
								: `SOL: ${search.date.slice(4)}`
						} ${search.camera !== null ? ` - CAMERA: ${search.camera}` : ""} `}
					/>
				</ListItem>
			))}
		</List>
	);
};

export default SavedList;
