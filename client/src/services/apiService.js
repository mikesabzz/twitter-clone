import axios from 'axios'
const BASE_URL = process.env.VERCEL_URL || 'https://twitter-clone-delta-pink.vercel.app'
// const BASE_URL = 'http://localhost:4567' 

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use((config) => {
  const JWT_TOKEN = localStorage.getItem('token');
  if (JWT_TOKEN) {
    config.headers['Authorization'] = `Bearer ${JWT_TOKEN}`;
  }
  return config;
});

export const login = async(data) => {
  try {
    const response = await api.post('/auth/login', data)
    const { data: { token, user } } = response

    localStorage.setItem('token', token)
    localStorage.setItem('userId', user.id)
    return user
  } catch (e) {
    throw e
  }
}

export const signUp = async(data) => {
  try {
    const response = await api.post('/auth/signup', data)
    const { data: { user, token } } = response

    // console.log(response.data)

    localStorage.setItem('token', token)
    localStorage.setItem('userId', user.id)
    return user
  } catch (e) {
    throw e
  }
}
export const getProfile = async() => {
  try {
    const response = await api.get('/app/profile')
    const { data: { user } } = response
    return user
  } catch (e) {
    throw e
  }
}
export const getAllProfiles = async () => {
  try {
      const response = await api.get(`app/profile/bio/all`)
      return response.data
  } catch(error) {
    throw error
  }
}
export const createProfile = async (data) => {
  try {
      const response = await api.post('/app/profile/bio', data)
      const { user } = response.data
      return user
  } catch(error) {
    throw error
  }
}

export const editProfile = async (id, data) => {
  try {
      const response = await api.put(`/app/profile/bio/${id}`, data)
      return response
  } catch(error) {
    throw error
  }
}
export const getImages = async () => {
  try {
    const response = await api.get(`app/upload`)
    return response.data
  } catch(error) {
    console.log(error)
  }
}

export const getUserNames = async () => {
  try {
      const response = await api.get(`/app/profile/users`)      
      return response.data
  } catch(error) {
    throw error
  }
}

export const getAllTweets = async () => {
  try {
    const tweets = await api.get(`/app/tweets`)
    return tweets.data
  } catch (error) {
    throw error
  }
}

export const postTweet = async (data) => {
  try {
      const response = await api.post('/app/tweets', data)
      // const { user } = response.data
      // return user
      return response.data;
  } catch(error) {
    throw error
  }
}
export const editTweet = async (tweetId, data) => {
  try {
    const response = await api.put(`app/tweets/${tweetId}`, data)
    return response
  } catch(error){
    throw error
  }
}
export const deleteTweet = async (tweetId, data) => {
  try {
    const response = await api.delete(`app/tweets/${tweetId}`, data)
    return response
  } catch(error){
    throw error
  }
}
export const deleteProfile = async (profileId, data) => {
  try {
    const response = await api.delete(`app/profile/bio/${profileId}`, data)
    return response
  } catch(error){
    throw error
  }
}
export const deleteAccount = async (id, data) => {
  try {
    const response = await api.delete(`app/profile/${id}`, data)
    return response
  } catch(error){
    throw error
  }
}