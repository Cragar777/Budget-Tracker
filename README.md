#Budget-Tracker

## Description:
The Budget Tracker application allows for the tracking of funds added or subtracted from a budget. It has inputs for a transaction name and transaction amount with add or subtract funds input selectors. An entry history is displayed along with a graphical representation of the budget transactions entered.

## Features:
The Budget Tracker has functionality to allow for seamless use whether the application is online or offline. Any transactions entered offline are locally stored and displayed and then updated to the database once the application is back online. The application code utilizes IdexedDB to persist the data when offline. A service worker is used to maintain functionality locally to enable the application to function while offline. A manifest is added to allow optimal functionality on mobile devices. The application is deployed remotely in the cloud using MongoDB Atlas and Heroku.

## Budget Tracker Screenshot:

![Budget-Tracker](https://user-images.githubusercontent.com/85413293/140653155-0dc11dbb-5b70-486c-bf8c-5d0e55ee241e.png)

## Application Link:

https://salty-journey-26168.herokuapp.com/
