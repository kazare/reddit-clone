import React, { useState } from "react";
import "./App";
import "./Filters.css";

const Sort = ({ sort, activeBtn, onChange }) => {
   const [active, setActive] = useState(false);

   const handleSortClick = (event, name) => {
      event.preventDefault();

      onChange(event.target.value, name);
   };

   return (
      <div className="sort">
         <button
            value="hot"
            className={`filtrBtn ${activeBtn === 'hot' && 'active'}`}
            onClick={(e) => { handleSortClick(e, 'hot') }}>
            HOT
         </button>

         <button
            value="new"
            className={`filtrBtn ${activeBtn === 'new' && 'active'}`}
            onClick={(e) => { handleSortClick(e, 'new') }}>
            NEW
         </button>

         <button
            value="top"
            className={`filtrBtn ${activeBtn === 'top' && 'active'}`}
            onClick={(e) => { handleSortClick(e, 'top') }}>
            TOP
         </button>

      </div>
   );
};

export default Sort;