# identity-reconciliation

### POST API Request: https://identify-project-api.onrender.com/identify


## How will this API work? 
[BitespeedBackendTask.pdf](https://github.com/Sohan022/identity-reconciliation/blob/main/BitespeedBackendTask.pdf)

## Steps to run

```
git clone https://github.com/Sohan022/identity-reconciliation.git
cd identity-reconciliation
```
Add .env file
```
DB_USER=root
DB_PASSWORD=password
DB_HOST=db
DB_PORT=5432
DB_NAME=identify
PORT=3000
```

### With Docker
Here I'm assuming, you have already installed Docker
```
docker-compose up --build
```

### Without Docker
Here I'm assuming, you have already setup your PostgreSQL
```
npm install
npm run build
npm run start
```