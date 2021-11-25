$(document).ready(function () {
    const httpRequest = new HttpRequest("https://webapikanaban.somee.com/v1/");
    const modal = new ProgressModal();
    const session = new Session("autenticated");
    let auth = session.getSession();
    if (auth == null) {
        window.location.href = "/";
    } else {
        loadInfo(session);
        $('#id_projects').on('change', function() {
            let id_project= this.value;
            loadUserOnProject(httpRequest,modal,id_project);
          });
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
function loadProject(httpRequest,modal) {
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
function loadUserOnProject(httpRequest,modal,id_project){
    let project =JSON.stringify({ "id":id_project});
    const promise1 = Promise.resolve(httpRequest.post("POST", "project/usersOnProject",project, true));
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