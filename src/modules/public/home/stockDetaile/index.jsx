import React, { useMemo } from "react";
import Chart from "../../../../components/Chart";
import { CommonTextField } from "../../../../components";
import { Col, Row, Space } from "antd";
import { AppStyles, Colors, Images } from "../../../../theme";
import { css } from "aphrodite";
import { array } from "prop-types";
import Suggestion from "./suggestion";
import Update from "./update";
import GraphRender from "../../../../components/Meter";
import styles from "../../../../theme/AppStyles";
import { useNavigate, useParams } from "react-router-dom";
import { HOME_ROUTE } from "../../../../constants";
import { collection, db, getDocs, query, where } from "../../../../firebase";
import { stockListManipulator } from "../../../../manipulators/stocksName";

const StockDetailes = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const getStockData = async () => {
		const collectionRef = collection(db, "stocks");
		const stockQuery = query(collectionRef, where("name_id", "==", id));
		const documents = await getDocs(stockQuery);

		const stockList = [];

		documents.forEach((doc) => {
			console.log(doc.id, " => ", doc.data());
			stockList.push(doc.data());
		});

		const manipulatedData = stockListManipulator(stockList);
	};

	useMemo(() => {
		if (id) {
			getStockData();
		} else {
			navigate(HOME_ROUTE);
		}
	}, []);

	return (
		<>
			<Row wrap={true} gutter={[0, 20]} className={css(AppStyles.spaceBetween)}>
				<Col
					lg={{ span: 16 }}
					md={{ span: 24 }}
					sm={{ span: 24 }}
					xs={{ span: 24 }}
				>
					<Update />
					<Suggestion />
				</Col>
				<Col lg={{ span: 6 }} md={{ span: 6 }}>
					<GraphRender />
				</Col>
			</Row>
			<Chart />
		</>
	);
};

export default StockDetailes;
