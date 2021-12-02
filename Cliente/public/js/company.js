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
            registerCompany(httpRequest, modal);
        });
        $("#btn-cancel-company").click(function () {
            clearInput();
        });
        $("#btn-update-company").click(function () {
            updateCompany(httpRequest, modal);
        });
    }
});
function loadInfo(session) {
    let auth = session.getSession();
    document.getElementById("card-name").innerText = "Nombre: " + auth.name;
    document.getElementById("card-lastname").innerText = "Apellido: " + auth.lastName;
    document.getElementById("card-role").innerText = "Rol: " + auth.role;

}
function registerCompany(httpRequest, modal) {
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
        loadTable(httpRequest, modal);
        clearInput();
        setTimeout(function () {
            modal.hiddenModal($("#processing-modal"));
        }, 1000);
    });
}

function loadTable(httpRequest, modal) {
    const promise1 = Promise.resolve(httpRequest.get("GET", "company/getAllCompany", true));
    promise1.then((value) => {
        var table = $('#table-company').DataTable({
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
                    data: "email",
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
                {
                    data: "id",
                    "render": function (data, type, row, meta) {
                        return ' <button id="delete-btn" class="btn btn-danger" type="submit"><i class="fas fa-trash-alt"></i></button>';
                    }
                },
                {
                    data: "id",
                    "render": function (data, type, row, meta) {
                        return ' <button id="update-btn" class="btn btn-warning" type="submit"><i class="fas fa-edit"></i></button>';
                    }
                },
            ]

        });
        removeCompany(table, httpRequest, modal);
        loadInfoCompanyInputs(table, httpRequest, modal);
        setTimeout(function () {
            modal.hiddenModal($("#processing-modal"));
        }, 1000);
    });

}
function clearInput() {
    document.getElementsByName("name_company")[0].value = "";
    document.getElementsByName("email_company")[0].value = "";
}

function removeCompany(table, httpRequest, modal) {
    $('#table-company tbody').on('click', "#delete-btn", function () {
        var row = $(this).parents('tr')[0];
        let company = table.row(row).data();
        let companyDelete = JSON.stringify({ "Id": company.id, "State": "E" });
        const promise1 = Promise.resolve(httpRequest.delete("DELETE", "company/deleteCompany", companyDelete));
        promise1.then((value) => {
            new Toast({
                message: value,
                type: 'success'
            });
            setTimeout(function () {
                modal.hiddenModal($("#processing-modal"));
            }, 1000);
            location.reload();
        });
    });
}

function loadInfoCompanyInputs(table, httpRequest, modal) {
    $('#table-company tbody').on('click', "#update-btn", function () {
        $("#btn-add-company").attr("hidden",true);
        $("#div-btn-add-company").attr("hidden",true);
        $("#btn-update-company").attr("hidden",false);
        var row = $(this).parents('tr')[0];
        let company = table.row(row).data();
        document.getElementsByName("name_company")[0].value = company.name;
        document.getElementsByName("email_company")[0].value = company.email;
        document.getElementsByName("id_company")[0].value = company.id;
        
    });
}
function updateCompany(httpRequest, modal){
    let nameTemp = document.getElementsByName("name_company")[0].value;
    let emailTemp = document.getElementsByName("email_company")[0].value;
    let idTemp = document.getElementsByName("id_company")[0].value;
    let companyUpdate = JSON.stringify({ "Id": idTemp,"Name":nameTemp,"Email": emailTemp });
    const promise1 = Promise.resolve(httpRequest.put("PATCH", "company/updateCompany", companyUpdate));
    promise1.then((value) => {
        new Toast({
            message: value,
            type: 'success'
        });
        setTimeout(function () {
            modal.hiddenModal($("#processing-modal"));
        }, 2000);
        location.reload();
    });
}