import React from "react";

const Grid = (props) => {
  return (
    <div className="container">
      {props.rows.map((cols, i) => {
        return (
          <div className="row" key={i}>
            <div className="col-sm">{cols[0]}</div>
            <div className="col-sm">{cols[1]}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
