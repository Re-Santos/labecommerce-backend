  
  //verifica a quantidade de argumentos
    if (process.argv.length < 4) {
        console.log("Digite no terminal:node exercicios/imparPar.js (par ou impar) (numeroescolhido) ");
    } else {
        //Jogador escolhe par ou impar e um número de 1 a 5
        const escolhaJogador = process.argv[2];
        const numeroJogador = parseInt(process.argv[3]);

        // computador escolhe par ou impar de acordo com a escolha do jogador e um gera um número aleatório
        const escolhaComputador = escolhaJogador === "par" ? "impar" : "par";

        const numeroComputador = Math.floor(Math.random() * 6);
        
        //soma as escolhas e determina se é par ou ímpar
        const total = numeroJogador + numeroComputador;
        const resultado = total % 2 === 0 ? "par" : "impar";

        console.log(`Você escolheu ${escolhaJogador} e o computador escolheu ${escolhaComputador}. O resultado foi ${total}.`);
        
        //imprimi o resultado do jogo
        if (escolhaJogador === resultado) {
            console.log("Você ganhou!");
        } else {
            console.log("Você perdeu!");
        }
    }
