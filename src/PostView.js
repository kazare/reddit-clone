import React, { useState } from "react";
import "./App";
import "./Filters.css";

const PostView = ({ onChange, view }) => {
   const [active, setActive] = useState(false);

   const handleSortClick = (event, name) => {
      event.preventDefault();

      onChange(event.target.value, name);
   };

   const DropDown = () => {
      return (
         <div className="dropDown">

            <button
               value="card"
               onClick={(e) => { handleSortClick(e) }}>Card</button>

            <button
               value="classic"
               onClick={(e) => { handleSortClick(e) }}>Classic</button>

            <button
               value="compact"
               onClick={(e) => { handleSortClick(e) }}>Compact</button>


         </div>
      );
   };

   return (
      <div className='cardDiv'>
         <button className="cardBtn" onClick={(e) => { !active ? setActive(true) : setActive(false) }} >{view}</button>
         {active ? <DropDown /> : null}
      </div>
   );


}

export default PostView;