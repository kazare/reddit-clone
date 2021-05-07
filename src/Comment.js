import "./App";
import "./App.css";
import "./Feed.css"
import "./PostAndComments.css";
import { decodeHtml, abbrScore } from "./Handlers";
import ReactTimeAgo from 'react-time-ago';

const Comment = ({ type, author, time, body, upvotes }) => {
   const ms = time * 1000;

   if (type === "more") {
      return null;
   } else {


      return (
         <div className="comment">
            <div className="postInfo">
               <div className="user"><a href={`https://www.reddit.com/user/${author}`}>u/{author}</a></div>
               <span className="seperator">&#8231;</span>
               <div className="postTime"><ReactTimeAgo date={ms} locale="en-US" /></div>
            </div>

            <div className="commentBody" dangerouslySetInnerHTML={{ __html: decodeHtml(body) }}></div>

            <div className="commentScore">
               <span><ion-icon name="caret-up"></ion-icon></span>
               <span>{abbrScore(upvotes)}</span>
               <span><ion-icon name="caret-down"></ion-icon></span>

            </div>
         </div>
      );
   }
};

export default Comment