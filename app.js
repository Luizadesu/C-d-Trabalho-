// Parte de validar informações que o usuário colocou no formulário

const form = document.getElementById("form")
const usuario = document.getElementById("usuario")
const email = document.getElementById("email")
const password = document.getElementById("password")
const passwordConfirmacao = document.getElementById("password-confirmacao")

form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    checkInputs();
});
  

function checkInputs () {
    const usuarioValue = usuario.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const passwordConfirmacaoValue = passwordConfirmacao.value;

    // Validação do nome de usuário
    if (usuarioValue === "") {
        setErrorFor(usuario, "O campo é obrigatório.")
    }    
    else {
        setSuccessFor(usuario)
    }

    // Validação do email
    if (emailValue === "") {
        setErrorFor(email, "O campo é obrigatório.")
    }
    else if (!checkEmail(emailValue)) {
        setErrorFor(email, "Este email é invalido.")
    }
    else {
        setSuccessFor(email)
    }

    // Validação da senha
    if (passwordValue === "") {
        setErrorFor(password, "A senha é obrigatória.")
    }
    else if (passwordValue.length < 5) {
        setErrorFor(password, "A senha precisa ter no mínimo 5 caracteres")
    }
    else {
        setSuccessFor(password)
    }

    // Validação da validação da senha
    if (passwordConfirmacaoValue === "") {
        setErrorFor(passwordConfirmacao, "A confirmação da senha é obrigatória.")
    }
    else if (passwordConfirmacaoValue !== passwordValue) {
        setErrorFor(passwordConfirmacao, "As senhas são diferentes.")
    }
    else {
        setSuccessFor(passwordConfirmacao)
    }

    const controleform = form.querySelectorAll(".controle-form")
    
    const formValido = [...controleform].every((controleform) => {
      return controleform.className === "controle-form sucesso"  
    })

    if (formValido) {
        alert("Cadastrado!")        
    }
}

function setErrorFor (input, mensagem) {
    const controleform = input.parentElement
    const small = controleform.querySelector("small")
    
    // Mensagem de erro
    small.innerText = mensagem

    // Classe de erro
    controleform.className = "controle-form error"
}

function setSuccessFor (input) {
    const controleForm = input.parentElement

    // Mensagem de sucesso
    controleForm.className = "controle-form sucesso"    
}


// Funcão para validar email
function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
}

// Acaba aqui a validação do cadastro

function lerDados() {
    let srtDados = localStorage.getItem('db')
    let objDados = {}

    //let objFormulario = {}

    if(srtDados) {
        objDados = JSON.parse(srtDados)
    }
    else {
        objDados = {cadastro: [ /*{"usuario": "Nome", "email": "aaaa02@gmail.com", "senha": "12345"}*/ ]
                }
    }
    
    return objDados;
}

function salvaDados(dados) {
    localStorage.setItem('db', JSON.stringify(dados))
}

function incluirDados() {
    // Ler os dados do localStorage
    let objDados = lerDados()

    // Incluir um novo contato
    let strUsuario = document.getElementById('usuario').value
    let strEmail = document.getElementById('email').value
    let strSenha = document.getElementById('password').value
    let novoCadastro = {
        usuario: strUsuario,
        email: strEmail,
        password: strSenha
    };

    objDados.cadastro.push(novoCadastro);

    // Salvar os dados no localStorage
    salvaDados(objDados);
}

function imprimeDados(){
    let tela = document.getElementById('tela');
    let strHtml = '';
    let objDados = lerDados();
    
    for (i=0; i<objDados.cadastro.length; i++){
        strHtml = strHtml + `<p>${objDados.cadastro[i].usuario} - ${objDados.cadastro[i].email}</p>`
    }

    tela.innerHTML = strHtml;
    //document.getElementById('btnExcluir').addEventListener('click', excluir)
}

function excluir(objDados){
	//localStorage.setItem("objDados", JSON.stringify(objDados));
    //localStorage.removeItem('objDados');
    localStorage.clear(objDados);
	alert("Registro excluído.");
    document.location.reload(true);
}

var indice_selecionado = 0;

function editar(objDados){

    localStorage.clear(objDados);
    alert("Insira as novas informações.");

    document.location.reload(true);

    if(localStorage.getItem(objDados) != "")
    {
        incluirDados();            
    }    
}


//// APARECE AS OPÇÕES
var btn = document.getElementById('btn-div');

btn.addEventListener('click', function() {

    var container = document.querySelector('.containerEdit');
    
  if(container.style.display === 'block') {
    container.style.display = 'none';
  } else {
    container.style.display = 'block';
  }

  alert("Escolha uma opção")
});

// Configura os botões

document.getElementById('registrar').addEventListener('click', incluirDados);
document.getElementById('btnMostrar').addEventListener('click', imprimeDados);
document.getElementById('btnExcluir').addEventListener('click', excluir);
document.getElementById('btnEditar').addEventListener('click', editar);

