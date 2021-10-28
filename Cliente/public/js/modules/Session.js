class Session {

    constructor(key_name) {
        this.key_name = key_name;
    }
    setSession(data) {
        sessionStorage.setItem(this.key_name, JSON.stringify(data));
    }
    getSession() {
        return JSON.parse(sessionStorage.getItem(this.key_name));
    }
    removeSession(){
        sessionStorage.removeItem(this.key_name);
        window.location.reload();
    }
}