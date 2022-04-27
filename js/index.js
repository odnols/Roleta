const casas_pretas = ['2', '4', '6', '8', '10', '11', '13', '15', '17', '20', '22', '24', '26', '28', '29', '31', '33', '35'];

const historico_jogadas = [
    ['32', '30', '27', '0', '10', '26', '8', '4', '12', '36', '24', '20', '1', '27', '4', '13', '10', '29', '3', '27', '26', '11', '19', '30', '35', '24', '00', '3', '28'],
    ['33', '32', '23', '15', '0', '27', '24', '8', '13', '24', '7', '6', '29', '1', '29', '2', '23', '20', '32', '0', '18', '17', '19', '00', '14', '33', '36', '32', '15'],
    ['14', '9', '27', '14', '18', '36', '15', '34', '27', '34', '11', '00', '17', '33', '2', '33', '12', '35', '23', '8', '11', '13', '22', '31', '35', '"00"', '29', '23', '8'],
    ['6', '25', '11', '7', '4', '11', '15', '16', '11', '17', '21', '9', '6', '31', '32', '10', '5', '17', '21', '0', '21', '23', '00', '13', '25', '30', '6', '11', '25'],
    ['33', '26', '7', '17', '14', '34', '16', '00', '30', '13', '23', '30', '3', '24', '23', '9', '28', '1', '27', '16', '34', '9', '9', '28', '27', '34', '26', '5', '33'],
    ['26', '29', '0', '6', '17', '16', '4', '29', '27', '7', '7', '15', '23', '19', '00', '0', '35'],
    ['7', '34', '20', '21', '34', '9', '15', '21', '6', '10', '35', '4', '31', '36', '11', '36', '9', '28', '17', '36', '2', '15', '36', '34', '14', '34', '13', '0', '36'],
    ['16', '14', '16', '6', '4', '18', '34', '1', '15', '16', '22', '19', '15', '00', '26', '15', '6', '5', '16', '2', '23', '19', '8', '7', '22', '19', '35', '33', '21'],
    ['6', '9', '15', '9', '15', '28', '16', '4', '36', '00', '27', '6', '1', '26', '35', '25', '31', '0'],
    ['24', '15', '10', '17', '35', '14', '10', '35', '26', '14', '19', '24', '25', '9', '19', '22', '36', '36', '32', '23', '27', '27', '35', '12', '13', '26', '34', '32', '1'],
    ['23', '2', '19', '10', '00', '12', '5', '10', '32', '12', '28', '36', '14', '25', '12', '2', '23', '34', '7', '0', '10', '9', '4', '8', '24', '10', '16', '30', '17'],
    ['3', '21', '2', '29', '1', '25', '36', '20', '30', '26', '15', '31', '20', '35', '19', '33', '36', '12', '34', '24', '13', '31', '14', '36', '21', '17', '5', '32', '23'],
    ['2', '26', '19', '33', '22', '0', '1', '11', '28', '3', '26', '20', '26', '9', '3', '33', '17', '21', '14', '36', '29', '21', '8', '25', '21', '20', '31', '12', '2'],
    ['34', '2', '00', '0'],
    ['29', '17', '31', '8', '4', '31', '26', '31', '4', '12', '35', '36', '21', '21', '30', '30', '7', '12', '32', '30', '8', '16', '29', '11', '23', '22', '6', '6', '28'],
    ['7', '8', '8', '15', '16', '6', '14', '6', '30', '4', '29', '15', '33', '1', '29', '00', '32', '4', '8', '00', '35', '23', '16', '23', '17', '25', '35', '0', '33', '12'],
    [],
    [],
    [],
    []
];

