// Submit Login
function loginFormSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create an object with the form data
    const formData = {
    email: email,
    password: password
    };

    // Convert the object to JSON
    const jsonData = JSON.stringify(formData);

    fetch(`${appUrl}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    })
    .then(response => {
        if (!response.ok) {
            alert("Your email or password is incorrect");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        sessionStorage.setItem('token', data.token);

        function decodeJwt(token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
                return JSON.parse(jsonPayload);
        }
        
        var savedData = sessionStorage.getItem('token');

        const decodedPayload = decodeJwt(savedData);
        
        if (decodedPayload.admin === false) {
            window.location.href = "../mainPage/autumn_schedule.html";
        }else{
            window.location.href = "../adminPage/admin.html";
        }
        
    })
    .catch(error => {
        console.error('Error during Login:', error.message);
    });
}