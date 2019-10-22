# My Redux with React Tutorial
A walkthrough to build a simple React app using Redux

## What is Redux

Redux is a predictable state container for JavaScript apps.

It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as live code editing combined with a time traveling debugger.

You can use Redux together with React, or with any other view library. It is tiny (2kB, including dependencies), but has a large ecosystem of add-ons available.

## Getting Started

There are a few different ways to get started with React and Redux. The **create-react-app** is a popular choice and let's you get started quickly without any configuration. However, for this tutorial we’ll create a very simple app with our own webpack, babel, and react setup. After that, we’ll be able to connect redux as our source of truth for state management.

Let's begin by creating a directory called **react-redux-tutorial** and navigate into that directory to start coding.

`$ mkdir react-redux-tutorial && cd react-redux-tutorial`

Create a directory for holding the file structure.

`$ mkdir -p src`

Run the following command and follow the prompts to create and initialize your **package.json** file.

`$ yarn init`

## Setting Up Webpack

We'll use webpack and it's configurable capabilities to bundle our app into a **dist** directory for deployment. Webpack injests raw React components for producting JavaScript code that (almost) every browser can understand.

Install the webpack package dependencies;

`$ yarn add webpack webpack-cli --dev`

Then, add the `webpack` command to your **package.json** file.

### package.json

```
"scripts": {
  "build": "webpack --mode production"
}
```

## Babel On

Babel is used to transform ES6 code into JavaScript code that can be understood by older browsers. This process is called transpiling. Webpack uses the babel-loader which is dependent on the Babel library. Babel is then configured to use presets.

The two presets we will use for this project are **@babel/preset-env** and **@babel/preset-react**. Let's being by pulling in our Babel dependencies.

`$ yarn add @babel/core babel-loader @babel/preset-env @babel/preset-react --dev`

Now, we configure Babel in the **.babelrc** file.

```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

At this point, we're ready to configure webpack using our fancy new `babel-loader`.

**webpack.config.js**

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}
```

This configuration runs every file ending in **.js** or **.jsx** through the `babel-loader` for transorming ES6 down to ES5.

On to Redux!

## To Redux Or Not To Redux

This is a very common question, "How do you know when you're ready to use Redux in your application?" Redux offers quite a few conveniences to JavaScript developers including debugging, action replaying, and much more. However, the following principles are a good place to start when considering to use Redux.

- Multiple React components need to access the same state but do not have any parent/child relationship
- You start to feel awkward passing down the state to multiple components with props.

For this tutorial, the question has already been answered. We're using Redux so let's add the Redux library and begin to familiarize ourself with the different parts and how they're glued together.

`$ yarn add redux --dev`

## The Store

The store orchestrates all the moving parts in Redux. The state of the entire application lives in the store.

Create a directory for the Store

`$ mkdir -p src/store`

And then create a file called **index.js** inside of this directory.

`$ touch src/store/index.js`

**index.js**

```
import { createStore } from "redux";
import rootReducer from "../reducers/index";

const store = createStore(rootReducer);

export default store;
```

As you can see, the store is a result of **createStore()** which is a function in the Redux library. It takes a reducer as it's first argument. Very important to note here that reducers produce the state of the application.

## What's a Reducer?

A Reducer is a JavaScript function that takes two parameters, the current state of the application and an Action. In our example, we'll be creating a simple reducer taking the initial state as the first parameter. The second parameter will our Action.

First create a directory for our **rootReducer**

`$ mkdir -p src/reducers`

Then create our **index.js** file inside of this directory.

`$ touch src/reducers/index.js`

**index.js**

```
const initialState = {
  timeSober: null,
  relapses: [],
};

function rootReducer (state = initialState, action) {
  return state;
};

export default rootReducer;
```

This Reducer doesn't do anything yet but return the initial state. We'll return to refactor that soon to implement our Actions. **Spoiler Alert**... Actions are next.

## Ready... Set... Actions!

While the Store is where the state of the application lives and Reducers are what produce the state of the application, Actions our the signal to the Reducer on how to change state. Actions are simple JavaScript objects. Every action must contain a type property for describing how the state should change. They can also have a payload which is data needed for modifying the state.

It's important to note that when an action gets **dispatched** the Reducer doesn't change the original state, but rather returns a copy of the state with the changes. It's also a best practice to wrap actions in functions called an **action creator**.

Create a directory for our Actions.

`$ mkdir -p src/actions`

Then create a file for our Actions.

`$ touch src/actions/index.js`

**index.js**

```
export const ADD_RELAPSE_DATE = 'ADD_RELAPSE_DATE';

export function addRelapseDate(payload) {
  return { type: ADD_RELAPSE_DATE, payload.date };
};
```

