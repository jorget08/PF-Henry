import React from "react";

export default function Itemscheckout({ title, img, author, price, cant }) {
  return (
    <>
      <div className="itemContainer">
        <div className="itemBook">
          <img src={img} alt={title} />
          <div>
            <h4>{title}</h4>
            <p>{author}</p>
            <p>Quantity:{cant}</p>
            <p>Price:{price/cant}</p>
          </div>
        </div>
        <div className="prices">
          <p>${price}, 00</p>
        </div>
      </div>
    </>
  );
}
