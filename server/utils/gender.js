const axios = require('axios');
const gender = async (name)=>{
    const response= await axios.get(`https://api.genderize.io/?name=${name}`)
    return response.data.gender
}
module.exports=gender;