import "./App";
import "./App.css";
import "./Feed.css"
import "./PostAndComments.css";

const Post = ({ sub, author, time, title, body, upvotes }) => {

   return (
      <div className="content">
         <p>{sub}</p>
         <p>{author}</p>
         <p>{time}</p>
         <p className="title">{title}</p>
         <p className="postBody">{body}</p>
         <p>{upvotes}</p>
      </div>
   );
};

export default Post;