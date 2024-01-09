var savedData = sessionStorage.getItem('token');

if (savedData !== null) {
    window.history.back();
}