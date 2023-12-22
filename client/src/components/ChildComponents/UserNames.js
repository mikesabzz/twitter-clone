import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserNames } from "../../services/apiService";
import SearchUser from "./SearchUsers";

const UserNames = () => {
  const [names, setNames] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedNames = await getUserNames();
        setNames(fetchedNames);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // onError() {
  //     this.setState({
  //       imageUrl: "https://res.cloudinary.com/mikesabz/image/upload/v1589941495/otupu5oygjquz8ruf8cx.jpg"
  //     })
  //   }
  const renderPerson = () => {
    if (names) {
      return names
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((name) => (
          // const imageUrl = (name.image == null) ? "https://res.cloudinary.com/mikesabz/image/upload/v1589940574/iu3kvrmdpvpw1lp0aoru.jpg" : name.image.url
          <div key={name.id}>
            <Link
              to={{
                pathname: `/dashboard/user/${name.name}/${name.id}`,
                state: { names: name },
              }}
              key={name.id}
            >
              <div className="border border-gray-300 p-3">
                {/* <img src={imageUrl} /> */}
                <p>{name.name}</p>
              </div>
            </Link>
          </div>
        ));
    }
  };

  const handleFilterChange = (event) => {
    try {
      event.preventDefault();
      setInputValue(event.target.value);
      const inputUserName = names.filter((name) => name.name.toLowerCase().includes(inputValue.toLowerCase()));

      if (inputValue.length < 2) {
        fetchData();
      } else {
        setNames(inputUserName);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchData = async () => {
    try {
      const fetchedNames = await getUserNames();
      setNames(fetchedNames);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <SearchUser name={names} onChange={handleFilterChange} />
      <br />
      <div>{renderPerson()}</div>
    </div>
  );
};
export default UserNames;