Because type value is a string and is common to typos and duplicates, we declare our action type as the constant variable `ADD_RELAPSE_DATE`.

## A Quick Recap Before Moving Forward

- The Redux **Store** is like a brain: it's in charge for orchestrating all the moving parts in Redux
- The **State** of the application lives in a single immutable object within the **Store**
- As soon as the **Store** receives an **Action**, it triggers a **Reducer**
- The **Reducer** returns the next **State**

The Reducer calculates the next state depending on the action type. It should also return the initial state when no action type matches. Switch statements are commonly used for handling action types and returning the appropriate

When the action type matches a valid clause the reducer calculates the next state and returns a new object.

## Refactoring Our Reducer

Open up **src/reducers/index.js** and update it as follows:

```
import { ADD_RELAPSE_DATE } from '../actions/index';

const initialState = {
  timeSober: null,
  relapses: [],
};

function rootReducer(state = initialState, action) {
  const type = action type;

  switch(type) {
    case ADD_RELAPSE_DATE:
      return Object.assign({}, state, {
          relapses: state.relapses.concat(action.payload),
        });
    default:
      return state;
  }
}

export default rootReducer;
```

**Redux protip:** the reducer will grow as your app will become bigger. You can split a big reducer into separate functions and combine them with **combineReducers**.

## Redux Store Methods

- getState for accessing the current state of an application
- dispatch for dispatching an action
- subscribe for listening on state changes

## Connecting React with Redux

First, let's add our webpack HTML plugins and loaders.

`$ yarn add webpack-html-plugin html-loader --dev`

And update **webpack.config.js** as follows:

```
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
```

Next let's add the **react**, **react-redux** and **react-dom** libraries that connect React and Redux in an efficient way.

`$ yarn add react react-redux react-dom --dev`

Once installed, the most important method you'll work with is **connect**. You will use connect with two or three arguments depending on the use case. The fundamental things to know are:

- mapStateToProps connects parts of the Redux State to the React component
- mapDispatchToProps connects Redux Actions to React Props

But is **mapStateToProps** enough to connect our React component to our Redux Store. No it is not. For this, we're going to use a **Provider** which is a high order component from **react-redux**. The **Provider** wraps up your React application and makes it aware of the Redux Store.

Modify our **src/index.js** filename

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './src/store/index';
import App from './src/components/App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
```

## But Wait There's More... Redux Dev Tools

By installing a plugin to your browser of choice and importing the **redux-devtools-extension**, you have the ability to view that state of your application within the console.

Browser Plugins for Redux Dev Tools:

- [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

Then add the library to your project.

`yarn add redux-devtools-extension --dev`

There are a few different ways to connect the dev tools to your application. Since we won't be using enhancer or middleware, we'll take a straigtforward approach and use **devToolsEnhancer** in our **Store**.

```
import { devToolsEnhancer } from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  devToolsEnhancer(/* custom devtool options */)
);
```

## It's Time to Build Our React components

Now that we have Redux connected to our React application, we can begin developing our components. This app will be a simple sobriety tracker that allows the user to specify the day they got clean and receive the length of time they have been sober. There will also be a relapse button that resets the length of time they have been sober and puts the date into a list for future reference.

The components:

- **App** will be the container where the rest of our components will live
- **DatePicker** allows the user to select their sobriety date
- **TimeDisplay** displays the length of time the user has been sober
- **RelapseList** displays a list of dates the user relapsed
- **RelapseButton** resets the sobriety to date to zero and starts the clean time counter over again

### App.jsx

```
import React from 'react'

import DatePicker from './DatePicker.jsx';
import RelapseList from './RelapseList.jsx';
import RelapseButton from './RelapseButton.jsx';
import TimeDisplay from './TimeDisplay.jsx';

const App = () => (
  <div className="row">
    <div className="col-md-4">
      <h3>Sober</h3>
      <DatePicker />
    </div>
    <div className="col-md-4">
      <TimeDisplay />
    </div>
    <div className="col-md-4">
      <h3>Relapses</h3>
      <RelapseList />
      <RelapseButton />
    </div>
  </div>
);

export default App;
```

### DatePicker.jsx

```
import React from 'react';
import { connect } from 'react-redux';
import { updateTimeSober } from '../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    updateSobrietyDate: timeSober => dispatch(updateTimeSober(timeSober)),
  };
};

class ConnectedDatePicker extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(el) {
    el.preventDefault();

    this.props.updateSobrietyDate(el.target.value);
    el.target.value = "";
  }

  render() {
    return <input className="form-control" onChange={this.handleChange} type="date" />;
  }
};

const DatePicker = connect(null, mapDispatchToProps)(ConnectedDatePicker);

