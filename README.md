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

Now, we configure Babel in the **babel.rc** file.

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

`$ mkdir -p src/js/store`

And then create a file called **index.js** inside of this directory.

`$ touch src/js/store/index.js`

**index.js**

```
import { createStore } from "redux";
import rootReducer from "../reducers/index";

const store = createStore(rootReducer);

export default store;
```

As you can see, the store is a result of **createStore()** which is a function in the Redux library. It takes a reducer as it's first argument. Very important to note here that reducers produce the state of the application.
