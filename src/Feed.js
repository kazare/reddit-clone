import "./App";
import "./Feed.css";
import { decodeHtml, abbrScore } from "./Handlers";
import ReactTimeAgo from 'react-time-ago';


const Feed = ({ sub, postId, subreddit, author, title, selftext, score, permalink, comments, flair, flair_color, flair_text_color, time, awards, url, video, postType, onChange, feedView }) => {
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

    const handlePostClick = (e, sub, id) => {
        e.preventDefault();
        onChange(sub, id);
    };

    const CardView = () => {
        return (
            <div className="feedItem cardView" onClick={(e) => { handlePostClick(e, sub, postId) }}>
                <div className="postScore">
                    <div><ion-icon name="caret-up"></ion-icon></div>
                    <div>{abbrScore(score)}</div>
                    <div><ion-icon name="caret-down"></ion-icon></div>

                </div>
                <div className="postContent">
                    <div className="postInfo">
                        <div className="subName"><a href={`https://www.reddit.com/${subreddit}`}>{subreddit}</a></div>
                        <span className="seperator">&#8231;</span>
                        <div className="user">Posted by <a href={`https://www.reddit.com/user/${author}`}>u/{author}</a></div>
                        <span className="seperator">&#8231;</span>
                        <div className="postTime"><a href={`https://www.reddit.com${permalink}`} target="_blank" rel="noopener"><ReactTimeAgo date={ms} locale="en-US" /></a></div>
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

                    <div className="selftext" dangerouslySetInnerHTML={{ __html: decodeHtml(selftext) }} />

                    <div className="postBody">{typeOfPost(postType)}</div>

                    <a className="postComments" href={`https://www.reddit.com${permalink}`} target="_blank" rel="noopener">
                        <div>
                            <ion-icon name="chatbox"></ion-icon>
                            <span>{comments} comments</span>
                        </div>
                    </a>
                </div>

            </div>
        );
    };

    const ClassicView = () => {
        return (
            <div className="feedItem classicView" onClick={(e) => { handlePostClick(e, sub, postId) }}>
                <div className="postScore">
                    <div><ion-icon name="caret-up"></ion-icon></div>
                    <div>{abbrScore(score)}</div>
                    <div><ion-icon name="caret-down"></ion-icon></div>
                </div>

                <div className="postBody">{typeOfPost(postType)}</div>

                <div className="postContent">

                    <div className="titleRow">

                        <h3 className="postTitle">{title}</h3>
                    </div>

                    {flair ? <div className={`${flair_text_color} flairLabel`} style={{ backgroundColor: flair_color }} dangerouslySetInnerHTML={{ __html: flair }} /> : null}

                    <div className="postInfo">
                        <div className="subName"><a href={`https://www.reddit.com/${subreddit}`}>{subreddit}</a></div>
                        <span className="seperator">&#8231;</span>
                        <div className="user">Posted by <a href={`https://www.reddit.com/user/${author}`}>u/{author}</a></div>
                        <span className="seperator">&#8231;</span>
                        <div className="postTime"><a href={`https://www.reddit.com${permalink}`} target="_blank" rel="noopener"><ReactTimeAgo date={ms} locale="en-US" /></a></div>
                        <span className="seperator">&#8231;</span>

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


                    <a className="postComments" href={`https://www.reddit.com${permalink}`} target="_blank" rel="noopener">
                        <div>
                            <ion-icon name="chatbox"></ion-icon>
                            <span>{comments} comments</span>
                        </div>
                    </a>
                </div>

            </div>
        )
    };

    const CompactView = () => {
        return (
            <div className="feedItem compactView" onClick={(e) => { handlePostClick(e, sub, postId) }}>
                <div className="postScore">
                    <div><ion-icon name="caret-up"></ion-icon></div>
                    <div>{abbrScore(score)}</div>
                    <div><ion-icon name="caret-down"></ion-icon></div>
                </div>



                <div className="postContent">

                    <div className="titleRow">

                        <h3 className="postTitle">{title}</h3>

                        {flair ? <div className={`${flair_text_color} flairLabel`} style={{ backgroundColor: flair_color }} dangerouslySetInnerHTML={{ __html: flair }} /> : null}

                    </div>


                    <div className="postInfo">
                        <div className="subName"><a href={`https://www.reddit.com/${subreddit}`}>{subreddit}</a></div>
                        <span className="seperator">&#8231;</span>
                        <div className="user">Posted by <a href={`https://www.reddit.com/user/${author}`}>u/{author}</a></div>
                        <span className="seperator">&#8231;</span>
                        <div className="postTime"><a href={`https://www.reddit.com${permalink}`} target="_blank" rel="noopener"><ReactTimeAgo date={ms} locale="en-US" /></a></div>
                        <span className="seperator">&#8231;</span>

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



                </div>
                <a className="postComments" href={`https://www.reddit.com${permalink}`} target="_blank" rel="noopener">
                    <div>
                        <ion-icon name="chatbox"></ion-icon>
                        <span>{abbrScore(comments)}</span>
                    </div>
                </a>
            </div>
        )
    };

    const ErrorDiv = () => {
        return <div>ERROR</div>;
    }

    if (feedView === "card") {
        return <CardView />;
    } else if (feedView === "classic") {
        return <ClassicView />;
    } else if (feedView === "compact") {
        return <CompactView />;
    } else {
        return <ErrorDiv />;
    }
};

export default Feed;