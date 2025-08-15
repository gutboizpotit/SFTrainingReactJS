import axios from "axios"

const API_BASE_URL = "https://689aa997e727e9657f6238e0.mockapi.io/api/day1/users"

export const fetchUser = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}`)
    return response.data
  } catch (error) {
    console.error("Error fetching user:", error)
    throw error
  }
}

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${userId}`, userData)
    return response.data
  } catch (error) {
    console.error("Error updating user:", error)
    throw error
  }
}
