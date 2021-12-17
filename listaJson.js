function ajax(config) {
  const xhr = new XMLHttpRequest()
  xhr.open(config.metodo, config.url, true)
  xhr.onload = e => {
    if (xhr.status === 200) {
      config.sucesso(xhr.response)
    } else if (xhr.status >= 400) {
      config.erro({
        codigo: xhr.status,
        texto: xhr.statusText
      })
    }
  }
  xhr.send()
}

function criarTabela(personagens) {
  const linha = personagens.map(personagens => {
    const tdNome = document.createElement('td')
    tdNome.innerHTML = personagens.nome

    const tdKd = document.createElement('td')
    tdKd.innerHTML = personagens.kd

    const tdTaxaVitoria = document.createElement('td')
    tdTaxaVitoria.innerHTML = personagens.taxa_vitoria

    const tr = document.createElement('tr')

    const btnExcluir = document.createElement('button')
    btnExcluir.innerHTML = 'Excluir'

    tr.appendChild(tdNome)
    tr.appendChild(tdKd)
    tr.appendChild(tdTaxaVitoria)
    tr.appendChild(btnExcluir)
    return tr
  })
  const tabela = document.createElement('table')
  let qtdLinhas = 0
  linha.forEach(linhas => {
    linhas.setAttribute('id', 'linha' + qtdLinhas++)
    // btnExcluir.setAttribute('id', 'linha' + qtdLinhas++)
    tabela.appendChild(linhas)
  })
  document.body.appendChild(tabela)
}

ajax({
  url: 'https://run.mocky.io/v3/866ef9df-f0dd-4226-9a07-e151eef3f834',
  metodo: 'GET',
  sucesso(resposta) {
    const personagens = JSON.parse(resposta)
    criarTabela(personagens)
    removeLinha()
  },
  erro(e) {
    const msg = document.createTextNode(`${e.codigo}: ${e.texto}`)
    document.body.appendChild(msg)
  }
})

function removeLinha() {
  const botoes = document.querySelectorAll('tr button')
  for (const botao of botoes) {
    botao.addEventListener('click', function () {
      const linhaClicada = botao.closest('tr')
      console.log(linhaClicada)
      linhaClicada.remove()
    })
  }
}
