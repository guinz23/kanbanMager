$(document).ready(function () {
    const httpRequest = new HttpRequest("https://webapikanaban.somee.com/v1/");
    const modal = new ProgressModal();
    const session = new Session("autenticated");
    let auth = session.getSession();
    if (auth === Object(auth)) {
        window.location.href = "home.html";
    } else {
        $("#btn-submit-login").click(function () {
            login(httpRequest, modal, session);
        });
    }
});

function login(httpRequest, modal, session) {
    let form = document.getElementById("form-login");
    let email = form.elements[0].value;
    let password = form.elements[1].value;
    if (email == "" || password == "") {
        new Toast({
            message: 'Los campos correo y constraseña son requeridos',
            type: 'danger'
        });
    } else {
        let user = JSON.stringify({ "email": email, "password": password });
        const promise1 = Promise.resolve(httpRequest.post("POST", "login/authenticate", user));
        promise1.then((value) => {
            session.setSession(value);
            setTimeout(function () {
                modal.hiddenModal($("#processing-modal"));
                window.location.href = "home.html";
            }, 1000);
        });
    }
}

function register() {

}