import "./App";
import "./App.css";
import "./Feed.css"
import "./PostAndComments.css";


const Comment = ({ author, time, body, upvotes }) => {

   return (
      <div className="comment">
         <p className="author">{author}</p>
         <p>{time}</p>
         <p className="commentBody">{body}</p>
         <p>{upvotes}</p>
      </div>
   );
};

export default Comment