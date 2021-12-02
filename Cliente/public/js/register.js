$(document).ready(function () {
    const httpRequest = new HttpRequest("https://webapikanaban.somee.com/v1/");
    const modal = new ProgressModal();
    const session = new Session("autenticated");
    let auth = session.getSession();
    if (auth === Object(auth)) {
        window.location.href = "home.html";
    } else {
        $("#btn-submit-register").click(function () { 
            register(httpRequest, modal, session);
        });
    }
});
function register(httpRequest, modal, session) {
    let form = document.getElementById("form-register");
    let name = form.elements[0].value;
    let lastname = form.elements[1].value;
    let email = form.elements[2].value;
    let password = form.elements[3].value;
    let passwordconfirm = form.elements[4].value;
    let IdPosition ="F1F10F5C-FA41-4765-BB68-8D59AED93C73";
    let IdUserType = "8F9D6A86-7018-4E3B-B25D-40E5C33BFFD5";
    if (name == "" || lastname == "" || email == "" || password == "" || passwordconfirm == "" || IdUserType == "") {
        new Toast({
            message: 'Faltan campos por llenar para poder registrarse',
            type: 'danger'
        });
    } else {

        let user = JSON.stringify({ "name": name, "lastname": lastname, "email": email, "password": password, "IdPosition": IdPosition , "IdUserType": IdUserType});
        const promise1 = Promise.resolve(httpRequest.post("POST", "login/register", user));
        promise1.then((value) => {
            setTimeout(function () {
                modal.hiddenModal($("#processing-modal"));
                window.location.href = "index.html";
            }, 1000);
        });
    }
}
