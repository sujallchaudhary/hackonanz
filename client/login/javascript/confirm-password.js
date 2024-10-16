const confirmPassword = async()=>{
    const password = document.getElementById('password').value;
    const cPassword = document.getElementById('cPassword').value;
    const link = document.location.href;
    const secret = link.split('=')[1];
    if(password !== cPassword){
        showAlert('Passwords do not match','red');
        return;
    }
    const request = await fetch('https://gdscbackend.sujal.info/password/resetPassword',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            token:secret,
            password:password
        })
    });
    const response = await request.json();
    if(response.success){
        showAlert('Password reset successful','green');
        setTimeout(() => {
            window.location.href = 'https://gdsc.sujal.info/login';
        }, 1000);
    }
    else{
        showAlert('Password reset failed','red');
    }
}
document.getElementById('confirmPasswordForm').addEventListener('submit', (e) => {
    e.preventDefault();
    confirmPassword();
});