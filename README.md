# MyBlog
Um blog com usuarios e com editor de texto embutido

#### Requisitos: Node, NPM n MySql.
---
**1.** Instalar as depedências do projeto pelo do terminal com o comando:
```bash
npm i
```
---
**2.** Caso este erro apareça - ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
faça - 
```bash
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;
```
---
**3.** Gerar tabelas do banco de dados :
Acesse a pasta models entre em cada model e desfaça a linha que esta comentada


**4.** Rodar o servidor em ambiente de desenvolvimento pelo do terminal com o comando:
```bash
npm run dev
```
---
**5.** Abrir o link [http://localhost:3000](http://localhost:3000) com seu navegador.
