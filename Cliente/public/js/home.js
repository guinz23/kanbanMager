$(document).ready(function () {
    const httpRequest = new HttpRequest("https://webapikanaban.somee.com/v1/");
    const modal = new ProgressModal();
    const session = new Session("autenticated");
    let auth = session.getSession();
    if (auth == null) {
        window.location.href = "/";
    } else {
        loadInfo(session);
        loadtaskbyState(httpRequest,modal);
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
 function loadtaskbyState(httpRequest,modal){
    const promise1 = Promise.resolve(httpRequest.get("GET", "task/taskByProject", true));
    promise1.then((value) => {
        console.log(value);
       const becoming =  value.filter(task => task.stateProject == "A");
       const pending = value.filter(task => task.stateProject == "P");
       const finished = value.filter(task => task.stateProject == "T");
        if(pending!=[]){
           becoming.forEach(element => {
            var li = document.createElement('li');
            var label = document.createElement('label');
       
            label.htmlFor = element.name;
            label.appendChild(document.createTextNode("-"+element.nameTask));
            li.append(label);
            var ul = document.getElementById('pending');
            ul.appendChild(li);
          
           });
        }
        if(pending!=[]){
            pending.forEach(element => {
             var li = document.createElement('li');
             var label = document.createElement('label');
             label.htmlFor = element.name;
             label.appendChild(document.createTextNode("-"+element.nameTask));
             li.append(label);
             var ul = document.getElementById('becoming');
             ul.appendChild(li);
           
            });
         }
         if(finished!=[]){
            finished.forEach(element => {
             var li = document.createElement('li');
             var label = document.createElement('label');
             label.htmlFor = element.name;
             label.className = "form'label";
             label.appendChild(document.createTextNode("-"+element.nameTask));
             li.append(label);
             var ul = document.getElementById('finished');
             ul.appendChild(li);
            });
         }
        setTimeout(function () {
            modal.hiddenModal($("#processing-modal"));
        }, 1000);
    });

 }