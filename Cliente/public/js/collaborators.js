$(document).ready(function () {
    const httpRequest = new HttpRequest("https://webapikanaban.somee.com/v1/");
    const modal = new ProgressModal();
    const session = new Session("autenticated");
    let auth = session.getSession();
    if (auth == null) {
        window.location.href = "/";
    } else {
        loadInfo(session);
        loadUsers(httpRequest, modal);
        $("#btn-logout").click(function () {
            session.removeSession();
        });
        $("#update-update-user").click(function () {
            updateUser(httpRequest, modal);
        });
       
    }
});

function loadInfo(session){
        let auth = session.getSession();
        document.getElementById("card-name").innerText="Nombre: "+auth.name;
        document.getElementById("card-lastname").innerText="Apellido: "+auth.lastName;
        document.getElementById("card-role").innerText="Rol: "+auth.role; 
}

function loadUsers(httpRequest, modal) {
    const promise1 = Promise.resolve(httpRequest.get("GET", "login/allUser", true));
    promise1.then((value) => {
        console.log(value);
        var table = $('#table-users').DataTable({
            language: {
                "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            },
            scrollY: 300,
            scrollX: true,
            scrollCollapse: true,
            paging: true,
            autoFill: true,
            data: value,
            dom: 'Bfrtip',
            retrieve: true,
            destroy: true,
            bInfo: true,
            select: true,
            columns: [
                {
                    data: "id",
                    "visible": false,
                    "render": function (data, type, row, meta) {
                        return data;
                    }
                },
                {
                    data: "name",
                    "render": function (data, type, row, meta) {
                        return data;
                    }
                },
                {
                    data: "lastName",
                    "render": function (data, type, row, meta) {
                        return data;
                    }
                },
                {
                    data: "email",
                    "render": function (data, type, row, meta) {
                        return data;
                    }
                },
                {
                    data: "id",
                    "render": function (data, type, row, meta) {
                        return ' <button id="update-btn" class="btn btn-warning" type="submit"><i class="fas fa-tasks"></i></button>';
                    }
                },
            ]
        });
        modalInfo(table,httpRequest, modal)
        setTimeout(function () {
            modal.hiddenModal($("#processing-modal"));
        }, 1000);
 });

}
function modalInfo(table,httpRequest, modal){
    $('#table-users tbody').on('click', "#update-btn", function () {
        var row = $(this).parents('tr')[0];
        let user = table.row(row).data();  
        console.log(user);
        $('#exampleModal').modal();
        document.getElementsByName("id_collaborators")[0].value = user.id;
        document.getElementsByName("name_collaborators")[0].value = user.name;
        document.getElementsByName("lastname_collaborators")[0].value = user.lastName;
        document.getElementsByName("email_collaborators")[0].value = user.email;
        document.getElementsByName("password_collaborators")[0].value = user.password;    
    });
}
function updateUser(httpRequest, modal){
    let form = document.getElementById("form-update-user");
    let id = form.elements[0].value;
    let name = form.elements[1].value;
    let lastname = form.elements[2].value;
    let email = form.elements[3].value;
    let IdPosition = form.elements[5].value;
    let IdUserType =form.elements[4].value;
    let password = form.elements[6].value;
    let user = JSON.stringify({ "id": id, "name": name, "lastname": lastname, "email":email,"IdPosition": IdPosition, "IdUserType": IdUserType });
    console.log(user);
    const promise1 = Promise.resolve(httpRequest.put("PATCH", "login/updateProfile", user));
    promise1.then((value) => {
        setTimeout(function () {
            modal.hiddenModal($("#processing-modal"));
            window.location.reload();
        }, 1000);
    });
}
