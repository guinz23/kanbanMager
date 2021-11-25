$(document).ready(function () {
    const httpRequest = new HttpRequest("https://webapikanaban.somee.com/v1/");
    const modal = new ProgressModal();
    const session = new Session("autenticated");
    let auth = session.getSession();
    if (auth == null) {
        window.location.href = "/";
    } else {
        loadInfo(session);
        getCollaborators(httpRequest, modal);
        loadCompanies(httpRequest);
        loadCollaboratorAssigned();
        loadProject(httpRequest,modal);
        $("#btn-logout").click(function () {
            session.removeSession();
        });
        $("#btn-add-project").click(function () {
            registerProject(httpRequest, modal);
        });
    }
});

function loadInfo(session) {
    let auth = session.getSession();
    document.getElementById("card-name").innerText = "Nombre: " + auth.name;
    document.getElementById("card-lastname").innerText = "Apellido: " + auth.lastName;
    document.getElementById("card-role").innerText = "Rol: " + auth.role;

}
function getCollaborators(httpRequest, modal) {
    const promise1 = Promise.resolve(httpRequest.get("GET", "login/allUser", true));
    promise1.then((value) => {
        console.log(value);
        var table = $('#tablecollaborators').DataTable({
            language: {
                "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            },
            scrollY: 300,
            scrollX: true,
            scrollCollapse: true,
            paging: false,
            autoFill: true,
            data: value,
            dom: 'Bfrtip',
            retrieve: true,
            destroy: true,
            bInfo: false,
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
                    data: "email",
                    "render": function (data, type, row, meta) {
                        return data;
                    }
                },
                {
                    data: "idPositionNavigation",
                    "render": function (data, type, row, meta) {
                        let position = "";
                        [data].forEach(element => {
                            position = element.namePosition;
                        });
                        return position;
                    }
                },
                {
                    data: "id",
                    "render": function (data, type, row, meta) {
                        return ' <button id="add-btn" class="btn btn-success" type="submit"><i class="fas fa-plus"></i></button>';
                    }
                },
            ]
        });
        selectUser(table);
        setTimeout(function () {
            modal.hiddenModal($("#processing-modal"));
        }, 1000);
    });

}
function selectUser(table) {
    $('#tablecollaborators tbody').on('click', "#add-btn", function () {
        var row = $(this).parents('tr')[0];
        let user = table.row(row).data()
        let userTemp = [];
        userTemp = JSON.parse(localStorage.getItem('userAssigned')) || [];
        userTemp.push(user);
        localStorage.setItem('userAssigned', JSON.stringify(userTemp));
        loadCollaboratorAssigned();
    });
}
function loadCompanies(httpRequest) {
    const promise1 = Promise.resolve(httpRequest.get("GET", "company/getAllCompany", true));
    promise1.then((value) => {
        var $mySelect = $('#id_companies');
        value.forEach(element => {
            var $option = $("<option/>", {
                value: element.id,
                text: element.name
            });
            $mySelect.append($option);
        });
    });
}
const loadCollaboratorAssigned = function () {
    const dataUser = JSON.parse(localStorage.getItem('userAssigned'));
    var table = $('#tablecollaboratorsAssigned').DataTable({
        language: {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
        scrollY: 300,
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        autoFill: true,
        data: dataUser,
        dom: 'Bfrtip',
        destroy: true,
        bInfo: false,
        select: true,
        searching: false,
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
                data: "id",
                "render": function (data, type, row, meta) {
                    return ' <button id="remove-btn" class="btn btn-danger" type="submit" ><i class="fas fa-trash-alt"></i></button>';
                }
            },
        ]
    });
    removeCollaboratorAssigned(table)
}
const removeCollaboratorAssigned = function (table) {
    $('#tablecollaboratorsAssigned tbody').on('click', "#remove-btn", function () {
        var row = $(this).parents('tr')[0];
        let user = table.row(row).data();
        console.log(user);
        var arrayTemp = JSON.parse(localStorage.getItem('userAssigned'));
        var someArray = arrayTemp.filter(x => x.id !== user.id);
        localStorage.setItem('userAssigned', JSON.stringify(someArray));
        location.reload();
    });
}
function registerProject(httpRequest, modal) {
    let form = document.getElementById("form-register-project");
    let Name = form.elements[0].value;
    let StartDate = form.elements[1].value;
    let DeliveryDate = form.elements[2].value;
    let TotalAmount = form.elements[3].value;
    let Descripción = form.elements[4].value;
    let IdCompany = form.elements[5].value;
    const UsersOnProjects = JSON.parse(localStorage.getItem('userAssigned'));
    let UsersOnProjectsTemps = [];
    UsersOnProjects.forEach(element => {
        UsersOnProjectsTemps.push({ "IdUser": element.id });
    });
    let project = JSON.stringify({ "Name": Name, "StartDate": StartDate, "DeliveryDate": DeliveryDate, "TotalAmount": TotalAmount, "Descripción": Descripción, "IdCompany": IdCompany, "UsersOnProjects": UsersOnProjectsTemps });
    const promise1 = Promise.resolve(httpRequest.post("POST", "project/registerProject", project, true));
    promise1.then((value) => {
        new Toast({
            message: value,
            type: 'success'
        });
        location.reload();
        setTimeout(function () {
            modal.hiddenModal($("#processing-modal"));
        }, 1000);
    });
}
function loadProject(httpRequest,modal) {
    const promise1 = Promise.resolve(httpRequest.get("GET", "project/getAllProject", true));
    promise1.then((value) => {
        console.log(value);
        var table = $('#table-projects').DataTable({
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
                    data: "startDate",
                    "render": function (data, type, row, meta) {
                        return data;
                    }
                },
                {
                    data: "deliveryDate",
                    "render": function (data, type, row, meta) {
                        return data;
                    }
                },
                {
                    data: "totalAmount",
                    "render": function (data, type, row, meta) {
                        return data;
                    }
                },
                {
                    data: "descripción",
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
            ]
        });
        removeProject(table,httpRequest,modal);
    });

}
function removeProject(table,httpRequest,modal){
    $('#table-projects tbody').on('click', "#delete-btn", function () {
        var row = $(this).parents('tr')[0];
        let project = table.row(row).data();
        let projectDelete= JSON.stringify({"Id":project.id,"State":"E"});
        const promise1 = Promise.resolve(httpRequest.delete("DELETE", "project/deleteProject",projectDelete ));
        promise1.then((value) => {
            new Toast({
                message: value,
                type: 'success'
            });
            location.reload();
            setTimeout(function () {
                modal.hiddenModal($("#processing-modal"));
            }, 1000);
        });
    });
}