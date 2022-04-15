import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Map from "../components/Map";
import '../styles/components/Success.css';

function Success() {
  const { state } = useContext(AppContext);
  const { buyer } = state;
  return (
    <div className="Success">
      <div className="Success-content">
        <h2>{`${buyer.name},Gracias por tu compra`}</h2>
        <div className="Success-map">
          <span>Tu pedido lelgara en 3 dias a tu direccion:</span>
          <Map/>
        </div>
      </div>
    </div>
  );
}
export default Success;
