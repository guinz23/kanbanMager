$(document).ready(function () {
    const httpRequest = new HttpRequest("https://webapikanaban.somee.com/v1/");
    const modal = new ProgressModal();
    const session = new Session("autenticated");
    let auth = session.getSession();
    if (auth == null) {
        window.location.href = "/";
    } else {
        loadInfo(session);
        $('#id_projects').on('change', function () {
            let id_project = this.value;
            loadUserOnProject(httpRequest, modal, id_project);
        });
        loadProject(httpRequest, modal);
        loadPriority(httpRequest, modal);
        loadTtask(httpRequest, modal);
        $("#btn-logout").click(function () {
            session.removeSession();
        });
        $("#btn-add-assignments").click(function () {
            registerTask(httpRequest, modal);
        });
    }
});

function loadInfo(session) {
    let auth = session.getSession();
    document.getElementById("card-name").innerText = "Nombre: " + auth.name;
    document.getElementById("card-lastname").innerText = "Apellido: " + auth.lastName;
    document.getElementById("card-role").innerText = "Rol: " + auth.role;

}
function loadProject(httpRequest, modal) {
    const promise1 = Promise.resolve(httpRequest.get("GET", "project/getAllProject", true));
    promise1.then((value) => {
        var $mySelect = $('#id_projects');
        value.forEach(element => {
            var $option = $("<option/>", {
                value: element.id,
                text: element.name
            });
            $mySelect.append($option);
        });
    });
    setTimeout(function () {
        modal.hiddenModal($("#processing-modal"));
    }, 1000);
}
function loadUserOnProject(httpRequest, modal, id_project) {
    let project = JSON.stringify({ "id": id_project });
    const promise1 = Promise.resolve(httpRequest.post("POST", "project/usersOnProject", project, true));
    promise1.then((value) => {
        var $mySelect = $('#id_user_on_project');
        $mySelect.empty();
        value.forEach(element => {
            var $option = $("<option/>", {
                value: element.id,
                text: element.name
            });
            $mySelect.append($option);
        });
    });
    setTimeout(function () {
        modal.hiddenModal($("#processing-modal"));
    }, 1000);
}
function loadPriority(httpRequest, modal) {
    const promise1 = Promise.resolve(httpRequest.get("GET", "priority/getAllPriorities", true));
    promise1.then((value) => {
        var $mySelect = $('#id_priority');
        value.forEach(element => {
            var $option = $("<option/>", {
                value: element.id,
                text: element.name
            });
            $mySelect.append($option);
        });
    });
    setTimeout(function () {
        modal.hiddenModal($("#processing-modal"));
    }, 1000);
}

function registerTask(httpRequest, modal) {
    let form = document.getElementById("form-register-assignments");
    let Name = form.elements[0].value;
    let StartDate = form.elements[1].value;
    let DeliveryDate = form.elements[2].value;
    let Amount = form.elements[3].value;
    let IdPriority = form.elements[4].value;
    let Description = form.elements[5].value;
    let IdProject = form.elements[6].value;
    let IdUserAssigned = form.elements[7].value;
    let State = "A";
    let task = JSON.stringify({
        "Name": Name,
        "Description":Description,
        "StartDate": StartDate,
        "DeliveryDate": DeliveryDate,
        "Amount": Amount,
        "IdUserAssigned": IdUserAssigned,
        "IdPriority": IdPriority,
        "IdProject": IdProject,
        "State": "A"
    });
    const promise1 = Promise.resolve(httpRequest.post("POST", "task/registerTask", task, true));
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

 function loadTtask(httpRequest,modal){
    const promise1 = Promise.resolve(httpRequest.get("GET", "task/getAllTask", true));
    promise1.then((value) => {
        console.log(value);
        var table = $('#table-task').DataTable({
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
                        let now = new Date(data);
                        var dateString = moment(now).format('DD-MM-YYYY');
                        return dateString;
                    }
                },
                {
                    data: "deliveryDate",
                    "render": function (data, type, row, meta) {
                        let now = new Date(data);
                        var dateString = moment(now).format('DD-MM-YYYY');
                        return dateString;
                    }
                },
                {
                    data: "amount",
                    "render": function (data, type, row, meta) {
                        return data;
                    }
                },
                {
                    data: "description",
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
         removeTask(table,httpRequest,modal);
    });

 }

 function removeTask(table,httpRequest,modal){
    $('#table-task tbody').on('click', "#delete-btn", function () {
        var row = $(this).parents('tr')[0];
        let task = table.row(row).data();
        let taskDelete= JSON.stringify({"Id":task.id,"State":"E"});
        const promise1 = Promise.resolve(httpRequest.delete("DELETE", "task/deleteTask",taskDelete ));
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
