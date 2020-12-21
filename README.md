# example

## 创建项目步骤

### 一、在云平台上新建项目
* 在 [腾讯云开发者平台](https://dev.tencent.com/user/projects/create) 上新建一个项目，用readme初始化

### 二、初始化项目
  参考dva的脚手架搭建方式 [dva快速上手](https://dvajs.com/guide/getting-started.html#%E5%AE%89%E8%A3%85-dva-cli)
1. 安装dva-cli (通过 npm 安装 dva-cli 并确保版本是 0.9.1 或以上)
    ```
    $ npm install dva-cli -g
    $ dva -v
    dva-cli version 0.9.1
    ```

2. 创建新应用
    ```
    $ dva new example
    ```

3. 启动开发服务器
    ```
    $ cd example
    $ npm start
    ```

4. 访问项目
    * 在浏览器里打开 http://localhost:8000

    若在运行的时候报以下错误
    ```
    ./node_modules/_history@4.9.0@history/esm/history.js
    Module not found: Can't resolve '@babel/runtime/helpers/esm/extends' 
    in '/Users/bdeals/Documents/workspace/example1/node_modules/_history@4.9.0@history/esm'
    ```
    则到package.json中修改"roadhog": "^2.5.0-beta.4" 的版本号，删除node_modules，npm i，重启再试

### 三、配置项目
1. 使用antd
    ```
    $ npm install antd babel-plugin-import --save
    ```
2. 编辑 .webpackrc，使 babel-plugin-import 插件生效。
    ```
    {
        "extraBabelPlugins": [
            ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
        ]
    }
    ```

### 定义路由
1. 新建一个文件表示一个页面，可放置在pages目录下，src/pages/list.js
    ```
    import React from 'react';

    const List = (props) => (
        <h2>Page List</h2>
    );

    export default List;
    ```

2. 在路由中添加list， 修改router.js文件
    ```
    import React from 'react';
    import { Router, Route, Switch } from 'dva/router';
    import IndexPage from './routes/IndexPage';
    import List from './pages/list';

    function RouterConfig({ history }) {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={IndexPage} />
                    <Route path="/list" exact component={List} />
                </Switch>
            </Router>
        );
    }

    export default RouterConfig;
    ```
    一个<Route>表示一个路由，在地址栏中访问时加上路由名字可访问对应的页面
    在浏览器里打开 http://localhost:8000/#/list ，你应该能看到前面定义的 <h2> 标签

    ### 定义Model
    1. 新建model models/price.js 
    ```
    export default {
        namespace: 'todo',
        state: [],
        reducers: {
            add(state, { payload: todo }) {
            // 保存数据到 state
            return [...state, todo];
            },
        },
        effects: {
            *save({ payload: todo }, { put, call }) {
            // 调用 saveTodoToServer，成功后触发 `add` action 保存到 state
            yield call(saveTodoToServer, todo);
            yield put({ type: 'add', payload: todo });
            },
        },
        subscriptions: {
            setup({ history, dispatch }) {
            // 监听 history 变化，当进入 `/` 时触发 `load` action
            return history.listen(({ pathname }) => {
                if (pathname === '/') {
                dispatch({ type: 'load' });
                }
            });
            },
        }
    };
    ```
    * model文件都在models文件夹下建立，namespace的名称与文件名一致
    * state 中放置数据初始值
    * reducers 处理同步操作，唯一可以修改state的地方
    * effects 处理异步操作和业务逻辑，不直接修改state
    * subscriptions 订阅，用于订阅一个数据源，然后根据需要 dispatch 相应的 action。在 app.start() 时被执行

    2. connect链接起来
     ```
    @connect(({example}) => {
        return {
            ...example
        }
    })
    ```
    3. 动态加载页面组件
    routers/dynamic.js //TODO


    ### 配置全局loading状态

    1. 配置dva项目的index.js文件
    ```
    import createLoading from 'dva-loading';

    const app = dva();

    app.use(createLoading());
    ```
    配置完成后，在任何一个 dva 的 routes 组件中就都会有一个 loading 对象
    
    2. 在connect中应用
    ```
    @connect(({example, loading}) => {
        const effects = loading.effects;
        return {
            ...example,
            loading: effects['example'],
        }
    })
    ```
    然后在ui中使用loading的值就可以了


    ### 配置国际化语言
    1. 国际化语言需要用域名访问地址，将本地localhost绑定到一个具体域名上，比如local.bitmesh.com
    2. 安装js-cookie
    ```
     npm i js-cookie
    ```
    3. 在导航上添加一个下拉菜单，放置要支持的语言选项 'src/pages/layout/lang'
    4. 在src下新建一个i18n的文件夹，放置语言内容，当前支持zh-cn中文 en-us英文两种，
    5. 需要其它语言支持时，只要在i18n的locales文件夹下建立对应的语言文件，并在i18n/langs.js文件中添加索引即可