$(document).ready(function () {
    const session = new Session("autenticated");
    let auth = session.getSession();
    if (auth === Object(auth)) {
        window.location.href = "home.html";
    } else {
        $('.reset-password').on("click",function(){
            window.location.href = "resetPassword.html";
        })
        $('.create-account').on("click",function(){
            window.location.href = "register.html";
        })
    }
});
