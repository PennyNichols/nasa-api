import { Button, Pagination } from "@mui/material";
import React, { useContext } from "react";
import { ImageContext } from "../../context/ImageContext";

const AppPagination = () => {
	const { handlePage, pagination, returnToTop, screenSize } = useContext(ImageContext);

	return (
		<div className="pagination-container">
			<div className="pagination-wrapper">
				{screenSize > 550 ? (
					<Pagination
						shape="rounded"
						count={pagination.count}
						color="primary"
						onChange={(event,page) => handlePage(event,page)}
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
