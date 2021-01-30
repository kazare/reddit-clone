import React, { useEffect, useState } from "react";
import "./App.css";
import Feedback from "./Feedback";
import Feed from "./Feed";
import Filters from "./Filters";
import Post from "./Post";
import Comment from "./Comment";

const App = () => {
   const [token, setToken] = useState('');
   const [posts, setPosts] = useState([]);
   const [ready, setReady] = useState(false);
   const [sort, setSort] = useState('hot');
   const [message, setMessage] = useState('Loading . . .');
   const [activeBtn, setActiveBtn] = useState(sort);
   const [post, setPost] = useState([]);
   const [comments, setComments] = useState([]);


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
            setReady(true);
            console.log(datas);
         })
         .catch(error => console.log("ERROR: ", error))
   };

   //grab individual post - wip
   const getPost = async (sub, id) => {
      await fetch(`https://oauth.reddit.com/r/tifu/comments/l7od85`, {
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
            console.log(datas);
         })
         .catch(error => console.log("ERROR: ", error))
   };

   useEffect(() => {
      console.log("This is the current token: " + token);
      getFeed(token);
   }, [token, sort]);

   useEffect(() => {
      console.log("Sort: " + sort);
   }, [sort]);

   const changeSort = (value, name) => {
      setSort(value);
      setActiveBtn(name);
   };

   const changeView = (value) => {
      console.log("View is now: " + value);
   }

   const changePost = (sub, id) => {
      console.log(sub, id);
      getPost(sub, id);
   }

   return (
      <div className="App" >
         <div className="searchBar">
            <h1 className="title">readit</h1>
            <form action="input">
               <input type="text" />
            </form>
         </div>
         <div className="post">
            {post.map((post, index) => {
               let p = post.data;
               return (
                  <Post
                     sub={p.subreddit}
                     author={p.author}
                     time={p.created_utc}
                     title={p.title}
                     body={p.selftext_html}
                     upvotes={p.ups}
                  />
               );
            })}

            {comments.map((comment, index) => {
               let c = comment.data;
               return (
                  <Comment
                     author={c.author}
                     time={c.created_utc}
                     body={c.body}
                     upvotes={c.ups}
                     replies={c.replies}
                  />
               );
            })}
         </div>
         <div className="container">
            <Filters
               activeBtn={activeBtn}
               onChange={changeSort}
               onChange={changeView} />

            <div className="cardContainer">
               {ready ?
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
