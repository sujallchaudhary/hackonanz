const login=async()=>{
    const baseUrl='http:localhost:3000'
    const rollNo = document.getElementById('rollNo').value;
    const password =  document.getElementById('password').value;
    const request = await fetch(baseUrl+'/auth/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            rollNo,
            password:password
        })
    });
    const response = await request.json();
    console.log(response);
    if(response.success){
        showAlert('Login Successful','green');
        localStorage.setItem('token',response.token);
        localStorage.setItem('data',JSON.stringify(response.data));
        setTimeout(() => {
            window.location.href = 'https://gdsc.sujal.info/dashboard';
        }, 1000);
    }
    else{
        showAlert('Login Failed','red');
    }
}
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    login();
});

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('token')){
        window.location.href = 'https://gdsc.sujal.info/dashboard';
    }
});
