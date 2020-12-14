import "./App";

const Filters = ({ sort, activeBtn, onChange }) => {
   const handleClick = (event, name) => {
      event.preventDefault();

      onChange(event.target.value, name);
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
         <button className="cardBtn">Card</button>
         <div className="dropDown">
            <button>Card</button>
            <button>Classic</button>
            <button>Compact</button>
         </div>
      </div>
   );
};

export default Filters;