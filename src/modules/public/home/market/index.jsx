import React, { useEffect, useState } from "react";

import { Tabs } from "antd";

import CommonTextField from "../../../../components/common/TextField";
import StockListing from "./stockListing";
import {
	CommonButton,
	CommonModal,
	CommonInputField,
	CommonHeading,
	Loader,
} from "../../../../components";
import { css } from "aphrodite";
import { AppStyles } from "../../../../theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { stocksNameManipulator } from "../../../../manipulators/stocksName";
import { useDispatch } from "react-redux";
import { setStocksListAction } from "../../../../redux/slicers/stocks";

const items = [
	{
		key: "1",
		label: `All`,
		children: <StockListing />,
	},
	{
		key: "2",
		label: `Stocks`,
		children: <StockListing test="Stock" />,
	},
	{
		key: "3",
		label: `Crypto`,
		children: <StockListing test="Cryptocurrency" />,
	},
	{
		key: "4",
		label: `Favorites`,
		children: <StockListing />,
	},
];

const Market = ({ isLoading }) => {
	const dispatch = useDispatch();
	const [isModal, setIsModal] = useState(false);

	const [currentKey, setCurrentKey] = useState(items?.[0]);

	// change tab handler
	const onChange = (key) => {
		console.log(key);

		const findItem = items.find((item) => item.key === key);

		if (findItem) setCurrentKey(findItem);
	};

	// if fetch stocks name from firebase is in progress
	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<CommonTextField text={"Market"} />
			<Tabs activeKey={currentKey?.key} items={items} onChange={onChange} />
			<CommonButton
				text={"Add Stock"}
				background="rgba(118, 101, 193, 0.1)"
				onClick={() => setIsModal(true)}
			/>
			<CommonModal
				width={"40%"}
				title={
					<CommonHeading
						text={"Add Stock"}
						textAlign="center"
						className={css(AppStyles.mBottom10)}
					/>
				}
				isModalVisible={isModal}
				setIsModalVisible={setIsModal}
			>
				<CommonInputField
					placeholder="Search..."
					suffix={<FontAwesomeIcon icon={faSearch} />}
				/>
				<div className={css(AppStyles.padding10)}>
					<StockListing addIcon={true} />
				</div>
			</CommonModal>
		</>
	);
};

export default Market;
