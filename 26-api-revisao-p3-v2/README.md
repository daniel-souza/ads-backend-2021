### **As melhorias incluem**
- Utilização de hooks do mongoose (pre-save) (/src/models/UserModel.js)
- Utilização de Generalização/Especialização de esquemas (User/Admin) com atribuição de papéis (/src/models/UserModel.js)
- Autorização de múltipolos usuários para as rotas, baseado em seus papéis (/src/routes.js)
- Centralização do tratamento de excessões (/src/routes.js)
- Adicionado novas middlewares - cors, express-mongo-sanitize (previne injeção)

### **Instalar todos os pacotes definidos em Packege**
```
npm install
```

### **Instalar o módulo para reiniciar o servidor sempre que houver alteração no código fonte.**

```
npm install -g nodemon
```

### **Crie um arquivo .env na raiz do projeto e coloque os seguintes dados (não funciona no REPLIT):**
```
#Banco de dados
DB_USER=<usuario>
DB_PASS=<senha>
DB_HOST=<host>
DB_NAME=<database>

#Autenticação e segurança
API_SECRET=<segredo>
JWT_EXPIRES_IN=<prazo_de_expiração_do_token>
```
Substitua os campos em <> pelos valores relacionados ao seu servidor do atlas. **Caso o .env não estiver configurado, a conexão com o mongodb será realizada a partir do localhost**.

A execução do projeto com as variáveis de ambiente definidas no arquivo .env é realizada como segue, conforme configurado em **package.json**:

```
npm run dev (ou equivalente: node -r dotenv/config ./src/server.js)
```

### **Dependência utilizadas:**

- **express**: Gerencia as requisições, rotas e URLs, entre outra funcionalidades.
- **mongoose**: Mongoose traduz os dados do banco de dados para objetos JavaScript para que possam ser utilizados por sua aplicação.
- **dotenv**: Utilizado para carregar as variáveis de ambiente definidas no arquivo .env, localizado na raiz do projeto.



[![Teste sua API no Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/14908600-394bf4e8-25be-48b6-a6f4-e6b8073dab2d?action=collection%2Ffork&collection-url=entityId%3D14908600-394bf4e8-25be-48b6-a6f4-e6b8073dab2d%26entityType%3Dcollection%26workspaceId%3Df82a632c-3642-4b12-9726-1d558623a8d3#?env%5BENV%20-%20API%20-%20Mini%20mercado%5D=W3sia2V5IjoiSE9TVCIsInZhbHVlIjoiMzAwMC1kYW5pZWxzb3V6YS1hZHNiYWNrZW5kMi1oeHA0cXRlYW1uZi53cy11czU0LmdpdHBvZC5pbyIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiMzAwMC1kYW5pZWxzb3V6YS1hZHNiYWNrZW5kMi1oeHA0cXRlYW1uZi53cy11czU0LmdpdHBvZC5pbyIsInNlc3Npb25JbmRleCI6MH0seyJrZXkiOiJUT0tFTiIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQiLCJzZXNzaW9uVmFsdWUiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJall5WkRZeE9XVTBORFZpWlRSaE5ERTBNMlZsWW1SaE1pSXNJbkp2YkdVaU9pSkJaRzFwYmlJc0ltbGhkQ0k2TVRZMU9ESXdNVEUzTUN3aVpYaHdJam94TmpVNC4uLiIsInNlc3Npb25JbmRleCI6MX0seyJrZXkiOiJVU0VSX0lEIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiYW55Iiwic2Vzc2lvblZhbHVlIjoiNjJkNjEzYTQ5NzM5MGUzODRmZmNlMzIzIiwic2Vzc2lvbkluZGV4IjoyfSx7ImtleSI6IlBST0RVQ1RfSUQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJhbnkiLCJzZXNzaW9uVmFsdWUiOiI2MmQ2MTUzZDhiNjk4NzNjMzAzNWExMzMiLCJzZXNzaW9uSW5kZXgiOjN9LHsia2V5IjoiQ09NTUVOVF9JRCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImFueSIsInNlc3Npb25WYWx1ZSI6IjYyZDYyMmExZWM3NzQ2NDcyNWViODU0MCIsInNlc3Npb25JbmRleCI6NH1d)