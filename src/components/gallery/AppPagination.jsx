import { Box, Button, Pagination } from "@mui/material";
import React, { useContext } from "react";
import { ImageContext } from "../../context/ImageContext";

const AppPagination = () => {
	const { handlePage, pagination, returnToTop, screenSize, activePage } =
		useContext(ImageContext);

	return (
		<Box className="pagination-container">
			<Box className="pagination-wrapper">
				{screenSize > 550 ? (
					<Pagination
						shape="rounded"
						count={pagination.count}
						color="primary"
						onChange={(event, page) => handlePage(event, page)}
						page={activePage}
					/>
				) : (
					<Button
						style={{ color: "black", width: "100%" }}
						onClick={returnToTop}
					>
						Return To Top
					</Button>
				)}
			</Box>
		</Box>
	);
};

export default AppPagination;
