import { Button, Pagination } from "@mui/material";
import React, { useContext } from "react";
import { ImageContext } from "../../context/ImageContext";

const AppPagination = () => {
	const { handlePage, pageCount, returnToTop, screenSize } = useContext(ImageContext);

	return (
		<div className="pagination-container">
			<div className="pagination-wrapper">
				{screenSize > 550 ? (
					<Pagination
						shape="rounded"
						count={pageCount}
						color="primary"
						onChange={(e) => handlePage(e)}
					/>
				) : (
					<Button style={{ color: "black", width: '100%' }} onClick={returnToTop}>
						Return To Top
					</Button>
				)}
			</div>
		</div>
	);
};

export default AppPagination;
