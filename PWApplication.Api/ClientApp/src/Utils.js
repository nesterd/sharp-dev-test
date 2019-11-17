export default {
    saveAuth: (token) => {
        localStorage.setItem("token", token);
    },

    clearAuth: () => {
        localStorage.removeItem("token");
    },

    isLogged: () => {
        let item = localStorage.getItem("token");
        if (item) {
            return true;
        } else {
            return false;
        }
    },

    getToken: () => {
        let item = localStorage.getItem("token");
        let token = null;
        if (item) {
            token = item;
        }
        return token;
    },

    async fetchAuth(url, method="GET", data={}){
        let options = 
        {
            method: method, 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.getToken()
            },
        }
        if(method === "POST" || method === "PUT"){
            options.body = JSON.stringify(data);
        }
        return await fetch(url, options);
    },

    getErrors: (fetchResponse) => {
        if(fetchResponse === undefined){
            return [];
        }
        let errors = [];
        let keys = fetchResponse;

        if(fetchResponse.errors !== undefined){
            keys = fetchResponse.errors;
        }

        for(let key in keys){
            const innerErrors = keys[key];
            innerErrors.forEach(function(error,i){
                errors.push(error);
            });
        }
        

        return errors;
    }
}