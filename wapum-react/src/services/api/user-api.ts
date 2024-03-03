import { BACKEND_API_URL } from "../../data/dev.variable";
import { fetchWithAuth } from "./auth-api";

export const updateUserProfilePicture = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetchWithAuth(
    BACKEND_API_URL + "users/update-profile-picture",
    {
      method: "POST",
      // place file in "file" field
      body: formData,
    }
  );

  if (response.ok) {
    return true;
  }
  throw new Error("Failed to update profile picture");
};

export const searchUsers = async (username: string) => {
  const response = await fetchWithAuth(
    BACKEND_API_URL + `users/search/${username}`
  );
  const data = await response.json();

  if (response.ok) {
    return data;
  }
  throw new Error(data.message);
};
