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
            ]
        });
        setTimeout(function () {
            modal.hiddenModal($("#processing-modal"));
        }, 1000);
 });

}