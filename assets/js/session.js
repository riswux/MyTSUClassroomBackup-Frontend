function decodeJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
        return JSON.parse(jsonPayload);
}

const decodedPayload = decodeJwt(savedData);

if (decodedPayload.admin === false) {
    var admin = document.getElementById('administration');
    if (admin) {
        admin.style.display = 'none';
    }
    
    var home = document.getElementById('home');
    if (home) {
        home.href = '../mainPage/autumn_schedule.html';
    }
}else{
    var home = document.getElementById('home');
    if (home) {
        home.href = '../adminPage/admin.html';
    }
}

var backendUrl = decodedPayload.avatar
fetch(backendUrl)
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
  })
  .catch(error => {
    console.error('Error fetching image:', error.message);
});

if (decodedPayload.role === "Student") {
    function changeHref() {
        var myDiscButton = document.getElementById('myDiscButton');
        if (myDiscButton) {
            myDiscButton.onclick = function () {
                window.location.href = './student.html';
            }
        }
    }
}else{
    function changeHref() {
        var myDiscButton = document.getElementById('myDiscButton');
        if (myDiscButton) {
            myDiscButton.onclick = function () {
                window.location.href = './teacher.html';
            }
        }
    }
}