function calcula_porcentagem(req_auto){

    let repeticoes = [];
    let proximo_item = [];

    for(let i = 0; i < 38; i++){
        repeticoes.push(0);
        proximo_item.push(0);
    }

    const ult_valor = document.getElementById("ultimo_jogo");
    if(ult_valor.value.length === 0 && !req_auto) return;

    let total_partidas = 0;
    let total_casas_global = [0, 0, 0];

    for(let i = 0; historico_jogadas.length; i++){
        if(typeof historico_jogadas[i] !== "undefined"){
            for(let x = 0; x < historico_jogadas[i].length; x++){
                if(historico_jogadas[i][x] === ult_valor.value){
                    if(ult_valor.value !== '00')
                        repeticoes[ult_valor.value - 1] += 1
                    else
                        repeticoes[37] += 1

                    if(typeof historico_jogadas[i][x + 1] !== "undefined"){
                        let prox_valor = historico_jogadas[i][x + 1];
                        
                        if(prox_valor !== '00')
                            proximo_item[prox_valor] += 1
                        else
                            proximo_item[37] += 1
                    }
                }

                if(casas_pretas.includes(historico_jogadas[i][x]))
                    total_casas_global[0]++;
                else if(historico_jogadas[i][x] !== '0' || historico_jogadas[i][x] !== '00')
                    total_casas_global[1]++;
                else
                    total_casas_global[2]++;

                total_partidas++;
            }
        }else
            break;
    }

    let porcentagem_global = document.getElementsByClassName("porc_global");
    for(let i = 0; i < porcentagem_global.length; i++){
        porcentagem_global[i].innerHTML = ((total_casas_global[i] / total_partidas) * 100).toFixed(2) +"%"; 
    }

    if(req_auto) return;

    document.getElementById("proximos_itens").innerHTML = "";
    let cores = [0, 0, 0];
    let par_impar = [0, 0]; // 0 - par, 1 - impar
    let tab_lado = [0, 0]; // 1 - 18, 19 - 36

    for(let i = 1; i <= 36; i++){
        let slot_destaq = document.getElementsByClassName(`destaca_slot_${i}`);

        slot_destaq[0].style.border = "0px";
        slot_destaq[0].style.animation = "None";
    }

    for(let i = 0; i < 38; i++){
        if(casas_pretas.includes(`${i}`) && proximo_item[i] > 0){
            cores[0] += proximo_item[i]; // Preto
            document.getElementById("proximos_itens").innerHTML += `<div class="casa_preta">${i} <p class='qtd_repeticoes'>${proximo_item[i]}</p></div>`;
        }else if(i !== 0 && i !== 37 && proximo_item[i] > 0){
            cores[1] += proximo_item[i]; // Vermelho
            document.getElementById("proximos_itens").innerHTML += `<div class="casa_vermelha">${i} <p class='qtd_repeticoes'>${proximo_item[i]}</p></div>`;
        }else if(proximo_item[i] > 0){
            cores[2] += proximo_item[i]; // Verde
            let valor = i == 37 ? "00" : "0";

            document.getElementById("proximos_itens").innerHTML += `<div class="casa_verde">${valor} <p class='qtd_repeticoes'>${proximo_item[i]}</p></div>`;
        }

        if(proximo_item[i] > 0 && (i !== 0 && i !== 37)){
            let alvo = document.getElementsByClassName(`destaca_slot_${i}`);

            if(alvo[0]){
                alvo[0].style.border = "solid 3px yellow";
                alvo[0].style.animation = "destaca_borda 1s infinite";
            }
        
            for(let x = 0; x < proximo_item[i]; x++){
                if(i % 2 == 0)
                    par_impar[0]++
                else
                    par_impar[1]++;

                if(i <= 18) // Registra o slot mais frequente
                    tab_lado[0]++;
                else
                    tab_lado[1]++;
            }
        }
    }

    verifica_tabuleiro(tab_lado);

    let qtd_par_impar = document.getElementsByClassName("qtd_par_impar");
    for(let i = 0; i < qtd_par_impar.length; i++){
        qtd_par_impar[i].innerHTML = par_impar[i]; 
    }

    const cor_provavel = document.getElementById("cor_provavel");
    const porcentagem = document.getElementById("porcentagem");
    cor_provavel.style.background = "";

    const somatorio = cores[0] + cores[1] + cores[2];

    if(cores[0] > cores[1]){
        cor_provavel.style.backgroundColor = "Black";
        cor_provavel.style.color = "White";
        porcentagem.innerHTML = ((cores[0] / somatorio) * 100).toFixed(0) +"%";
    }else if(cores[1] > cores[0]){
        cor_provavel.style.backgroundColor = "Red";
        cor_provavel.style.color = "Black";
        porcentagem.innerHTML = ((cores[1] / somatorio) * 100).toFixed(0) +"%";
    }else if(cores[2] > cores[1] || cores[2] > cores[0]){
        cor_provavel.style.backgroundColor = "Green";
        cor_provavel.style.color = "Black";
        porcentagem.innerHTML = ((cores[2] / somatorio) * 100).toFixed(0) +"%";
    }

    if(cores[0] === cores[1]){
        porcentagem.innerHTML = ((cores[1] / somatorio) * 100).toFixed(0) +"%";
        cor_provavel.style.background = "linear-gradient(90deg, rgba(0,0,0,0.9948354341736695) 35%, rgba(255,0,0,1) 65%)";
        cor_provavel.style.color = "White";
    }
}

function muda_num(caso){

    let valor = '0';
    const ult_valor = document.getElementById("ultimo_jogo");

    if(ult_valor.value.length > 0)
        valor = parseInt(ult_valor.value);

    if(ult_valor.value.length > 0)
        if(caso){ // Somando
            if(ult_valor.value == '00')
                valor = 0;
            else if(valor < 36)
                valor += 1;
            else if(valor == 36)
                valor = '00';
        }else{
            if(ult_valor.value == '00')
                valor = 36;
            else if(valor > 0)
                valor -= 1;
            else if(ult_valor.value == '0')
                valor = '00';
        }

    document.getElementById("ultimo_jogo").value = valor;
    calcula_porcentagem();
}

calcula_porcentagem(true);

function verifica_tabuleiro(tab_lado){

    let prob_tab = document.getElementsByClassName("prob_tab");
    let repeticoes_tab = document.getElementsByClassName("num_repeticos_tab");
    
    for(let i = 0; i < prob_tab.length; i++){
        prob_tab[i].style.border = "0px";
        prob_tab[i].style.animation = "None";

        repeticoes_tab[i].innerHTML = tab_lado[i];
    }

    if(tab_lado[0] > tab_lado[1] + 2){
        prob_tab[0].style.border = "solid 3px cyan";
        prob_tab[0].style.animation = "destaca_borda_buttons 1s infinite";
    }else if(tab_lado[1] > tab_lado[0] + 2){
        prob_tab[1].style.border = "solid 3px cyan";
        prob_tab[1].style.animation = "destaca_borda_buttons 1s infinite";
    }
}