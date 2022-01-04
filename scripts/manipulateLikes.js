"use strict";

const manipulateLikes = () => {
  const likeButtons = document.querySelectorAll(".like");

  const addLike = () => {
    likeButtons.forEach((likeButton) => {
      likeButton.addEventListener("click", () => {
        if (likeButton.classList.contains("liked"))
          likeButton.classList.remove("liked");
        else likeButton.classList.add("liked");
      });
    });
  };

  addLike();
};

export default manipulateLikes;
