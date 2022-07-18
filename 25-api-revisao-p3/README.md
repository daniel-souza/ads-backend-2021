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



[![Teste sua API no Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/14908600-ab46a3ce-b004-4e0a-b817-698a5a8831d4?action=collection%2Ffork&collection-url=entityId%3D14908600-ab46a3ce-b004-4e0a-b817-698a5a8831d4%26entityType%3Dcollection%26workspaceId%3Df82a632c-3642-4b12-9726-1d558623a8d3#?env%5BENV%20-%20API%20-%20Mini%20mercado%5D=W3sia2V5IjoiSE9TVCIsInZhbHVlIjoiMzAwMC1kYW5pZWxzb3V6YS1hZHNiYWNrZW5kMi1oeHA0cXRlYW1uZi53cy11czU0LmdpdHBvZC5pbyIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiMzAwMC1kYW5pZWxzb3V6YS1hZHNiYWNrZW5kMi1oeHA0cXRlYW1uZi53cy11czU0LmdpdHBvZC5pbyIsInNlc3Npb25JbmRleCI6MH0seyJrZXkiOiJUT0tFTiIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjF9LHsia2V5IjoiVVNFUl9JRCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImFueSIsInNlc3Npb25WYWx1ZSI6IiIsInNlc3Npb25JbmRleCI6Mn0seyJrZXkiOiJQUk9EVUNUX0lEIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiYW55Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4IjozfSx7ImtleSI6IkNPTU1FTlRfSUQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJhbnkiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjR9XQ==)
