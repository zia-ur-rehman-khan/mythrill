import React, { useEffect, useMemo, useState } from "react";
import "./styles.scss";
import { Grid } from "antd";
import Market from "./market";
import { useParams, useLocation } from "react-router-dom";
import Stock from "./stock";
import StockDetailes from "./stockDetaile";
import Trending from "./trending";
import { HOME_ROUTE, TRENDING_ROUTE } from "../../../constants";
import { collection, db, getDocs, query, where } from "../../../firebase";
import { useDispatch } from "react-redux";
import { stocksNameManipulator } from "../../../manipulators/stocksName";
import { setStocksListAction } from "../../../redux/slicers/stocks";

const { useBreakpoint } = Grid;

const Home = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const location = useLocation();
	const { pathname } = location;
	const screens = useBreakpoint();

	const [isLoading, setIsLoading] = useState(true);

	const getContentByPathname = useMemo(() => {
		if (pathname.startsWith("/stock/")) {
			return <StockDetailes id={id} />;
		} else if (pathname === HOME_ROUTE) {
			return <Stock id={id} />;
		} else if (pathname === TRENDING_ROUTE) {
			return <Trending id={id} />;
		}
	}, [id, pathname]);

	useEffect(() => {
		getStockList();
	}, []);

	const getStockList = async () => {
		const stockListCollectionRef = collection(db, "stocks-name");
		const stocksListQuery = query(
			stockListCollectionRef,
			where("name_id", "==", "ethereum")
		);
		const stocksListDoc = await getDocs(stocksListQuery);

		const stocksList = [];

		stocksListDoc?.forEach((doc) => {
			console.log(doc.id, " => ", doc.data());
			stocksList.push(doc.data());
		});

		dispatch(setStocksListAction(stocksNameManipulator(stocksList)));
		setIsLoading(false);
	};

	return (
		<>
			{!screens.lg ? (
				<div className="mobile-view">
					<div className="left-side">
						<Market isLoading={isLoading} />
					</div>
					<div className="right-side">{getContentByPathname}</div>
				</div>
			) : (
				<div className="main-home">
					<div className="left-side">
						<Market isLoading={isLoading} />
					</div>
					<div className="right-side">{getContentByPathname}</div>
				</div>
			)}
		</>
	);
};

export default Home;
