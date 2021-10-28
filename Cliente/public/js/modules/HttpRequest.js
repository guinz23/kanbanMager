class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    async get(type, method) {
        let modal = new ProgressModal();
        modal.showModal($("#processing-modal"));
        let dataTemp = "";
        await $.ajax({
            url: this.baseUrl + method,
            type: type,
            success: function (response, jqXHR) {
                if (jqXHR == "success") {
                    dataTemp = response;
                }
            },
            error: function (response, jqXHR) {
                if (jqXHR == "error") {
                    new Toast({
                        message: 'Se encontro un error al procesar la solicitud',
                        type: 'danger'
                    });
                }
            }
        });
        return dataTemp;
    }
    async post(type, method, data) {
        let modal = new ProgressModal();
        let dataTemp = "";
        modal.showModal($("#processing-modal"));
        await $.ajax({
            url: this.baseUrl + method,
            type: type,
            data: data,
            contentType: "application/json; charset=utf-8",
            success: function (response, jqXHR) {
                if (jqXHR == "success") {
                    dataTemp = response;
                }
            },
            error: function (response, jqXHR) {
                if (jqXHR == "error") {
                    setTimeout(function () {
                        new Toast({
                            message: 'Se encontro un error al procesar la solicitud',
                            type: 'danger'
                        });
                        modal.hiddenModal($("#processing-modal"));
                    }, 1000);
                }
            }
        });
        return dataTemp;
    }
    put() {

    }
    delete() {

    }
}