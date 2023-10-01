import axios from 'axios'


const API_URL="http://localhost:5000/api/user/register"

//  add Client 
const addClientService  = async (userData) => {
 
    const response = await axios.post(API_URL,userData)
    return response.data
  }

  export  {
    addClientService
  }
  