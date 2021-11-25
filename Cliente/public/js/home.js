$(document).ready(function () {
    const httpRequest = new HttpRequest("https://webapikanaban.somee.com/v1/");
    const modal = new ProgressModal();
    const session = new Session("autenticated");
    let auth = session.getSession();
    if (auth == null) {
        window.location.href = "/";
    } else {
        loadInfo(session);
        $("#btn-logout").click(function () {
           session.removeSession();
        });
    }
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});
function loadInfo(session){
    let auth = session.getSession();
      document.getElementById("card-name").innerText="Nombre: "+auth.name;
      document.getElementById("card-lastname").innerText="Apellido: "+auth.lastName;
      document.getElementById("card-role").innerText="Rol: "+auth.role;
    
}