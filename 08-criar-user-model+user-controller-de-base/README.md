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
