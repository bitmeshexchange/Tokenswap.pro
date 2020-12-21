import dva from 'dva';
import router from './router';
// import createLoading from 'dva-loading';
import './common/getCurrAbsPath';
import './common/public_path';
import './index.css';

if (window.location.hostname.indexOf('volt') < 0 && window.location.hostname.indexOf('local') < 0) {
    // window.location.href = 'https://volt.id'

}

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use(createLoading());

// 3. Model
// app.model(require('./models/price').default);


// 4. Router
app.router(router);

// 5. Start
app.start('#root');
