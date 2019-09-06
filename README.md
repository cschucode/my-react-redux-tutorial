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
