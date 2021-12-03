$(document).ready(function () {
    const httpRequest = new HttpRequest("https://webapikanaban.somee.com/v1/");
    const modal = new ProgressModal();
    const session = new Session("autenticated");
    let auth = session.getSession();
    if (auth == null) {
        window.location.href = "/";
    } else {
            loadInfo(session);
            loadTaskByUser(httpRequest,modal,session);
            $("#btn-logout-employee").click(function () {
               session.removeSession();
            });
            $("#update-task").click(function () {
              updateTask(httpRequest,modal);
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
}
function loadTaskByUser(httpRequest,modal,session){
    let auth = session.getSession();
    let user=  JSON.stringify({"Id":auth.id});
    const promise1 = Promise.resolve(httpRequest.post("POST", "task/taskByUser",user, true));
    promise1.then((value) => {
        var table = $('#table-task-user').DataTable({
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
                    data: "state",
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
        modalInfo(table);
    });
    setTimeout(function () {
        modal.hiddenModal($("#processing-modal"));
    }, 1000);
}
function modalInfo(table){
    $('#table-task-user tbody').on('click', "#update-btn", function () {
        var row = $(this).parents('tr')[0];
        let task = table.row(row).data();
        console.log(task)
        $('#exampleModal').modal();
        // document.getElementsByName("name_company")[0].value = company.name;
        // document.getElementsByName("email_company")[0].value = company.email;
        // document.getElementsByName("id_company")[0].value = company.id;
        
    });
}

function updateTask(httpRequest,modal){

}