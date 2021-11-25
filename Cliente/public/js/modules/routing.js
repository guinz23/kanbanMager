$(document).ready(function () {
    const session = new Session("autenticated");
    let auth = session.getSession();
    if (auth === Object(auth)) {
        window.location.href = "home.html";
    } else {
        $('.create-account').on("click",function(){
            alert("action create");
        });
        $('.reset-password').on("click",function(){
            window.location.href = "resetPassword.html";
        })
    }
});
