import axios from 'axios'

export default {
  get: async (url) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_ENTREPOT_API}/${url}`)
      return data  
    } catch (error) {
      console.log(error)
      throw (error)
    }
  },
  post: async (url, payload = null) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_ENTREPOT_API}/${url}`, payload)
      return data 
    } catch (error) {
      console.log(error)
      throw (error)
    }
  }
}