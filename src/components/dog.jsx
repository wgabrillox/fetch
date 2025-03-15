import React from "react";
import "../styles.css";

export const Dog = ({ dog, favoriteToggle, favorites }) => {
  const { img, name, age, breed, id } = dog;
  const zipCode = dog.zip_code;

  return (
    <div key={dog.id} className="dog">
      <div>
        <div className="dogHeader">
          <div className="dogName">{name}</div>
          <div
            className={`dogFavorite ${favorites[id] && "isFavorite"}`}
            onClick={() => favoriteToggle(dog)}
          ></div>
        </div>
        <img className="dogPicture" src={img} alt={`Image of ${name}`} />
        <div className="dogInfo">
          <div className="dogInfoRow">
            <div>
              <span className="infoLabel">Breed:</span> {breed}
            </div>
          </div>
          <div className="dogInfoRow">
            <div>
              <span className="infoLabel">Age:</span> {age}
            </div>
            <div>
              <span className="infoLabel">Zip Code:</span> {zipCode}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
