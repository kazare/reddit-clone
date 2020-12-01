import React, { useEffect, useState } from "react";
import "./App.css";
import Feedback from "./Feedback";
import Feed from "./Feed";

const App = () => {
   const [token, setToken] = useState('');
   const [posts, setPosts] = useState([]);
   const [ready, setReady] = useState(false);
   const [sort, setSort] = useState('hot');
   const [message, setMessage] = useState('Loading . . .');


   const sub = 'r/Parenting';
   const subPosts = `${sub}/${sort}/`;
   const home = `${sort}`;

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

   const getPosts = async (token) => {
      await fetch(`https://oauth.reddit.com/${home}`, {
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

   useEffect(() => {
      console.log("This is the current token: " + token);
      getPosts(token);
   }, [token, sort]);


   const handleClick = (event) => {
      event.preventDefault();
      console.log("Button: " + event.target.value);
      setSort(event.target.value);
   };

   return (
      <div className="App" >

         <div className="searchBar">
            <h1 className="title">readit</h1>
            <form action="input">
               <input type="text" />
            </form>
         </div>
         <div className="container">
            <div className="filters">
               <button value="hot" onClick={handleClick}>HOT</button>
               <button value="new" onClick={handleClick}>NEW</button>
               <button value="top" onClick={handleClick}>TOP</button>
               <button>Card</button>
            </div>
            <div className="cardContainer">
               {ready ?
                  posts.map((post, index) => {
                     let postData = post.data;
                     return (
                        <Feed
                           key={postData.id}
                           data={postData}
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
