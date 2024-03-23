import React, { useContext, useEffect, useId, useState } from "react";

import { Context } from "../utilities/Context";
import { excludeEmptyStrings } from "../utilities/otherFunctions";

import { getFirestore } from "firebase/firestore";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
import {
  fetchDataFromFirestore,
  uploadImage,
  updateFirestore,
} from "../utilities/firebaseFunctions";

import SideNav from "../sections/SideNav";
import LilNav from "../sections/LilNav";

import profile from "../assets/profile.svg";

const Profile = () => {
  let { user, setuser, id, setid, errorMessage, successMessage } =
    useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const [editfirstName, setEditfirstName] = useState("");
  const [editlastName, setEditlastName] = useState("");
  const [editemail, setEditEmail] = useState("");
  const [editpassword, setEditPassword] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [editcompany, setEditCompany] = useState("");

  const [editimage, setEditImage] = useState(null);
  const [image, setImage] = useState(null);

  // collects every input in every field
  const updatedData = {
    first_name: editfirstName,
    last_name: editlastName,
    email: editemail,
    password: editpassword,
    company: editcompany,
  };

  //   save new changes
  const onSave = async () => {
    // takes all updated value from the updatedData object
    const collectedData = excludeEmptyStrings(updatedData);

    // checks for collected data and uploads it to firestore
    if (Object.keys(collectedData).length === 0) {
    } else {
      await updateFirestore("users", "userId", id, collectedData);
    }
  };

  //   save new password
  const onPasswordSave = async () => {
    let data = await fetchDataFromFirestore("users", "userId", id);
    if (oldpassword == "" || editpassword == "") {
    } else {
      if (data.password != oldpassword) {
        errorMessage("Your old password is incorrect");
      } else {
        // takes all updated value from the updatedData object
        const collectedData = excludeEmptyStrings(updatedData);

        // checks for collected data and uploads it to firestore
        if (Object.keys(collectedData).length === 0) {
        } else {
          await updateFirestore("users", "userId", id, collectedData);
        }
        successMessage("Password changed successfully!");
      }
    }
  };

  //  displays selected image and upload it to firestore
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setEditImage(e.target.result);
      };
      reader.readAsDataURL(file);

      // upload image to firestore if an image was selected
      file == null
        ? console.log(true)
        : await uploadImage(file, "profile_picture", id);

      setEditImage(null);
      successMessage("Profile picture changed");
    }
  };

  // function to list user pictures
  const listUserImages = async (userId) => {
    const storagePath = `/images/${userId}/profile_picture`;

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

  //   function to find most recent image
  const findMostRecentImage = async (userId) => {
    const userImages = await listUserImages(userId);
    if (userImages.length === 0) {
      console.log("No images found");
      return null; // No images found
    }
    userImages.sort((a, b) => b.timestamp - a.timestamp); // Assuming you have a timestamp property for each image
    return userImages[0]; // The most recent image
  };

  useEffect(() => {
    const getData = async () => {
      let data = await fetchDataFromFirestore("users", "userId", id);
      console.log(data);
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email);
      setCompany(data.company_name);
    };
    findMostRecentImage(id)
      .then((mostRecentImage) => {
        if (mostRecentImage) {
          setImage(mostRecentImage);
          const imagePath = mostRecentImage.name; // Get the image path
          // Don't log downloadURL here, it might not reflect the updated state immediately
        }
      })
      .catch((error) => {
        console.error("Error fetching most recent image:", error);
      });
    getData();
  }, [id]);

  return (
    <div>
      <div className="Dashboard">
        <SideNav />
        <div className="sub_dash">
          <LilNav />
          <div className="profile_container">
            <div className="profile_head">
              <div className="profile">
                {editimage ? (
                  <img src={editimage} alt="Preview Image" />
                ) : (
                  <>
                    {image ? (
                      <img src={image} alt="Preview Image" />
                    ) : (
                      <img src={profile} alt="profile icon" />
                    )}
                  </>
                )}

                <div className="profile_details">
                  <div className="profile_name">
                    {firstName} {lastName}
                  </div>
                  <div className="profile_email">{email}</div>
                  <div className="profile_company">{company}</div>
                </div>
              </div>
              <div className="edit_image">
                <div className="profile_one">
                  <span className="edit_one">Change image</span>
                  <div className="set_profile_picture">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="edit_profile">
              <div className="edit_head">Edit Profile</div>
              <div className="edit_form">
                <label>
                  Edit first name
                  <input
                    type="text"
                    value={editfirstName}
                    placeholder="New First Name"
                    onChange={(e) => setEditfirstName(e.target.value)}
                  />
                </label>
                <label>
                  Edit last name
                  <input
                    type="text"
                    value={editlastName}
                    placeholder="New Last Name"
                    onChange={(e) => setEditlastName(e.target.value)}
                  />
                </label>
                <label>
                  Edit company
                  <input
                    type="text"
                    value={editcompany}
                    placeholder="New Company Name"
                    onChange={(e) => setEditCompany(e.target.value)}
                  />
                </label>
                <label>
                  Edit e-mail
                  <input
                    type="email"
                    value={editemail}
                    placeholder="xxxxxxx@gmail.com"
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                </label>
              </div>
              <div className="save_button" onClick={onSave}>
                Save
              </div>

              <div className="section_head">Change password</div>
              <div className="edit_form">
                <label>
                  Enter current password
                  <input
                    type="password"
                    value={oldpassword}
                    placeholder=""
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </label>
                <label>
                  Enter new password
                  <input
                    type="password"
                    value={editpassword}
                    placeholder=""
                    onChange={(e) => setEditPassword(e.target.value)}
                  />
                </label>
              </div>
              <div className="save_button" onClick={onPasswordSave}>
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
