import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { stock_List } from "../../../../constants";

const Stock = () => {
  const navigate = useNavigate();

  const changeRoute = (id) => {
    navigate(`/stock/${id}`);
  };

  return (
    <>
      {stock_List.map((d) => (
        <div className="box" key={d.id} onClick={() => changeRoute(d.id)}>
          das
        </div>
      ))}
    </>
  );
};

export default Stock;
