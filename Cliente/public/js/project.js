$(document).ready(function () {
    const httpRequest = new HttpRequest("https://webapikanaban.somee.com/v1/");
    const modal = new ProgressModal();
    const session = new Session("autenticated");
    let auth = session.getSession();
    if (auth == null) {
        window.location.href = "/";
    } else {

        if(auth.role =="manager"){
            $(".sidebarManager").attr("hidden",false);
            $(".container-Manager").attr("hidden",false);          
        loadInfo(session,auth.role);
        getCollaborators(httpRequest, modal);
        loadCompanies(httpRequest);
        loadProject(httpRequest, modal);
        $("#btn-logout-manager").click(function () {
            session.removeSession();
        });
        $("#btn-add-project").click(function () {
            registerProject(httpRequest, modal);
        });
        }else{
            $(".sidebarEmployee").attr("hidden",false);
            loadInfo(session,auth.role);
            $("#btn-logout-employee").click(function () {
               session.removeSession();
            });
        }
    }
});

function loadInfo(session,role){
    if(role =="manager"){
    let auth = session.getSession();
      document.getElementById("card-name-manager").innerText="Nombre: "+auth.name;
      document.getElementById("card-lastname-manager").innerText="Apellido: "+auth.lastName;
      document.getElementById("card-role-manager").innerText="Rol: "+auth.role;
    }else{
        let auth = session.getSession();
        document.getElementById("card-name-employee").innerText="Nombre: "+auth.name;
        document.getElementById("card-lastname-employee").innerText="Apellido: "+auth.lastName;
        document.getElementById("card-role-employee").innerText="Rol: "+auth.role;
    }
    
}
function getCollaborators(httpRequest, modal) {
    const promise1 = Promise.resolve(httpRequest.get("GET", "login/allUser", true));
    promise1.then((value) => {
        value.forEach(element => {
            var li = document.createElement('li');
            var checkbox = document.createElement('input')
            checkbox.type = 'checkbox';
            checkbox.id =  element.id;
            checkbox.name = 'users[]';
            checkbox.value =  element.id;
            var label = document.createElement('label')
            label.htmlFor = element.name;
            label.appendChild(document.createTextNode("-"+element.name));
            li.appendChild(checkbox);
            li.append(label);
             var ul = document.getElementById('ul');
             ul.appendChild(li);
        });

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
function registerProject(httpRequest, modal) {
    let form = document.getElementById("form-register-project");
    let Name = form.elements[0].value;
    let StartDate = form.elements[1].value;
    let DeliveryDate = form.elements[2].value;
    let TotalAmount = form.elements[3].value;
    let Descripción = form.elements[4].value;
    let IdCompany = form.elements[5].value;
    var users = $("input[name='users[]']:checked").map(function(){return $(this).val();}).get();
    let UsersOnProjectsTemps = [];
    users.forEach(element => {
        UsersOnProjectsTemps.push({ "IdUser": element});
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
function loadProject(httpRequest, modal) {
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
                {
                    data: "id",
                    "render": function (data, type, row, meta) {
                        return ' <button id="update-btn" class="btn btn-warning" type="submit"><i class="fas fa-edit"></i></button>';
                    }
                },
            ]
        });
        removeProject(table, httpRequest, modal);
        updateProject(table, httpRequest, modal);
        setTimeout(function () {
            modal.hiddenModal($("#processing-modal"));
        }, 1000);
    });

}
function removeProject(table, httpRequest, modal) {
    $('#table-projects tbody').on('click', "#delete-btn", function () {
        var row = $(this).parents('tr')[0];
        let project = table.row(row).data();
        let projectDelete = JSON.stringify({ "Id": project.id, "State": "E" });
        const promise1 = Promise.resolve(httpRequest.delete("DELETE", "project/deleteProject", projectDelete));
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
function updateProject(table, httpRequest, modal) {
    $('#table-projects').on('click', "#update-btn", function () {
        $("#btn-add-projects").text("Actualizar");
        $("#btn-add-projects").attr("id", "btn-update-projects");
        var row = $(this).parents('tr')[0];
        let project = table.row(row).data();
        let startDate = new Date(project.startDate);
        let deliveryDate =new Date(project.deliveryDate);
        let startDateFormatted = startDate.toISOString().split('T')[0];
        let deliveryDateFormatted = deliveryDate.toISOString().split('T')[0];Formatted = startDate.toISOString().split('T')[0];
        document.getElementsByName("project_name")[0].value = project.name;
        document.getElementsByName("startDate")[0].value = startDateFormatted;
        document.getElementsByName("endDate")[0].value = deliveryDateFormatted;
        $("#btn-update-projects").click(function () {
            let nameTemp = document.getElementsByName("name_company")[0].value;
            let emailTemp = document.getElementsByName("email_company")[0].value;
            let companyUpdate = JSON.stringify({ "Id": company.id,"Name":nameTemp,"Email": emailTemp });
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
        });
    });
}