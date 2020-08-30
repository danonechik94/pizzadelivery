import Cookies from 'js-cookie';

// Object key strings and numbers are allowed as keys
const checkKey = (key) => {
    return typeof key === 'string' || typeof key === 'number';
};

// TODO move to project utils
const checkLocalStorage = () => {
    const test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(error) {
        return false;
    }
}

const checkSessionStorage = () => {
    const testKey = 'test';
    try {
        Cookies.set(testKey, testKey);
        Cookies.remove(testKey, testKey);
        return true;
    } catch (error) {
        return false;
    }
};

// Adapter interface
// getData(key) => return JSON/obj/array/string
// setData(key, data) => save as JSON string or object by key

// Inmemory adapter stores data in a JS variable
// can only be used in SPA without page reload
const memoryAdapter= (() => {
    let data = {};

    const getData = (key) => {
        if (checkKey(key)) {
            return data[key];
        }

        return undefined;
    }; 

    const saveData = (key, data) => {
        if (checkKey(key)) {
            data[key] = data;
        }
    }; 

    return {
        getData,
        saveData,
    }
})();

const sessionAdapterConstructor = () => {
    const getData = (key) => {
        if (checkKey(key)) {
            try {
                return Cookies.getJSON(key);
            } catch (error) {
                return Cookies.get(key);
            }
        }

        return undefined;
    }; 

    const saveData = (key, data) => {
        if (checkKey(key)) {
            Cookies.set(key, data)
        }
    }; 


    return {
        getData,
        saveData,
    };
};

const localStorageAdapterConstructor = () => {
    const getData = (key) => {
        if (checkKey(key)) {
            try {
                return JSON.parse(localStorage.getItem(key));
            } catch (error) {
                console.error('Something went wrong while retrieving data from local storage');
                return memoryAdapter.getData(key);
            }
        }

        return undefined;
    }; 

    const saveData = (key, data) => {
        if (checkKey(key)) {
            try {
                localStorage.setItem(key, JSON.stringify(data));
            } catch (error) {
                console.error('Something went wrong while saving data to local storage');
                memoryAdapter.saveData(key, data);
            }
        }
    }; 


    return {
        getData,
        saveData,
    };
};

let finalAdapter;
if (checkLocalStorage()) {
    finalAdapter = localStorageAdapterConstructor();
} else if (checkSessionStorage()) {
    finalAdapter = sessionAdapterConstructor();
} else {
    finalAdapter = memoryAdapter;
}


export default () => { return finalAdapter };