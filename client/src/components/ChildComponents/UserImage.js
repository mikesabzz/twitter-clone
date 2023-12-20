import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getImages } from '../../services/apiService'

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
    const userImages = [{id: 1, url: "https://cdn.vectorstock.com/i/preview-1x/13/04/male-profile-picture-vector-2041304.jpg"}];
    // const userImages = image.filter(poster => poster.userId == userId);
    if (!userImages) {
    // if (userImages.length === 0) {
      return (
        <div key={userId} id="profile-image">
           <img className="profile-image" src="https://cdn.vectorstock.com/i/preview-1x/13/04/male-profile-picture-vector-2041304.jpg" alt="Default" />
          {/* <img className="profile-image" src="https://res.cloudinary.com/mikesabz/image/upload/v1589940574/iu3kvrmdpvpw1lp0aoru.jpg" alt="Default" /> */}
        </div>
      );
    } else {
      return userImages.map(userImage => (
        <div key={userImage.id} id="profile-image">
          <img className="profile-image" src={userImage.url} alt={`User ${name}'s Image`} />

          {localStorage.getItem('userId') == userId ? (
            <Link
              to={{
                pathname: `/user/upload/${name}/${userId}/edit`,
                state: { imageId: userImage.id },
              }}
            >
              <button className="btn btn-outline-light font-weight-bold">Edit Image</button>
            </Link>
          ) : (
            ''
          )}
        </div>
      ));
    }
  };

  return <div>{renderImage()}</div>;
}

export default UserImage