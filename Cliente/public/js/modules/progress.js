class ProgressModal{
     constructor(){
     
     }
     showModal(modal){
        let md = modal;
        md.modal({backdrop: 'static', keyboard: false});
        md.modal('show');
     }

     hiddenModal(modal){
        let md = modal;
        md.modal('hide');
     }
}