const showAlert = (message, color) => {
    const newAlert=document.createElement('div');
    newAlert.classList.add('fixed', 'top-5', 'right-5', 'text-white', 'px-4', 'py-3', 'rounded-lg', 'shadow-lg','alerts','z-50');
    newAlert.innerHTML = message;
    newAlert.style.backgroundColor = color;
    document.body.insertBefore(newAlert, document.body.firstChild);
    setTimeout(() => {
        newAlert.remove();
        }, 1000);
    };