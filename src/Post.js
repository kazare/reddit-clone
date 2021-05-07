import "./App";
import "./App.css";
import "./Feed.css"
import "./PostAndComments.css";
import { decodeHtml, abbrScore } from "./Handlers";
import ReactTimeAgo from 'react-time-ago';

const Post = ({ sub, author, time, title, flair, flair_color, flair_text_color, awards, body, upvotes, postType, url, video, postId }) => {
   const ms = time * 1000;

   const typeOfPost = (postType) => {
      switch (postType) {
         case "link":
            return <a className="postLink" href={url}>{url}</a>;
         case "hosted:video":
            return (
               <video className="postVideo" controls src={video.reddit_video.fallback_url} >
                  <p>Sorry, your browser doesn't support embedded videos.</p>
               </video>
            );
         case "image":
            return < img className="postImg" src={url} alt="" />;
         case "rich:video":
            return (
               < div className="postVideo" dangerouslySetInnerHTML={{ __html: decodeHtml(video.oembed.html) }} />
            );
         default:
            break;
      }
   };

   return (
      <div className="postContainer">
         <div className="postScore">
            <div><ion-icon name="caret-up"></ion-icon></div>
            <div>{abbrScore(upvotes)}</div>
            <div><ion-icon name="caret-down"></ion-icon></div>
         </div>
         <div className="postContent">
            <div className="postInfo">
               <div className="subName"><a href={`https://www.reddit.com/${sub}`}>{sub}</a></div>
               <span className="seperator">&#8231;</span>
               <div className="user">Posted by <a href={`https://www.reddit.com/user/${author}`}>u/{author}</a></div>
               <span className="seperator">&#8231;</span>
               <div className="postTime"><a href={`https://www.reddit.com/r/${sub}/comments/${postId}`} target="_blank" rel="noopener"><ReactTimeAgo date={ms} locale="en-US" /></a></div>
            </div>

            <div className="awards">
               {awards.map((award, index) => {
                  return (
                     <span className="award">
                        <img src={award.icon_url} alt={award.name} /> x{award.count}
                     </span>
                  );
               })}
            </div>

            <div className="titleRow">
               <h3 className="postTitle">{title}</h3>
               {flair ? <div className={`${flair_text_color} flairLabel`} style={{ backgroundColor: flair_color }} dangerouslySetInnerHTML={{ __html: flair }} /> : null}
            </div>

            <div className="body" dangerouslySetInnerHTML={{ __html: decodeHtml(body) }}></div>
            <div className="body">{typeOfPost(postType)}</div>
         </div>
      </div>
   );
};

export default Post;