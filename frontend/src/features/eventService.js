
import axios from 'axios'



const API_URL = "http://localhost:5000/api/place/create"
let user = localStorage.getItem("user");


//  add event
const addEventService = async (userData) => {
  const config = {
    headers: {
      token:  JSON.parse(user).token 
    },
  };
  try {
    const response = await axios.post(API_URL, userData,config)
    return response.data
  } catch (err) {
    console.log(err.message)
  }
}

export {
  addEventService,
}
