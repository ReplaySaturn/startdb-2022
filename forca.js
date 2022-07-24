class Forca {

  constructor(palavraSecreta) {

    this.palavraSecreta = palavraSecreta;
    this.estadoDoJogo = "aguardando chute"; //Regra 2: Iniciando o jogo com o estado 'aguardando chute'
    this.letrasChutadas = [];
    this.vidas = 6; //Regra 1: Iniciando o jogo com 6 vidas
    this.palavra = palavraSecreta.split("").map(letra => {return "_"});
  }

  chutar(letra) {

    if (!this.regras(letra)) {
      const chuteCerto = this.palavraSecreta.split("").includes(letra)
      this.letrasChutadas.push(letra); // Regra 5: Registro dos chutes

    if(chuteCerto) {
      this.palavra = this.palavra.map((i, j) => {
        return (this.palavraSecreta[j] == letra) ? letra : i;
      }) // Regra 7: Substituição na posição da letra correta
    }
    else this.vidas --; // Regra 6: Subtração de um ponto da vida
    }
    this.mudarEstado();
  }

  regras(letra) {

    if(!this.palavraSecreta.split("").includes(letra) &&
    this.letrasChutadas.includes(letra)) {
      console.log("A letra já foi chutada"); 
      return true; // Regra 4: Verificar se a letra já foi chutada posteriormente
    }
    if(this.palavraSecreta.split("").includes(letra) &&
    this.letrasChutadas.includes(letra)) {
      console.log("A letra já foi chutada"); 
      return true; // Regra 4
    }
    if (letra.length > 1) {
      console.log("Há mais de uma letra") 
      return true; // Regra 3: Verificar se há mais de uma letra
    }
    if (!isNaN(letra)){
      console.log("Não é uma letra") 
      return true; // Verifica se o chute foi uma letra ou não
    }
    return false
  }

  mudarEstado() {

    if (this.vidas <= 0) {
        this.estadoDoJogo = "perdeu"; // Regra 8: Mudança de estado caso haja zeramento das vidas
    }
    if (this.palavra.join("") === this.palavraSecreta)  {
        this.estadoDoJogo = "ganhou"; // Regra 9: Mudança de estado caso adivinhada a palavra correta
    }
  }

  buscarEstado() {
    
    return this.estadoDoJogo;
  } // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"
    
  buscarDadosDoJogo() {

    return {
      letrasChutadas: this.letrasChutadas, // Deve conter todas as letras chutadas
      vidas: this.vidas, // Quantidade de vidas restantes
      palavra: this.palavra.join("") // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
    }
    }
}

module.exports = Forca;