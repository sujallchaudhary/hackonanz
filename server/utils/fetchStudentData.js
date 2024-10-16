const axios = require('axios');
const fetchStudentData = async (rollNo) => {
  const response = await axios.post('https://api.sujal.info/nsut/fetchProfile', {
    rollNo,
  });
  return response.data;
};
module.exports = fetchStudentData;
