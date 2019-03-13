document.getElementById('formulario').addEventListener('submit', cadastroVeiculo);


function cadastroVeiculo(e) {
	var modeloCarro = document.getElementById('modeloCarro').value;
	var placaCarro =  document.getElementById('placaCarro').value;
	var time = new Date();

   
    //validação para não deixar os campso em branco
	if(!modeloCarro || !placaCarro){
		alert('Por favor preencha os campos em branco!')
		return false;

	}
    //criando um objeto carro
	carro = {
		modelo: modeloCarro,
		placa: placaCarro,
		hora: time.getHours(),
		minutos: time.getMinutes()


	}
    
     //se o localStorage patio retornar NUll
     //cria um array chamado carros
     //e nesse array armazena os atributos do objeto carro
    if(localStorage.getItem('patio') ===  null){ 
        var carros = [];
    	carros.push(carro);
    	//para salvar precisamos converter os objetos em string para isso usamos JSON
    	localStorage.setItem('patio', JSON.stringify(carros));
    }else{
        // se não estiver NUll recupera os item do banco patio
    	var carros = JSON.parse(localStorage.getItem('patio'));
    	carros.push(carro);
    	localStorage.setItem('patio', JSON.stringify(carros));
    }
    
    document.getElementById('formulario').reset();

    mostraPatio();

	e.preventDefault();
}

//função adicionar na tabela
function mostraPatio(){

	var carros = JSON.parse(localStorage.getItem('patio'));
	var carrosResultado = document.getElementById('resultados');//document.getElementById para´recuperar ids do html
	carrosResultado.innerHTML = '';

	for( var i = 0; i < carros.length; i++){
		var modelo = carros[i].modelo;
		var placa =  carros[i].placa;
		var hora = carros[i].hora;
		var minutos = carros[i].minutos;

		carrosResultado.innerHTML += '<tr><td>' + modelo + 
		                   '</td><td>' + placa + 
		                   '</td><td>' + hora + ' : ' + minutos +
		                   '</td><td><button class = "btn btn-danger" onclick ="apagarVeiculo(\'' + placa +'\')">Excluir</button></td>'
		                   '</tr>';
	}
}

//função apagar veiculo
function apagarVeiculo(placa){
 var carros = JSON.parse(localStorage.getItem('patio'));
//percorre o array carros, até achar a placa selecionada pelo usuario para poder excluir
 for (var i = 0; i < carros.length; i++) {
 	if(carros[i].placa == placa){
 		carros.splice(i,1);
 	}

 	localStorage.setItem('patio', JSON.stringify(carros));
 }
  
  mostraPatio();

}