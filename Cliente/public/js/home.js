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
                loadtaskbyState(httpRequest,modal);

            $("#btn-logout-manager").click(function () {
               session.removeSession();
            });
        }else{
               $(".sidebarEmployee").attr("hidden",false);
               $(".container-employee").attr("hidden",false);
                loadInfo(session,auth.role);
                loadtaskbyStateAndUser(httpRequest,modal,session);
            $("#btn-logout-employee").click(function () {
               session.removeSession();
            });
        }
    }
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
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
 function loadtaskbyState(httpRequest,modal){
    const promise1 = Promise.resolve(httpRequest.get("GET", "task/taskByProject", true));
    promise1.then((value) => {
       const becoming =  value.filter(task => task.stateProject == "P");
       const pending = value.filter(task => task.stateProject == "A");
       const finished = value.filter(task => task.stateProject == "T");
        if(becoming!=[]){
           becoming.forEach(element => {
            var li = document.createElement('li');
            var label = document.createElement('label');
       
            label.htmlFor = element.name;
            label.appendChild(document.createTextNode("-"+element.nameTask));
            li.append(label);
            var ul = document.getElementById('becoming');
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
             var ul = document.getElementById('pending');
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
 function loadtaskbyStateAndUser(httpRequest,modal,session){
    let auth = session.getSession();
    let user=  JSON.stringify({"Id":auth.id});
    const promise1 = Promise.resolve(httpRequest.post("POST", "task/taskByUser",user, true));
    promise1.then((value) => {
        console.log(value);
        const becoming =  value.filter(task => task.state == "P");
        const pending = value.filter(task => task.state == "A");
        const finished = value.filter(task => task.state == "T");
         if(becoming!=[]){
            becoming.forEach(element => {
             var li = document.createElement('li');
             var label = document.createElement('label');
        
             label.htmlFor = element.name;
             label.appendChild(document.createTextNode("-"+element.name));
             li.append(label);
             var ul = document.getElementById('becoming-employee');
             ul.appendChild(li);
           
            });
         }
         if(pending!=[]){
             pending.forEach(element => {
              var li = document.createElement('li');
              var label = document.createElement('label');
              label.htmlFor = element.name;
              label.appendChild(document.createTextNode("-"+element.name));
              li.append(label);
              var ul = document.getElementById('pending-employee');
              ul.appendChild(li);
            
             });
          }
          if(finished!=[]){
             finished.forEach(element => {
              var li = document.createElement('li');
              var label = document.createElement('label');
              label.htmlFor = element.name;
              label.className = "form'label";
              label.appendChild(document.createTextNode("-"+element.name));
              li.append(label);
              var ul = document.getElementById('finished-employee');
              ul.appendChild(li);
             });
          }
         setTimeout(function () {
             modal.hiddenModal($("#processing-modal"));
         }, 1000);
    });
 }