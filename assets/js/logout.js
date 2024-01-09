document.getElementById('logoutLink').addEventListener('click', function (event) {
    event.preventDefault(); 
    
    fetch(`${appUrl}/api/logout`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${savedData}`
        },
    })
    .then(response => {
        if (response.ok) {
            console.log('Logout successful');
            sessionStorage.clear();
            window.location.href = "../authPage/login.html";
        } else {
            console.error('Logout failed');
        }
    })
    .catch(error => {
        console.error('Error during logout:', error);
    });
});