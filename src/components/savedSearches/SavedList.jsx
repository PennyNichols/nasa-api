import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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
					id={index}
					key={id}
					color="primary"
					secondaryAction={
						<IconButton
							color="primary"
							edge="end"
							aria-label="delete"
							onClick={(event) => handleDelete(event)}
						>
							<DeleteIcon />
						</IconButton>
					}
				>
					<ListItemText
						onClick={(event) => handleSavedClick(event)}
						style={{ color: "#ffa6009e" }}
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
