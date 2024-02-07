import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getImages } from '../../services/apiService'
import DefaultProfilePicture from "./DefaultImage/defaultprofilepicture.png";

const UserImage = ({ id, name }) => {
  const [image, setImage] = useState([]);
  const [userId] = useState(id);

  const getImage = async () => {
    const images = await getImages();
    setImage(images);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getImage();
    };
    fetchData();
  }, []);

  const renderImage = () => {
    const userImages = image.find(poster => poster.userId == userId);
    if (!userImages) {
      return (
        <div key={userId}>          
          <img src={DefaultProfilePicture} alt="Default" />
          {localStorage.getItem("userId") == id ? (
            <Link to={{ pathname: "/dashboard/user/upload" }}>
              <button className="btn btn-primary font-weight-bold m-2">
                Upload Image?
              </button>
            </Link>
          ) : (
            ""
          )}
        </div>
      );
    } else {
        return (
        <div key={userImages.id}>
          <img src={userImages.image.url} alt={`User ${name}'s Image`} />

          {localStorage.getItem('userId') === userId ? (
            <Link
              to={{pathname: `/user/upload/${name}/${userId}/edit`}}
              onClick={() => localStorage.setItem('imageId', userImages.id)}
            >
              <button>Edit Image</button>
            </Link>
          ) : (
            ''
          )}
        </div>
        );
    }
  };

  return <div>{renderImage()}</div>;
}

export default UserImage