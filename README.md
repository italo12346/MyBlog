# MyBlog
Um blog com usuarios e com editor de texto embutido

## Requisitos: Node, NPM n MySql.
### Importante: ter o Mysql rodando localmente na sua maquina

---
**1.** Instalar as depedências do projeto pelo do terminal com o comando:
```bash
npm i
```
---
**2.** Caso este erro apareça - ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
 - Para corrigir, basta utilizar o seguinte comando:
```bash
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```
Onde você deve substituir o campo "password" pela senha do usuário, no caso estamos utilizando o usuário "root" e o caminho "localhost", porém também devem ser preenchidos de acordo com a configuração que você utiliza em seu banco.

Após isso, deve-se rodar o seguinte comando:
```bash
flush privileges;
```
Pronto, caso o erro ocorra novamente, você pode tentar o mesmo processo, sem o campo "localhost" do código.
---

**3.** Gerar tabelas do banco de dados :
```bash
Acesse a pasta models entre em cada model e desfaça a linha que esta comentada
```

**4.** Rodar o servidor em ambiente de desenvolvimento pelo do terminal com o comando:
```bash
npm run dev
```
---
**5.** Abrir o link [http://localhost:3000](http://localhost:3000) com seu navegador.
