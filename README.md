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
    case type === ADD_RELAPSE_DATE:
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

Let's start by adding the **react-redux** library that connects React and Redux in an efficient way.

`$ yarn add react-redux --dev`

Once installed, the most important method you'll work with is **connect**. You will use connect with two or three arguments depending on the use case. The fundamental things to know are:

- mapStateToProps connects parts of the Redux State to the React component
- mapDispatchToProps connects Redux Actions to React Props

But is **mapStateToProps** enough to connect our React component to our Redux Store. No it is not. For this, we're going to use a **Provider** which is a high order component from **react-redux**. The **Provider** wraps up your React application and makes it aware of the Redux Store.
