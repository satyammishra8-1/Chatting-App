import { axiosInstance , url} from "./index";

// New API call to get logged user details
export const getLoggedUser = async () => {
    try {
        const response = await axiosInstance.get(url + "/api/user/get-logged-user");
        return response.data;
    } catch (error) {
        return error;
    }
}

// New API call to fetch all users
export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get(url + "/api/user/get-all-users");
        return response.data;
    } catch (error) {
        return error;
    }
}

// New API call to update profile picture
export const uploadProfilePic = async (image) => {
    try {
        const response = await axiosInstance.post(url + "/api/user/upload-profile-pic", { image });
        return response.data;
    } catch (error) {
        return error;
    }
}

// New API call to update preferred language
export const updatePreferredLanguage = async (preferredLanguage) => {
    try {

        const response = await axiosInstance.post(
            '/api/user/update-preferred-language',
            { preferredLanguage }
        );

        return response.data;

    } catch (error) {
        return error;
    }
};

// New API call to verify secure pin
export const verifySecurePin = async (pin) => {
  try {

    const response = await axiosInstance.post(
      url + "/api/user/verify-secure-pin",
      { pin }
    );

    return response.data;

  } catch (error) {

    return error.response.data;

  }
};

// New API call to change secure pin
export const changeSecurePin = async (pin) => {
  try {

    const response = await axiosInstance.post(
      url + "/api/user/change-secure-pin",
      { pin }
    );

    return response.data;

  } catch (error) {

    return error.response.data;

  }
};

// New API call to hide pin popup
export const hidePinPopup = async () => {
  try {

    const response = await axiosInstance.post(
      url + "/api/user/hide-pin-popup"
    );

    return response.data;

  } catch (error) {

    return error.response.data;

  }
};