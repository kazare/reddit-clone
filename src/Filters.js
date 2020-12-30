import React, { useState } from "react";
import "./App";
import "./Filters.css";

const Filters = ({ sort, activeBtn, onChange }) => {
   const [active, setActive] = useState(false);

   const handleClick = (event, name) => {
      event.preventDefault();

      onChange(event.target.value, name);
   };

   const DropDown = () => {
      return (
         <div className="dropDown">


            <button>Card</button>
            <button>Classic</button>
            <button>Compact</button>


         </div>
      );
   };

   const DD2 = () => {
      return (
         <div className="customS">
            <select >
               <option value="1">Card</option>
               <option value="2">Classic</option>
               <option value="3">Compact</option>
            </select>
         </div>
      );
   };

   return (
      <div className="filters">
         <button
            value="hot"
            className={`filtrBtn ${activeBtn === 'hot' && 'active'}`}
            onClick={(e) => { handleClick(e, 'hot') }}>
            HOT
               </button>
         <button
            value="new"
            className={`filtrBtn ${activeBtn === 'new' && 'active'}`}
            onClick={(e) => { handleClick(e, 'new') }}>
            NEW
               </button>
         <button
            value="top"
            className={`filtrBtn ${activeBtn === 'top' && 'active'}`}
            onClick={(e) => { handleClick(e, 'top') }}>
            TOP
               </button>


         <button className="cardBtn" onClick={(e) => { !active ? setActive(true) : setActive(false) }} >Card</button>
         {!active ? <DropDown /> : null}

         <DD2 />
      </div>
   );
};

export default Filters;