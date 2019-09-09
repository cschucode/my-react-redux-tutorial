import store from './store/index';
import { addRelapseDate } from './actions/index';

console.log('store_in_index::', index);

window.store = store;
window.addRelapseDate = addRelapseDate;
