# 🔍 Challenge 03: Search Relevance

<div align="center">
  <img src="../assets/HAKUTAKU/HKTK-ARTES-R02_AVATAR-FACE-BUSCA.svg" width="120" alt="Hakutaku buscando" />
  <h3>Melhore a qualidade dos resultados de busca!</h3>
</div>

## 📋 Contexto

A busca da Hakutaku funciona, mas é **muito básica**. Atualmente só faz `includes()` simples sem algoritmo de relevância. Implemente um **sistema de scoring inteligente**.

## 🎯 Objetivos (sugestão: 10-15 minutos)

1. **Algoritmo de relevância** para ordenar resultados
2. **Suporte a acentos/typos** (opcional)
3. **Teste básico** do algoritmo
4. **Vídeo explicativo** da abordagem

## 🛠️ Problema vs Solução

| Problema Atual                  | Sua Solução                              |
| ------------------------------- | ---------------------------------------- |
| ❌ Só `includes()` simples      | ✅ Algoritmo de scoring inteligente      |
| ❌ Score sempre 0               | ✅ Título 3x mais relevante que conteúdo |
| ❌ "nao" não encontra "não"     | ✅ Normalizar acentos                    |
| ❌ "buscs" não encontra "busca" | ✅ Fuzzy matching (Levenshtein)          |

## 💻 Setup

```bash
bun install    # ou: npm install / yarn install
bun run dev    # ou: npm run dev / yarn dev (porta 3002)
bun run test   # ou: npm run test / yarn test
```

## 🧪 Como Testar

### Cenários para validar:

1. **"busca"** → deveria priorizar resultados com "busca" no título
2. **"semantica"** → deveria encontrar "semântica" (sem acento)
3. **"buca"** → deveria encontrar "busca" (typo)
4. Compare scores entre resultados diferentes

### Teste com Mocha + Chai:

```javascript
it('prioriza matches no título', async () => {
	const results = await searchKnowledge('busca')
	// Resultado com 'busca' no título deve ter score maior
	expect(results[0].score).to.be.greaterThan(results[1].score)
})
```

## 📁 Arquivos Importantes

-   **`lib/searchAPI.ts`** - implementar função `searchKnowledge`
-   **`__tests__/search-relevance.test.ts`** - criar seus testes
-   **`lib/mockData.json`** - 20 documentos para testar

## 💡 Dicas Rápidas

-   **Comece simples:** conte frequência do termo
-   **Use Math.log():** evita dominância de termos muito frequentes
-   **Normalize strings:** `.normalize('NFD').replace(/[\u0300-\u036f]/g, '')`
-   **Debug scores:** `console.log()` para ver os valores calculados

## 📚 Referências de Estudo

-   **[TF-IDF Explained](https://www.geeksforgeeks.org/machine-learning/understanding-tf-idf-term-frequency-inverse-document-frequency/)** - Como funciona o algoritmo de relevância
-   **[Levenshtein Distance](https://www.geeksforgeeks.org/dsa/introduction-to-levenshtein-distance/)** - Para implementar fuzzy matching

## 📚 Mocha para Iniciantes

<details>
<summary>🤔 Nunca usou Mocha? Clique aqui</summary>

**Mocha** é um framework de testes para JavaScript, usado com **Chai** para assertions mais expressivas.

### Estrutura básica:

```javascript
import { expect } from 'chai'

it('descrição do que está testando', () => {
	const resultado = minhaFuncao('input')
	expect(resultado).to.equal('output esperado')
})

// Para testes assíncronos (como nossa searchKnowledge)
it('testa função async', async () => {
	const resultado = await minhaFuncaoAsync('input')
	expect(resultado).to.have.lengthOf(3)
})
```

### Comandos úteis com Chai:

-   `expect(valor).to.equal(esperado)` - igualdade exata
-   `expect(valor).to.be.greaterThan(outro)` - maior que
-   `expect(array).to.have.lengthOf(3)` - tamanho do array
-   `expect(string).to.contain('texto')` - contém substring
-   `expect(array).to.deep.equal(outroArray)` - comparação profunda
-   `expect(valor).to.be.at.most(10)` - menor ou igual
-   `expect(obj).to.have.property('prop')` - tem propriedade

### Exemplo para este desafio:

```javascript
it('algoritmo calcula scores corretos', async () => {
	const results = await searchKnowledge('RAG')

	// Todos devem ter score > 0
	expect(results.every((r) => r.score > 0)).to.equal(true)

	// Devem estar ordenados por relevância
	expect(results[0].score).to.be.greaterThan(results[1].score)
})
```

📖 **Documentação:** [Mocha](https://mochajs.org/) • [Chai Assertions](https://www.chaijs.com/api/bdd/)

</details>

---

<div align="center">
  <img src="../assets/HAKUTAKU/HKTK-ARTES-R02_LOGO-H-01.svg" width="200" alt="Logo Hakutaku" />
  <br>
  <strong>Mostre sua abordagem para otimização! 🧠</strong>
</div>
