import React, { useEffect, useState } from "react";
import Sidebar from "../Components/HomeComps/SidebarComp";
import Swal from "sweetalert2";
import { BaseUrl } from "../../Config/Config";
import axios from "axios";
import Notify from "../../Notification/Notify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

      let url = `${BaseUrl}/api/profile/view/all`;

      let response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedData.Auth}`,
        },
      });

      if (response.data.Error === false) {
        console.log("okayyyy");
        console.log("all: ", response.data);
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

  const ResetSurface = async () => {
    if (
      window.confirm(
        "Are you sure you want to reset your surface dyslexia progress?"
      )
    ) {
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

        let url = `${BaseUrl}/api/profile/reset-surface`;

        let response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parsedData.Auth}`,
          },
        });

        if (response.data.Error === false) {
          // console.log("all: ", response.data);
          // setUser(response.data.Data);
          FetchData();
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
    }
  };

  const ResetTypeTest = async () => {
    if (
      window.confirm(
        "Are you sure you want to reset your type test result? You might have to take it again!"
      )
    ) {
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

        let url = `${BaseUrl}/api/profile/reset-type-test`;

        let response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parsedData.Auth}`,
          },
        });

        if (response.data.Error === false) {
          // console.log("all: ", response.data);
          // setUser(response.data.Data);
          FetchData();
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-semibold mb-6">Profile</h1>

        <div className="bg-white rounded-2xl shadow-md p-6 max-w-3xl w-full">
          <div className="mb-4">
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Name:</span> {user?.User?.Name}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Email:</span> {user?.User?.Email}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Dyslexia Type:</span>{" "}
              {user?.User?.Type}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Phonological Progress:</span>{" "}
              {user?.User?.PhonologicalProgress || 0} / 6
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Surface Progress:</span>{" "}
              {user?.User?.SurfaceProgress || 0} / 2
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Blending Quiz Score:</span>{" "}
              {user?.Blending?.Score || 0}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Mirror Quiz Score:</span>{" "}
              {user?.Mirror?.Score || 0}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Dyslxia Type Quiz Score:</span>{" "}
              {user?.Type?.Score || 0}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Vowel Quiz Score:</span>{" "}
              {user?.Vowel?.Score || 0}
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
              onClick={ResetSurface}
            >
              Reset Surface Progress
            </button>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl"
              onClick={ResetTypeTest}
            >
              Reset Type Test Result
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
