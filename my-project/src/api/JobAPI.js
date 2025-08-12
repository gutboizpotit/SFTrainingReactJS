import axios from 'axios';

const API_BASE_URL = 'https://689aa997e727e9657f6238e0.mockapi.io/api/day1/jobs';

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
  await axios.delete(`${API_BASE_URL}/${jobId}`);
};