import React, { useEffect, useState } from "react";
import "./App.css";
import Feedback from "./Feedback";
import Feed from "./Feed";
import Sort from "./Sort";
import PostView from "./PostView";
import Post from "./Post";
import Comment from "./Comment";

const App = () => {
   const [token, setToken] = useState('');
   const [posts, setPosts] = useState([]);
   const [feedReady, setFeedReady] = useState(false);
   const [sort, setSort] = useState('hot');
   const [message, setMessage] = useState('Loading . . .');
   const [activeBtn, setActiveBtn] = useState(sort);
   const [post, setPost] = useState([]);
   const [postReady, setPostReady] = useState(false);
   const [comments, setComments] = useState([]);
   const [view, setView] = useState('card');


   const sub = 'r/Parenting';
   const subPosts = `${sub}/${sort}/`;
   const home = `${sort}`;
   const onePost = "/r/Parenting/comments/ko13m9/";

   const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
   const params = new URLSearchParams();
   params.append('grant_type', 'https://oauth.reddit.com/grants/installed_client');
   params.append('device_id', 'DO_NOT_TRACK_THIS_DEVICE');

   const tokenData = async () => {
      let response;

      await fetch('https://www.reddit.com/api/v1/access_token', {
         method: 'POST',
         headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:`).toString('base64')}`
         },
         body: params
      })
         .then(resp => resp.json())
         .then((respData) => {
            response = respData.access_token;
            //time = respData.expires_in;

            console.log('First token: ' + response);
            setToken(response);
         })
         .catch(error => console.log("Error: ", error))
   };

   useEffect(() => {
      if (token === '') {
         console.log("The website is loaded");
         tokenData();
      }
   });

   //ORIGINAL DO NOT TOUCH
   const getFeed = async (token) => {
      await fetch(`https://oauth.reddit.com/${sort}`, {
         method: 'GET',
         headers: {
            'Authorization': `bearer ${token}`,
            'User-Agent': 'windows:com:v1 (by Kazare)'
         }
      })
         .then(d => d.json())
         .then((datas) => {
            setPosts(datas.data.children);
            setFeedReady(true);
            console.log(datas);
         })
         .catch(error => console.log("ERROR: ", error))
   };

   //grab individual post
   const getPost = async (sub, id) => {
      await fetch(`https://oauth.reddit.com/r/${sub}/comments/${id}`, {
         method: 'GET',
         headers: {
            'Authorization': `bearer ${token}`,
            'User-Agent': 'windows:com:v1 (by Kazare)'
         }
      })
         .then(d => d.json())
         .then((datas) => {
            setPost(datas[0].data.children);
            setComments(datas[1].data.children);
            setPostReady(true);
            console.log(datas);
         })
         .catch(error => console.log("ERROR: ", error))
   };

   //`https://oauth.reddit.com/r/tifu/comments/l7od85`

   useEffect(() => {
      console.log("This is the current token: " + token);
      getFeed(token);
   }, [token, sort]);

   useEffect(() => {
      console.log("Sort: " + sort);
   }, [sort]);

   useEffect(() => {
      console.log("View is now: " + view);
   }, [view]);

   const changeSort = (value, name) => {
      setSort(value);
      setActiveBtn(name);
   };

   const changeView = (value) => {
      setView(value);
   };

   const changePost = (sub, id) => {
      console.log(sub, id);
      getPost(sub, id);
   }

   const closePost = () => {
      setPostReady(false);
   }

   return (
      <div className="App" >

         {postReady ? <div className="post">
            {post.map((post, index) => {
               let p = post.data;
               return (
                  <Post
                     sub={p.subreddit}
                     author={p.author}
                     time={p.created_utc}
                     title={p.title}
                     flair={p.link_flair_text}
                     flair_color={p.link_flair_background_color}
                     flair_text_color={p.link_flair_text_color}
                     awards={p.all_awardings}
                     body={p.selftext_html}
                     upvotes={p.ups}
                     postType={p.post_hint}
                     url={p.url}
                     video={p.media}
                     postId={p.id}
                  />
               );
            })}
            <div className="commentSection">

               {comments.map((comment, index) => {
                  let c = comment.data;
                  return (
                     <Comment
                        type={comment.kind}
                        author={c.author}
                        time={c.created_utc}
                        body={c.body_html}
                        upvotes={c.ups}
                        replies={c.replies}

                     />
                  );
               })}
            </div>
         </div> : null}

         {postReady ? <div className="overlay" onClick={closePost}>
            <div className="close"><ion-icon name="close" className="icon"></ion-icon>Close</div>
         </div> : null}

         <div className="searchBar">
            <h1 className="title">readit</h1>
            <form action="input">
               <input type="text" />
            </form>
         </div>

         <div className={postReady ? `container inactive-container ${view}` : `container ${view}`}>
            <div className="filters">
               <Sort
                  activeBtn={activeBtn}
                  onChange={changeSort}
               />

               <PostView
                  onChange={changeView}
                  view={view}
               />

            </div>

            <div className='feedContainer'>
               {feedReady ?
                  posts.map((post, index) => {
                     let postData = post.data;
                     return (
                        <Feed
                           key={postData.id}
                           sub={postData.subreddit}
                           postId={postData.id}
                           subreddit={postData.subreddit_name_prefixed}
                           author={postData.author}
                           title={postData.title}
                           selftext={postData.selftext_html}
                           score={postData.score}
                           permalink={postData.permalink}
                           comments={postData.num_comments}
                           flair={postData.link_flair_text}
                           flair_color={postData.link_flair_background_color}
                           flair_text_color={postData.link_flair_text_color}
                           time={postData.created_utc}
                           awards={postData.all_awardings}
                           url={postData.url}
                           video={postData.media}
                           postType={postData.post_hint}
                           onChange={changePost}
                           feedView={view}
                        />
                     );
                  })
                  : <Feedback message={message} />}
            </div>
         </div>
      </div>
   );
}

export default App;
