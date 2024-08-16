const logOut = document.getElementById("logOut")

logOut.addEventListener("click", function(e){
    localStorage.removeItem('username')
    window.location.href = '/login.html'; //relative to domain
})