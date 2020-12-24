# Web Appliction for Toxicity Prediction
## Technology Stack
> Front-end: Vuejs Element-UI<br/>
> Back-end: Nodejs Expressjs<br/>
> Database: MySQL<br/>
> Machine Learning: K-NN, K-Means<br/>
## Previews
![image](https://github.com/HLN177/ToxicityPredictionWebapp/blob/main/server/public/WechatIMG557.png)
![image](https://github.com/HLN177/ToxicityPredictionWebapp/blob/main/server/public/WechatIMG732.png)
## F1-Score
![image](https://github.com/HLN177/ToxicityPredictionWebapp/blob/main/server/public/WechatIMG529.png)
# Getting Started
## Prerequisites
1. Node.js & npm
2. rdkit
3. numpy
4. scikit-learn

## Database Setup
1. Import the webapp.sql file into the database.
2. Change the database configure in /server/config/db.js

## Start Project
1. Open a terminal and execute the following command:
```bash
    cd server
    npm install
    npm run start
```
2. Open another terminal and execute the following command:
```bash
    cd webapp
    npm install
    npm run serve
```
3. Access the webapp at URL: http://localhost:8080/
4. Unit test
```bash
    cd server
    npm test
```
