# Watson Assistant Chatbot

## Table of Contents

* [Overview](#overview)
* [Prerequisites](#prerequisites)
* [Configuration](#configuration)
* [Usage](#usage)

# Overview

This is a chatbot powered by IBM's Watson Assistant to provide weather details based on the user's intentions and dialog and other related information.

# Prerequisites

1. Sign up for an [IBM Cloud account](https://cloud.ibm.com/registration/)
2. Create an instance of the Watson Assistant Serevice
    - Go to the [Watson Assistant](https://cloud.ibm.com/catalog/services/conversation) page in the IBM Cloud Catalog.
    - Log in to your IBM Cloud account.
    - Click **Create**.
    - Click **Manage** to view the service credentials.
    - Copy the `apikey` value
    - Copy the `url` value.
3. Create an [OpenWeather Account](https://home.openweathermap.org/users/sign_up)
    - Click your account name in the top right hand corner.
    - Click **My API Keys**.
    - Generate an API key if there are none in your account.
    - Copy the `apikey` value.

# Configuration

1. In the IBM Cloud console, open the Watson Assistant service instance.
2. Go to the **Skills** tab.
3. Click **Create Skill** and then ensure that **Dialog Skill** is selected.
    
4. Import the provided skill json file

    `<project_root>/watson-weather.json`
5. Change your directory to the `travelGuide` folder.
6. Copy the .env.example file and create a file called .env
`cp .env.example .env`
1. Open the .env file and add the service credentials from IBM Watson and OpenWeather.

# Usage

1. Install the dependencies

```
npm install
```

2. Run the application

```
npm start
```

3. Go to `localhost:3000` in the browser to view the application.
