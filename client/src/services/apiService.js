import axios from 'axios'
import { fileURLToPath } from 'url'
const BASE_URL = 'http://localhost:4567'
// process.env.REACT_APP_HEROKU_URL
const JWT_TOKEN = localStorage.getItem('token')

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${JWT_TOKEN}`
  }
})


export const getProfile = async() => {
  try {
    const response = await api.get('/app/profile')
    const { data: { user } } = response
    return user
  } catch (e) {
    throw e
  }
}

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

    console.log(response.data)

    localStorage.setItem('token', token)
    localStorage.setItem('userId', user.id)
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

// export const getOneUpload = async () => {
//   try {
//     const userId = localStorage.getItem('userId')
//     const response = await api.get(`app/upload/${userId}`)
//     return response.data
//   } catch(error) {
//     throw error
//   }
// }

export const uploadImage = async (data) => {
  try {
    const response = await api.post('/app/upload', data)
      .then(() => {
        console.log("The file is successfully uploaded");
      }).catch((error) => {
        console.error(error)
      });
      const { user } = response.data
      return user
  } catch (error) {
    throw error
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

export const createTweets = async (data) => {
  try {
      const response = await api.post('/app/tweets', data)
      const { user } = response.data
      return user
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