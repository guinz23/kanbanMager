$(document).ready(function () {
    const httpRequest = new HttpRequest("https://webapikanaban.somee.com/v1/");
    const modal = new ProgressModal();
    const session = new Session("autenticated");
    let auth = session.getSession();
    if (auth == null) {
        window.location.href = "/";
    } else {
            loadInfo(session);
            $("#btn-logout").click(function () {
           session.removeSession();
            });
            $("#btn-update-profile").click(function () {
                updateProfile(httpRequest, modal,session);
            });
    }
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});
function loadInfo(session) {
    let auth = session.getSession();
    document.getElementById("card-name").innerText = "Nombre: " + auth.name;
    document.getElementById("card-lastname").innerText = "Apellido: " + auth.lastName;
    document.getElementById("card-role").innerText = "Rol: " + auth.role;
    document.getElementsByName("name_user")[0].value = auth.name;
    document.getElementsByName("lastname_user")[0].value = auth.lastName;
    document.getElementsByName("email_user")[0].value = auth.email;
    document.getElementsByName("id_user")[0].value = auth.id;
}
function updateProfile(httpRequest, modal,session){ 
    let form = document.getElementById("form-update-profile");
    let id = form.elements[0].value;
    let name = form.elements[1].value;
    let lastname = form.elements[2].value;
    let email = form.elements[3].value;
    let password = form.elements[4].value;
    if(ValidatePassword(password)==true){
        let user = JSON.stringify({ "id":id, "name": name, "lastname": lastname, "email": email, "password": password});
        const promise1 = Promise.resolve(httpRequest.put("PATCH", "login/updateProfile", user));
        promise1.then((value) => {
            new Toast({
                message: value,
                type: 'success'
            });
            setTimeout(function () {
                modal.hiddenModal($("#processing-modal"));
                session.removeSession();
                window.location.reload();
            }, 2000);
        });
    } else {
        new Toast({
            message: 'La Contraseña debe tener un minino de 8 caracteres',
            type: 'danger'
        });
    }
}
function ValidatePassword(password) {
    let state = true;
    if (password.length < 8) {
        state = false;
    }
    return state
}