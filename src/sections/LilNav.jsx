import React, { useContext, useEffect, useId, useState } from "react";

import {
  getFirestore,
} from "firebase/firestore";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

import { Context } from "../utilities/Context";

import { fetchDataFromFirestore } from "../utilities/firebaseFunctions";
import bell from "../assets/notifications.svg";
import profile from "../assets/profile.svg";

const LilNav = () => {
  const db = getFirestore();

  const [userfirstname, setUserfirstname] = useState("");
  const [userlastname, setUserlastname] = useState("");
  const [downloadURL, setDownloadURL] = useState("");

  const { user, setuser, id, setid, errorMessage, image, setImage } =
    useContext(Context);

  // function to list user pictures
  const listUserImages = async (userId) => {
    const storagePath = `/images/${userId}/profile_picture`; // Adjust the path as needed

    const imageURLs = [];
    const userImagesRef = ref(storage, storagePath);
    try {
      const imageRefs = await listAll(userImagesRef);
      for (const imageRef of imageRefs.items) {
        const url = await getDownloadURL(imageRef);
        imageURLs.push(url);
      }
      return imageURLs;
    } catch (error) {
      console.error("Error fetching images:", error);
      throw error;
    }
  };

  const findMostRecentImage = async (userId) => {
    const userImages = await listUserImages(userId);
    if (userImages.length === 0) {
      console.log('No images found')
      return null; // No images found
    }
    userImages.sort((a, b) => b.timestamp - a.timestamp); // Assuming you have a timestamp property for each image
    return userImages[0]; // The most recent image
  };
  
  useEffect(() => {
      findMostRecentImage(id)
        .then((mostRecentImage) => {
          if (mostRecentImage) {
            setDownloadURL(mostRecentImage)
            const imagePath = mostRecentImage.name; // Get the image path
            // Don't log downloadURL here, it might not reflect the updated state immediately
          }
        })
        .catch((error) => {
          console.error("Error fetching most recent image:", error);
        });
  
    // Clear the interval when the component unmounts or when 'id' changes
  }, [id]);

  useEffect(() => {
    const getData = async () => {
      let data = await fetchDataFromFirestore("users", "userId", id);
      setUserfirstname(data.first_name);
      setUserlastname(data.last_name);
    };
    getData();
  }, [id]);

  return (
    <div className="LilNav">
      <div className="lilnav_title">Profile</div>
      <ul>
        <li>
          {downloadURL ? (
            <img src={downloadURL} alt="My image" className="profile_picture" />
          ) : (
            <img src={profile} alt="profile_icon" className="profile_icon" />
          )}
          {/* <img src={profile} alt="profile_icon" className="profile_icon" /> */}
          <span className="dash_name">
            {userfirstname} {userlastname}
          </span>
        </li>
        <li>
          <img src={bell} alt="bell" className="lilnav_icon" />
        </li>
      </ul>
    </div>
  );
};

export default LilNav;
