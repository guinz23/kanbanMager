$(document).ready(function () {
    const httpRequest = new HttpRequest("https://webapikanaban.somee.com/v1/");
    const modal = new ProgressModal();
    const session = new Session("autenticated");
    let auth = session.getSession();
    if (auth == null) {
        window.location.href = "/";
    } else {
        loadInfo(session);
        loadTable(httpRequest, modal);
        $("#btn-logout").click(function () {
            session.removeSession();
        });
        $("#btn-add-company").click(function () {
            registerCompany(httpRequest,modal);
        });
        $("#btn-cancel-company").click(function () {
         clearInput();
        });
    }
});
function loadInfo(session) {
    let auth = session.getSession();
    document.getElementById("card-name").innerText = "Nombre: " + auth.name;
    document.getElementById("card-lastname").innerText = "Apellido: " + auth.lastName;
    document.getElementById("card-role").innerText = "Rol: " + auth.role;

}
function registerCompany(httpRequest,modal) {
    let form = document.getElementById("form-register-company");
    let name = form.elements[0].value;
    let email = form.elements[1].value;
    let company = JSON.stringify({ "Name": name, "Email": email });
    const promise1 = Promise.resolve(httpRequest.post("POST", "company/registerCompany", company, true));
    promise1.then((value) => {
        new Toast({
            message: value,
            type: 'success'
        });
        loadTable(httpRequest,modal);
        clearInput();
        setTimeout(function () {
            modal.hiddenModal($("#processing-modal"));
        }, 1000);
    });
}

function loadTable(httpRequest, modal) {
    const promise1 = Promise.resolve(httpRequest.get("GET", "company/getAllCompany", true));
    promise1.then((value) => {
        $('#example').DataTable({
            language: {
                "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            },
            scrollY: 400,
            scrollX: true,
            scrollCollapse: true,
            paging: false,
            autoFill: true,
            data: value,
            destroy: true,
            columns: [
                {
                    data: "id",
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
                    data: "name",
                    "render": function (data, type, row, meta) {
                        return data;
                    }
                },
                {
                    data: "state",
                    "render": function (data, type, row, meta) {
                        return data;
                    }
                },
            ]
        });
        setTimeout(function () {
            modal.hiddenModal($("#processing-modal"));
        }, 1000);
    });

}
function clearInput(){
    document.getElementsByName("name_company")[0].value="";
    document.getElementsByName("email_company")[0].value="";
}