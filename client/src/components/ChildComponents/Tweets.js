import React, { useState, useEffect } from "react";
import { getAllTweets, deleteTweet } from "../../services/apiService";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import CreateTweets from "../CreateComponents/CreateTweets";

const Tweets = (props) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const tweetsData = await getAllTweets();
        setTweets(tweetsData);
      } catch (e) {
        console.error(e);
      }
    };
    fetchTweets();
  }, [tweets]);
  
  const handleDelete = async (id) => {
    const updatedTweets = tweets.filter((tweet) => tweet.id !== id);
    setTweets(updatedTweets);
    await deleteTweet(id);
    // alert("You have deleted a Tweet!");
  };

  const renderTweets = () => {
    const sortTweets = tweets.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return sortTweets.map((tweet) => {
      return (
        <div className="mx-auto" key={tweet.id}>
          <div
            className="bg-white border border-gray-300 p-4 rounded mb-4 relative">
            <div className="flex items-start">
            <div className="ml-4 flex-grow">
              <Link
                to={
                  tweet.user !== null
                    ? {
                        pathname: `/dashboard/user/${tweet.user.name}/${tweet.user.id}`,
                        state: { names: tweet.user.name },
                      }
                    : "/"
                }
                className="text-dark font-bold"
              >
                {" "}
                {tweet.user !== null ? tweet.user.name : "Anonymous"}
              </Link>
              <div className="font-normal">{tweet.tweet}</div>
              </div>
              <div className="text-secondary text-right">
              <p className="text-secondary font-normal">
                {dateFormat(tweet.createdAt, "mmm dd, yyyy")}
              </p>
              </div>
            </div>
            {localStorage.getItem("userId") == tweet.userId ? (
              <div className="absolute bottom-0 right-0 mb-2 mr-2">
                <Link
                  to={{
                    pathname: `/dashboard/tweet/${tweet.id}/update`,
                    state: { editTweet: tweet.tweet },
                  }}
                  className="text-blue-500 cursor-pointer mr-2"
                >
                  Edit
                </Link>
                <button onClick={() => handleDelete(tweet.id)}>
                  <span className="text-red-500 cursor-pointer">
                    Delete
                  </span>
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="tweet-data">
      {/* <h1 className="text-2xl font-bold text-blue-500 mb-4">Tweets</h1> */}
      <CreateTweets {...props} />
      <div>{renderTweets()}</div>
    </div>
  );
};

export default Tweets;
