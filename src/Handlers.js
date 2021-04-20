export const decodeHtml = (html) => {
   var txt = document.createElement("div");
   txt.innerHTML = html;
   return txt.childNodes.length === 0 ? "" : txt.childNodes[0].nodeValue;
};

export const abbrScore = (num) => {
   if (num > 1000) {
      return (Math.round(num / 1000)).toString() + "k";
   } else {
      return (num).toString();
   }
};
