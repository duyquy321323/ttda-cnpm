import { accountAction } from "./action";
import { combineReducers, createStore } from "redux";

const allReducers = combineReducers({
  account: accountAction,
})

// load information account
const loadInformationAccount = () => {
    try{
        const account = localStorage.getItem('user');
        if(account === null) return undefined;
        return JSON.parse(account);
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

// save information account
const saveInformationAccount = (account) => {
    try{
        const accountString = JSON.stringify(account);
        localStorage
            .setItem('user', accountString);
    } catch (e) {
        console.error(e);
    }
}

const store = createStore(
    allReducers,
    loadInformationAccount(),
)

store.subscribe(() => {
    saveInformationAccount(store.getState().account);
})

export default store;