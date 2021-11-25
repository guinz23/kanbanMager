$(document).ready(function () {
    const httpRequest = new HttpRequest("https://webapikanaban.somee.com/v1/");
    const modal = new ProgressModal();
    const session = new Session("autenticated");
    let auth = session.getSession();
    if (auth === Object(auth)) {
        window.location.href = "home.html";
    } else {
        $("#btn-submit-reset-password").click(function () {
            resetPassword(httpRequest, modal);
        });
    }
});
function resetPassword(httpRequest,modal){
    let form = document.getElementById("form-reset-password");
    let email = form.elements[0].value;
    if (email == "") {
        new Toast({
            message: 'El campo correo es requerido',
            type: 'danger'
        });
    }else{
        let user = JSON.stringify({ "email": email });
        modal.s
        const promise1 = Promise.resolve(httpRequest.post("POST", "login/resetPassword", user,false));
        promise1.then((value) => {
            new Toast({
                message: value,
                type: 'success'
            });
            setTimeout(function () {
                modal.hiddenModal($("#processing-modal"));
            }, 1000);
            setTimeout(function () {
                window.location.href = "index.html";
            }, 3000);
        });
    }
   
}
