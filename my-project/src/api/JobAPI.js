import axios from "axios";

const API_BASE_URL =
  "https://689aa997e727e9657f6238e0.mockapi.io/api/day1/jobs";
const API_AUTH_URL =
  "https://689aa997e727e9657f6238e0.mockapi.io/api/day1/users";

export const fetchJobs = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const createJob = async (jobData) => {
  const response = await axios.post(API_BASE_URL, jobData);
  return response.data;
};

export const updateJob = async (jobId, jobData) => {
  const response = await axios.put(`${API_BASE_URL}/${jobId}`, jobData);
  return response.data;
};

export const deleteJob = async (jobId) => {
  const response = await axios.delete(`${API_BASE_URL}/${jobId}`);
  return response.data;
};

export const login = async (credentials) => {
  try {
    const response = await axios.get(API_AUTH_URL);
    const users = response.data;
    const user = users.find(
      (u) =>
        u.user_name === credentials.username &&
        u.password === credentials.password
    );

    if (user) {
      return {
        success: true,
        role: user.role == "ADMIN" ? "ADMIN" : "USER",
        token: "fake-jwt-token",
        user_id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        bio: user.bio,
        location: user.location,
        cover_image: user.cover_image,
        profile_image: user.profile_image
      };
    } else {
      return {
        success: false,
        role: null,
        token: null,
      };
    }
  } catch (error) {
    console.error("Login API error:", error);
    return {
      success: false,
      role: null,
      token: null,
    };
  }
};
