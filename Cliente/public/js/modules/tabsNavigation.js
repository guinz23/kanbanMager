$(document).ready(function () {
        $('.home').on("click",function(){
            window.location.href = "home.html";
        })
        $('.company').on("click",function(){
            window.location.href = "company.html";
        })
        $('.project').on("click",function(){
            window.location.href = "project.html";
        })
        $('.assignments').on("click",function(){
            window.location.href = "assignments.html";
        })
        $('.tasks').on("click",function(){
            window.location.href = "tasks.html";
        })
        $('.collaborators').on("click",function(){
            window.location.href = "collaborators.html";
        })
        $('#btn-profile-employee').on("click",function(){
            window.location.href = "profile.html";
        });
        $('#btn-profile-manager').on("click",function(){
            window.location.href = "profile.html";
        });
});
