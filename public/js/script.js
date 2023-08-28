
function confirmAction(event) {
    event.preventDefault();
    let decision = confirm("você realmente deseja deletar essa categoria ?")
    if (decision == true) {
        event.target.submit()
    }
}
function confirmCreate(event) {
    event.preventDefault();
    let decision = confirm("Deseja continuar ?")
    console.log(decision);
    if (decision == true) {
        event.target.submit()
    }else{
        window.location.href = "http://localhost:3000/admin/category"
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