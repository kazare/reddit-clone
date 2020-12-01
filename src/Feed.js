import "./Feed.css";
import ReactTimeAgo from 'react-time-ago';


const Feed = ({ data, subreddit, author, title, selftext, score, permalink, comments, flair, flair_color, flair_text_color, time, awards, url, video, postType }) => {
    const ms = time * 1000;

    const decodeHtml = (html) => {
        var txt = document.createElement("div");
        txt.innerHTML = html;
        return txt.childNodes.length === 0 ? "" : txt.childNodes[0].nodeValue;
    };

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

    const abbrScore = (num) => {
        if (num > 1000) {
            return (Math.round(num / 1000)).toString() + "k";
        } else {
            return (num).toString();
        }
    };

    return (
        <a className="cardLink" href={`https://www.reddit.com${permalink}`} target="_blank" rel="noreferrer">

            <div className="card">
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
                        <div className="postTime"><a href={`https://www.reddit.com${permalink}`} target="_blank" rel="noreferrer"><ReactTimeAgo date={ms} locale="en-US" /></a></div>
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

                    <a className="postComments" href={`https://www.reddit.com${permalink}`} target="_blank" rel="noreferrer">
                        <div>
                            <ion-icon name="chatbox"></ion-icon>
                            <span>{comments} comments</span>
                        </div>
                    </a>
                </div>
            </div>
        </a>
    );
};

export default Feed;