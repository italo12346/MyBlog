
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