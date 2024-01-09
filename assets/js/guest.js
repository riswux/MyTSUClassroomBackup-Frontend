var savedData = sessionStorage.getItem('token');
console.log(savedData);
if (savedData === null) {
    window.location.href = '../authPage/login.html';
}