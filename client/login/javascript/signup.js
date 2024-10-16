const baseUrl='http://localhost:3000';
const signup = async () => {
    const rollNo = document.getElementById('rollNo').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const cPassword = document.getElementById('cPassword').value;
    if(password !== cPassword){
        showAlert('Passwords do not match','red');
        return;
    }
    const request = await fetch(baseUrl+'/auth/signup',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            rollNo:rollNo,
            password:password,
        })
    });
    const response = await request.json();
    if(response.success){
        showAlert('Signup Successful','green');
        localStorage.setItem('token',response.token);
        localStorage.setItem('data',JSON.stringify(response.data));
        setTimeout(() => {
            window.location.href = 'https://gdsc.sujal.info/login';
        }, 1000);
    }
    else{
        showAlert('Signup Failed','red');
    }
};
const fetchStudentData = async (rollNo) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rollNo })
    };
    const response = await fetch(`https://api.sujal.info/nsut/fetchStudentData`, options);
    const data = await response.json();
    return data;
};
document.getElementById('rollNo').addEventListener('input', async function(e) {
    const rollNo = this.value;
    if(rollNo.length===11){
        const data = await fetchStudentData(rollNo);
        if(data.error){
            showAlert(data.error, 'red');
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            return;
        }
        document.getElementById('userName').value = data.studentName;
        document.getElementById('email').value = data.email;
    }

});
document.getElementById('signUpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    signup();
});
document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('token')){
        window.location.href = 'https://gdsc.sujal.info/dashboard';
    }
});