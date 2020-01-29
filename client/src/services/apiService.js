import axios from 'axios'
const BASE_URL = 'http://localhost:4567'

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

    console.log(response.data)

    return user
  } catch (e) {
    throw e
  }
}

export const login = async(data) => {
  try {
    const response = await api.post('/auth/login', data)
    const { data: { token, user } } = response

    console.log(response.data)

    localStorage.setItem('token', token)
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
    return user
  } catch (e) {
    throw e
  }
}

export const getOneProfile = async (userId) => {
  try {
      const response = await api.get(`/app/profile/bio/${userId}`)
      return response.data
  } catch(error) {
    throw error
  }
}

export const getUserNames = async (id) => {
  try {
      const response = await api.get(`/app/profile/bio/1`)
      const {user} = response.data
      // console.log(this.state)
      // console.log(this.props)
      console.log(user)
      console.log(response)
      return response.data
  } catch(error) {
    throw error
  }
}