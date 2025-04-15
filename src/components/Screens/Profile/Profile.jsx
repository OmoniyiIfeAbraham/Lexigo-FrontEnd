import React, { useEffect, useState } from "react";
import Sidebar from "../Components/HomeComps/SidebarComp";
import Swal from "sweetalert2";
import { BaseUrl } from "../../Config/Config";
import axios from "axios";
import Notify from "../../Notification/Notify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const user = {
  //   Name: "Jane Doe",
  //   Email: "jane@example.com",
  //   Type: "Phonological Dyslexia",
  //   PhonologicalProgress: 3,
  //   SurfaceProgress: 1,
  // };

  const FetchData = async () => {
    Swal.fire({
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif",
      imageHeight: 50,
      showCloseButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
    try {
      const Data = await localStorage.getItem("Profile");
      const parsedData = JSON.parse(Data);

      let url = `${BaseUrl}/api/profile/view`;

      let response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedData.Auth}`,
        },
      });

      if (response.data.Error === false) {
        await localStorage.setItem(
          "Profile-Details",
          JSON.stringify(response.data.Data)
        );
        console.log(response.data);
        setUser(response.data.Data);
      } else {
        Notify({
          title: "Error",
          message: response.data.Error,
          Type: "danger",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.Error || error.message || "An error occurred.";
      Notify({
        title: "Error",
        message: errorMessage,
        Type: "danger",
      });
    } finally {
      Swal.close();
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  const handleReset = (type) => {
    console.log(`Resetting: ${type}`);
    // call your backend API here
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      console.log("Deleting account...");
      // call delete endpoint
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-semibold mb-6">Profile</h1>

        <div className="bg-white rounded-2xl shadow-md p-6 max-w-3xl w-full">
          <div className="mb-4">
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Name:</span> {user?.Name}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Email:</span> {user?.Email}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Dyslexia Type:</span> {user?.Type}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Phonological Progress:</span>{" "}
              {user?.PhonologicalProgress} / 6
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Surface Progress:</span>{" "}
              {user?.SurfaceProgress} / 2
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
              onClick={() => handleReset("general")}
            >
              Reset General Progress
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl"
              onClick={() => handleReset("phonological")}
            >
              Reset Phonological Progress
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
              onClick={() => handleReset("surface")}
            >
              Reset Surface Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