export default DatePicker;
```

### TimeDisplay.jsx

```
import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const mapStateToProps = state => {
  return { timeSober: state.timeSober };
};

const ConnectedTimeDisplay = ({ timeSober }) => (
  <div className="">
    <h3>Clean</h3>
    <Moment fromNow ago>{timeSober}</Moment>
  </div>
);

const TimeDisplay = connect(mapStateToProps)(ConnectedTimeDisplay);

export default TimeDisplay;
```

### RelapseButton.jsx

```
import React from 'react';
import { connect } from 'react-redux';
import { addRelapseDate } from '../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    addRelapseDate: relapseDate => dispatch(addRelapseDate(relapseDate)),
  };
};

const mapStateToProps = state => {
  return { relapses: state.relapses };
}

class ConnectedRelapseButton extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const d = new Date();
    const relapseDate = { time: `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}` };

    this.props.addRelapseDate(relapseDate);
  }

  render() {
    return <button className="btn btn-sm btn-danger" onClick={this.handleClick}>Relapse</button>
  }
};

const RelapseButton = connect(mapStateToProps, mapDispatchToProps)(ConnectedRelapseButton);

export default RelapseButton;
```

### RelapseList.jsx

```
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { relapses: state.relapses };
}

const ConnectedRelapseList = ({ relapses }) => (
  <ul className="list-group list-group-flush">
    {relapses.map((relapse, idx) => (
      <li className="list-group-item" key={idx}>
        {relapse.time}
      </li>
    ))}
  </ul>
);

const RelapseList = connect(mapStateToProps)(ConnectedRelapseList);

export default RelapseList;
```

## But Wait... Didn't You Forget About PropTypes?!

Yes I did and let's explore that now. React offers a built in way of checking the types of props being used to avoid bugs in our code. Let's start by importing the **prop-types** library by adding the following line to our component files:

`import PropTypes from 'prop-types';`

And then using our **DatePicker.jsx** file as an example, declare the types of props you are using.

**DatePicker.jsx**

```
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { updateTimeSober } from '../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    updateSobrietyDate: timeSober => dispatch(updateTimeSober(timeSober)),
  };
};

class ConnectedDatePicker extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(el) {
    el.preventDefault();

    this.props.updateSobrietyDate(el.target.value);
    el.target.value = "";
  }

  render() {
    return <input className="form-control" onChange={this.handleChange} type="date" />;
  }
};

ConnectedDatePicker.propTypes = {
  updateSobrietyDate: PropTypes.func.isRequired,
};

const DatePicker = connect(null, mapDispatchToProps)(ConnectedDatePicker);

export default DatePicker;
```

By declaring the prop types on our datepicker, we've done two things one told our component that the prop `updateSobrietyDate` is a function and chained on the `isRequired` to ensure that our component always gets the information it needs to function correctly.

Other Prop Types include strings, numbers, booleans, arrays, objects, and symbols. Plus, more you can dive deeper into at [React PropTypes Doc](https://reactjs.org/docs/typechecking-with-proptypes.html)

Now, let's add PropTypes to the remaining **TimeDisplay**, **RelapseButton**, and **RelapseList** components.

**TimeDisplay.jsx**

```
ConnectedTimeDisplay.propTypes = {
  timeSober: PropTypes.string,
};
```

Notice we didn't use the `isRequired` here because this won't be provided until the user interacts with the DatePicker.

**RelapseButton**

```
ConnectedRelapseButton.propTypes = {
  addRelapseDate: PropTypes.func.isRequired,
  relapses: PropTypes.array,
}
```

## Hey What About Typescript?

Typescript Indeed... but what is it? Typescript is a superset of JavaScript that provides optional static typing, classes and interfaces. It helps as you develop by adding a richer environment to your IDE for spotting typos and coding errors.

First, let's add the dependencies.

`$ yarn add @types/react @types/react-dom typescript ts-loader source-map-loader`

Next let's add a **TypeScript** configuration file.

**tsconfig.json**

```
{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es6",
        "jsx": "react"
    }
}
```

And update our webpack config.

```
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
              {
                  loader: "ts-loader"
              }
          ]
      },
      {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  externals: {
      "react": "React",
      "react-dom": "ReactDOM"
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
```





## Finishing Up

So, there it is... our sobriety/relapse tracker. I hope this tutorial didn't drive you to drink, but if it did feel safe in knowing that with this app, you're in control.

To see this app in action on your local machine, run the following command and navigate to [http://localhost:8080/]( http://localhost:8080/).

`$ yarn start`

And if you decide to bundle for production, run

`$ yarn build`

And include the `dist` bundled file **main.js** in the **index.html** file of your app.

Happy Coding!
