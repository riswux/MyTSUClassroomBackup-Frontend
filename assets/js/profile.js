function profileFormSubmit(event) {
    event.preventDefault();
    
    let birthDateInput = document.getElementById('birthDate');
    let birthDateString = birthDateInput.value;
    let birthDate = new Date(birthDateString);
    let birthDateInMilliseconds = birthDate.getTime();

    let avatar = document.getElementById('avatar').value;

    let formData = new FormData(document.getElementById("profileForm"));
    formData.set('birthDate', birthDateInMilliseconds);

    fetch(`${appUrl}/api/profile`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${savedData}`
        },
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Profile Update failed: ${response.statusText}`);
        }
    })
    .then(data => {
        console.log('Profile Update successful:', data);

        if (avatar) {
            sessionStorage.setItem('token', data.newToken);
            var savedData = sessionStorage.getItem('token');
            
            function decodeJwt(token) {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                    return JSON.parse(jsonPayload);
            }
            
            const decodedPayload = decodeJwt(savedData);
            return fetch(decodedPayload.avatar)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                var imageUrl = URL.createObjectURL(blob);
                var imageElement = document.getElementById('avatarProfile');
                imageElement.src = imageUrl;
                
                var avatar = document.getElementById('avatarDisplay');
                if (avatar) {
                    avatar.src = imageUrl;
                }

                window.location.reload();
            })
            .catch(error => {
            console.error('Error fetching image:', error.message);
            });
        }

        window.location.reload();
    })
    .catch(error => {
        console.error('Error during Profile Update:', error.message);
    });
  }