import React, { useState, useEffect } from 'react';
import { getAllTweets, deleteTweet } from '../../services/apiService';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';
import CreateTweets from '../CreateComponents/CreateTweets';

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
  }, []);
  const handleDelete = async (id) => {
    const updatedTweets = tweets.filter((tweet) => tweet.id !== id);
    setTweets(updatedTweets);
    await deleteTweet(id);
    alert("You have deleted a Tweet!");
}

  const renderTweets = () => {
    const sortTweets = tweets.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    return sortTweets.map((tweet) => {
      return (
        <div className="mx-auto max-w-md border p-4 mb-4 rounded" key={tweet.id}>
          <div id="tweet-container">
            <Link
              to={tweet.user !== null ?{
                pathname: `/dashboard/user/${tweet.user.name}/${tweet.user.id}`,
                state: { names: tweet.user.name },
              } : '/' }
              className="text-dark font-bold mb-2 block"
            > {tweet.user !== null ? tweet.user.name : "Anonymous"}
            </Link>
            <p className="tweet-date text-secondary font-normal mb-2">
              {dateFormat(tweet.createdAt, 'mmm dd, yyyy')}
            </p>
            <div className="font-normal">{tweet.tweet}</div>
          </div>
          {localStorage.getItem('userId') == tweet.userId ? (
            <div className="mt-2">
              <Link
                to={{
                  pathname: `/dashboard/tweet/${tweet.id}/update`,
                  state: { editTweet: tweet.tweet },
                }}
                className="text-blue-500 cursor-pointer"
              >
                Edit
              </Link>
              <button onClick={() => handleDelete(tweet.id)}>
                <span className="ml-2 text-red-500 cursor-pointer">Delete</span>
            </button>
            </div>
          ) : (
            ''
          )}
        </div>
      );
    });
  };

  return (
    <div className="tweet-data">
      <h1 className="text-2xl font-bold mb-4">Tweets</h1>
      <CreateTweets {...props} />
      <div>{renderTweets().reverse()}</div>
    </div>
  );
};

export default Tweets;
