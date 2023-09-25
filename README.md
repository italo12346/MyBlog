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
Onde você deve substituir o campo "password" pela senha do usuário, no caso estamos utilizando o usuário "root" e o caminho "localhost", porém também devem ser preenchidos de acordo com a configuração que você utiliza em seu banco ou sejam, a senha que voce coloca quando intala o mysql na maquina.

Após isso, deve-se rodar o seguinte comando:
```bash
flush privileges;
```
Pronto, caso o erro ocorra novamente, você pode tentar o mesmo processo, sem o campo "localhost" do código.
---

**3.** Rodar o servidor em ambiente de desenvolvimento pelo do terminal com o comando:
```bash
npm run dev
```
---
**5.** Abrir o link [http://localhost:3000](http://localhost:3000) com seu navegador.
## Imgens do Site
#### segue links as telas mais importantes

https://drive.google.com/file/d/14pzZCpV2BDt5GHnkuo-C73M7IbNZ74r7/view?usp=drive_link,
https://drive.google.com/file/d/184bkBL3My5dy6VR9qw2VWg4zmb19C--e/view?usp=drive_link,
https://drive.google.com/file/d/1ErcJy3s5dYWDre2ZrSYo54dEfu84ni29/view?usp=drive_link,
https://drive.google.com/file/d/1G5TVvGwW7zDfGrncBz6UzCJW5DhxwlEc/view?usp=drive_link, 
https://drive.google.com/file/d/1JvJKeK4lsRlVMoN2YFx9A45NrnOG4bkB/view?usp=drive_link, 
https://drive.google.com/file/d/1Qf6QGonPV9NkC7O_hWS8s6D7gARJUWyI/view?usp=drive_link,
https://drive.google.com/file/d/1YnelrLRAbxEfG90QfYZjFrQcCdai44sN/view?usp=drive_link,
https://drive.google.com/file/d/1gogXTczUQ8pxz-RTeR1ohvMQlgPnh8WH/view?usp=drive_link,
https://drive.google.com/file/d/1ioMN0sq0rRwERJtcSo1DT89wImWfaCwc/view?usp=drive_link, 
https://drive.google.com/file/d/1olCJJUAM1ZN78Bg1fefWKGokRlaMtQYW/view?usp=drive_link
