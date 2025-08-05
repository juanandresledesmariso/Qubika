<h1 align="center"> Qubika Technical Challenge - QA Automation </h1> <br>

<p align="center">
  This repository contains the solution for the Qubika QA Technical Challenge, which automates a user creation and category management flow using Playwright.

  Author: Juan Andrés Ledesma
  Date: AGO, 2025
</p>


## Table of Contents

- [Introduction](#introduction)
- [Project Setup](#Project_Setup)
- [Features](#features)
- [Requirements](#requirements)


## Introduction

Welcome to our coding challenge! This challenge has been designed to test your coding skills and problem-solving abilities. This challenge is a great way to push yourself and learn new things. The challenge will test your technology stack skills and your ability to solve problems. Good luck, and have fun!

## Project_Setup
The project was set up using Playwright Test with JavaScript to fulfill the requirements of the automation challenge.

1.1. System Requirements
Node.js: The project requires a Node.js version of 20, 22 or 24.

Verification: To check your Node.js version, run node --version in your terminal.

1.2. Playwright Installation
The project was initialized using the npm init playwright@latest command. The Playwright browsers (Chromium, Firefox, WebKit) were installed to meet the multi-browser requirement.

2. Dependencies and Configuration
2.1. Installing Dependencies
To run the tests correctly, the dotenv package is required. From the project's root, execute the following command in your terminal:

npm install dotenv

2.2. Setting Up Environment Variables
Create a file named .env in the root of the project and add the following variables for the test credentials:

- Application URLs
BASE_URL=https://club-administration.qa.qubika.com

- Test User Credentials
TEST_EMAIL=test.qubika@qubika.com
TEST_PASSWORD=12345678

3. How to Run the Tests
Once the dependencies are installed and the environment variables are configured, you can run the tests with the command:

npx playwright test

This command will run the tests in all three configured browsers.

4. Test Implementation
The automation solution focuses on a complete end-to-end UI flow to:

Log in with the provided user.

Navigate to the Categories page.

Create a main category with a unique name.

Create a sub-category, correctly associating it with the main category.

Validate the successful creation of both categories in the UI.

Adaptation: The test was adapted to use an existing test user due to a permission issue encountered when attempting to create a new user via the API. This demonstrates problem-solving by focusing on the functional UI flow of the challenge.

5. Additional Observations
During the test, the following application issues were noted:

Console Error (CSP Violation): A Content Security Policy error was observed in the console, indicating a bug in how the application loads success icons.

Console Error (Google Maps API): A warning was logged for an InvalidKey for the Google Maps API, which points to a misconfiguration.

Autofocus Error: A console warning indicated that an element was blocked from autofocusing, suggesting a potential UI bug.

These findings show the value of automation in detecting non-functional bugs that could be missed during manual testing, fulfilling the requirements of the exploratory testing exercise.
