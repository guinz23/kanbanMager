$(document).ready(function () {
    const httpRequest = new HttpRequest("https://webapikanaban.somee.com/v1/");
    const modal = new ProgressModal();
    const session = new Session("autenticated");
    let auth = session.getSession();
    if (auth == null) {
        window.location.href = "/";
    } else {
        if (auth.role == "manager") {
            $(".sidebarManager").attr("hidden", false);
            $(".container-Manager").attr("hidden", false);
            loadInfo(session, auth.role);
            $("#btn-logout").click(function () {
                session.removeSession();
            });
            $("#btn-update-profile-manager").click(function () {
                updateProfileManager(httpRequest, modal, session);
            });
            $("#btn-delete-profile-manager").click(function () {
                removeAccountManager(httpRequest, modal, session);
            });
        } else {
            $(".sidebarEmployee").attr("hidden", false);
            $(".container-employee").attr("hidden", false);
            loadInfo(session, auth.role);
            $("#btn-logout-employee").click(function () {
                session.removeSession();
            });
            $("#btn-update-profile-employee").click(function () {
                updateProfileEmployee(httpRequest, modal, session);
            });
            $("#btn-delete-profile-employee").click(function () {
                removeAccountEmployee(httpRequest, modal, session);
            });
        }
    }
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});
function loadInfo(session, role) {
    if (role == "manager") {
        let auth = session.getSession();
        document.getElementById("card-name-manager").innerText = "Nombre: " + auth.name;
        document.getElementById("card-lastname-manager").innerText = "Apellido: " + auth.lastName;
        document.getElementsByName("name_user_manager")[0].value = auth.name;
        document.getElementsByName("lastname_user_manager")[0].value = auth.lastName;
        document.getElementsByName("email_user_manager")[0].value = auth.email;
        document.getElementsByName("id_user_manager")[0].value = auth.id;
    } else {
        let auth = session.getSession();
        document.getElementById("card-name-employee").innerText = "Nombre: " + auth.name;
        document.getElementById("card-lastname-employee").innerText = "Apellido: " + auth.lastName;
        document.getElementById("card-role-employee").innerText = "Rol: " + auth.role;
        document.getElementsByName("name_user_employee")[0].value = auth.name;
        document.getElementsByName("lastname_user_employee")[0].value = auth.lastName;
        document.getElementsByName("email_user_employee")[0].value = auth.email;
        document.getElementsByName("id_user_employee")[0].value = auth.id;
    }
}
function updateProfileEmployee(httpRequest, modal, session) {
    let form = document.getElementById("form-update-profile-employee");
    let id = form.elements[0].value;
    let name = form.elements[1].value;
    let lastname = form.elements[2].value;
    let email = form.elements[3].value;
    let password = form.elements[4].value;
    if (ValidatePassword(password) == true) {
        let user = JSON.stringify({ "id": id, "name": name, "lastname": lastname, "email": email, "password": password });
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
function updateProfileManager(httpRequest, modal, session) {
    let form = document.getElementById("form-update-profile-manager");
    let id = form.elements[0].value;
    let name = form.elements[1].value;
    let lastname = form.elements[2].value;
    let email = form.elements[3].value;
    let password = form.elements[4].value;
    if (ValidatePassword(password) == true) {
        let user = JSON.stringify({ "id": id, "name": name, "lastname": lastname, "email": email, "password": password });
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
    console.log(password.length);
    let state = true;
    if (password.length < 8) {
        state = false;
    }
    return state
}

function removeAccountManager(httpRequest, modal, session) {
    if(ComfirmDelete()==true){
        let auth = session.getSession();
        let Id = auth.id;
        let user = JSON.stringify({ "Id": Id });
        const promise1 = Promise.resolve(httpRequest.delete("DELETE", "login/deleteAccount", user));
        promise1.then((value) => {
            new Toast({
                message: value,
                type: 'success'
            });
            setTimeout(function () {
                modal.hiddenModal($("#processing-modal"));
                session.removeSession();
            }, 3000);
        });
    }
}
function removeAccountEmployee(httpRequest, modal, session) {
    if(ComfirmDelete()==true){
        let auth = session.getSession();
        let Id = auth.id;
        let user = JSON.stringify({ "Id": Id });
        const promise1 = Promise.resolve(httpRequest.delete("DELETE", "login/deleteAccount", user));
        promise1.then((value) => {
            new Toast({
                message: value,
                type: 'success'
            });
            setTimeout(function () {
                modal.hiddenModal($("#processing-modal"));
                session.removeSession();
            }, 3000);
        });
    }
}

function ComfirmDelete() {
    var value;
    var opcion = window.confirm("Esta seguro de Eliminar la cuenta! Presione en Aceptar o Cancelar");
    if (opcion == true) {
        value = true;
    } else {
       value = false;
    }
    return value;
}