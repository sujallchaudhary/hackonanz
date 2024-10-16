const forgotPassword =  async()=>{
    const email = document.getElementById('email').value;
    const request = await fetch('https://gdscbackend.sujal.info/password/forgotPassword',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email:email
        })
    });
    const response = await request.json();
    if(response.success){
        showAlert('Password reset link sent to your email','green');
        setTimeout(() => {
            window.location.href = 'https://gdsc.sujal.info/login';
        }, 1000);
    }
    else{
        showAlert('Password reset failed','red');
    }
}
document.getElementById('forgotPasswordForm').addEventListener('submit', (e) => {
    e.preventDefault();
    forgotPassword();
});
