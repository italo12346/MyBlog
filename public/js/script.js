
function confirmAction(event) {
    event.preventDefault();
    let decision = confirm("Deseja continuar ?")
    console.log(decision);
    if (decision == true) {
        event.target.submit()
    }
}


function confirmArticle(event) {
    event.preventDefault();
    let decision = confirm("Artigo criado com sucesso! \n deseja continuar ?")
    if (decision == true) {
        event.target.submit()
    }
}

function valida_form (){
    if(document.getElementById("title").value == ""){
    alert('Por favor, preencha o campo nome');
    document.getElementById("title").focus();
    return false
    }
}
// MENU HAMBURGUER
var btnMenu = document.querySelector(".btn-menu");
var menuClick = document.querySelector(".menu");
let cont = 0

btnMenu.addEventListener("click", function () {
    
    if(cont==0){
        document.querySelector(".sideBar-active").setAttribute('class', 'sideBar-show')
        btnMenu.setAttribute('class', 'btn-menuON')
        cont++
        console.log(cont);
    }else{
        document.querySelector("#sideBar-disable").setAttribute('class', 'sideBar-active')
        btnMenu.setAttribute('class', 'btn-menu')
        cont=0
        console.log(cont);
    }
       
});

