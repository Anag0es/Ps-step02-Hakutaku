# 👋 Bem-vindo(a) à Etapa Técnica!

<div align="center">
  <img src="./assets/HAKUTAKU/HKTK-ARTES-R02_AVATAR-FULL-01.svg" width="150" alt="Mascote Hakutaku" />
</div>

Você chegou à segunda etapa do nosso processo seletivo! Aqui vamos avaliar suas habilidades técnicas através de **3 desafios práticos** que simulam situações reais do dia a dia na Hakutaku.

## ⏱️ Formato da Avaliação aplicada

-   **Tempo total:** Previstos cerca de ~45 minutos, mas não temos nada limitante nisso!
-   **Desafios:** 3 (recomendamos 10 a 15 minutos de resolução cada)
-   **Entrega:** Código github usando o template desse repositório + vídeo explicativo de cada desafio (2-5 min)

<div align="center">
  <img src="./assets/HAKUTAKU/HKTK-ARTES-R02_AI-STAMP-01.svg" width="100" alt="AI Stamp" />
  <strong>Recomendamos usar todas as ferramentas que você usa no seu dia a dia, seja IA, Google, Stack Overflow, Documentação da framework... Fique à vontade!</strong>
</div>

## 🎯 Os Desafios

### 🐛 Challenge 01: Debug Hunt (10 min)

<img src="./assets/HAKUTAKU/HKTK-ARTES-R02_STICKER-03-LUPA.svg" width="60" align="left" style="margin-right: 15px;" />

-   **Contexto:** Lista de usuários com bugs para identificar e corrigir
-   **Objetivo:** Encontrar e resolver 3 problemas no código React
-   **Pasta:** `challenge-01-debug/`

---

### 🔧 Challenge 02: Code Refactor (10 min)

<img src="./assets/HAKUTAKU/HKTK-ARTES-R02_ICON-INTELIGENTE.svg" width="60" align="left" style="margin-right: 15px;" />

-   **Contexto:** Codebase funcional mas mal estruturada
-   **Objetivo:** Refatorar seguindo boas práticas que você conhece e usa normalmente
-   **Pasta:** `challenge-02-refactor/`

---

### 🔍 Challenge 03: Search Feature (10 min)

<img src="./assets/HAKUTAKU/HKTK-ARTES-R02_AVATAR-FACE-BUSCA.svg" width="60" align="left" style="margin-right: 15px;" />

-   **Contexto:** Sistema de busca sem debounce (atraso na execução)
-   **Objetivo:** Implementar debounce e adicionar teste
-   **Pasta:** `challenge-03-search/`

---

## 🚀 Como Começar

### 1. Setup do Ambiente

```bash
# Use como template no GitHub (recomendado!)
# OU simplesmente clone diretamente:
git clone git@github.com:hakutakuAi/ps-step2-2025.08.git
cd ps-step2-2025.08

# Cada desafio tem seu próprio package.json
cd challenge-01-debug

# Recomendamos bun (mais rápido), mas npm/yarn também funcionam
bun install    # ou: npm install / yarn install
bun run dev    # ou: npm run dev / yarn dev

# Em quando terminar, basta ir para o próximo desafio
cd ../challenge-02-refactor
bun install    # ou: npm install / yarn install
bun run dev    # ou: npm run dev / yarn dev

# E assim por diante...
# Todos os desafios seguem o mesmo padrão de instalação e execução.
```

### 2. Executando os Desafios

-   **Challenge 01:** `http://localhost:3000`
-   **Challenge 02:** `http://localhost:3001`
-   **Challenge 03:** `http://localhost:3002`

### 3. Leia os READMEs

Cada pasta tem instruções específicas. **Leia com atenção!**

## 🎥 Gravação do Vídeo

<div align="center">
  <img src="./assets/HAKUTAKU/HKTK-ARTES-R02_STICKER-02-AVATAR.svg" width="100" alt="Avatar Sticker" />
  <h3>🧠 O IMPORTANTE É SEU RACIOCÍNIO, NÃO A SOLUÇÃO FINAL!</h3>
</div>

### ⚡ Foco Principal:

**Queremos entender COMO você pensa e resolve problemas, não se você conseguiu terminar tudo perfeitamente.**

-   ✅ **Mostre seu processo mental**
-   ✅ **Explique suas decisões**
-   ✅ **Demonstre como você debugga**
-   ✅ **Fale sobre suas dúvidas**
-   ❌ **Não se preocupe em terminar todos os desafios**

### Sugestões do que gravar:

1. **Durante** ou **após** cada tentativa de resolução
2. **Linha de raciocínio** para identificar problemas
3. **Como você aborda** cada situação
4. **Por que** escolheu determinada solução

### Formato do vídeo:

-   **Duração:** 2-5 minutos total (recomendamos ser conciso)
-   **Envio:** Pode ser arquivo, link, ou sinal de fumaça. Se o vídeo chegar pra gente, perfeito.
-   **Pode ser:** Screen recording + narração, ou o que achar mais confortável e conveniente.

### Estrutura sugerida:

1. **Introdução rápida** (30s): Resumo do que entendeu do desafio
2. **Explicação dos desafios** (2-4 min): Raciocínio + decisões
3. **Conclusão** (30min): Aprendizado/dificuldades

## 📝 Como Entregar

### Entrega Esperada:

-   Todas as pastas dos desafios com suas soluções
-   Os vídeos explicativos de cada desafio
-   Identificação (nome completo, e-mail, etc.) pelo email de resposta da segunda etapa

### Prepare o código:

> Lembre-se que você deve ter um repositório Git inicializado ou usado a função de template do GitHub.

```bash
# Commite suas alterações
git add .
git commit -m "Resolução dos desafios técnicos..." # Exemplo
git push # Pra não esquecerem né XD
```

### Vídeos

-   Sugerimos enviar junto ao Github, porém se quiser pode enviar separadamente em anexo ou link no processo de envio do email.

### Envie Por email:

**Email para `ps@hakutaku.com.br`**

-   **Assunto:** "[PS Hakutaku] Entrega Técnica - [Seu Nome]"
-   **Corpo:** Mensagem contendo seu github, e observações que achar relevante
-   **Anexos:** Caso não tenha enviado os vídeos junto ao Github, pode enviar aqui!

## 💡 Critérios de Avaliação

-   Como você pensa, identifica problemas, debugga e explica seu processo no vídeo.
-   Clareza na explicação, justificativa das decisões e transparência sobre dúvidas.
-   Aplicação de boas práticas, qualidade do código e funcionamento básico.

> **💡 Lembre-se:** Preferimos alguém que resolve 1 desafio bem explicado do que 3 desafios sem explicação!

## 🌟 Dicas do Boizão laranja

<div style="display: flex; gap: 20px; align-items: center; margin: 20px 0;">
  <img src="./assets/HAKUTAKU/HKTK-ARTES-R02_AVATAR-FACE-SORRISO.svg" width="80" alt="Hakutaku sorrindo" />
  <div>
    <strong>Foque no PROCESSO, não no resultado!</strong><br>
    É melhor explicar bem 1 desafio do que entregar 3 sem explicação consistente.
  </div>
</div>

-   📚 **Leia os READMEs** - Contêm dicas importantes
-   🧠 **Use todas as ferramentas** - IA, Google, Documentações.. siga seu dia a dia!
-   🗣️ **Pense em voz alta** - Mostre SEU processo mental
-   💭 **Explique suas dúvidas** - Transparência é valorizada
-   🔍 **Demonstre seu processo** - Queremos ver sua investigação nos códigos
-   ⏰ **Não se estresse com tempo** - Qualidade > Quantidade
-   🤷 **Não conseguiu terminar?** Explique onde parou e por quê

## ❓ Dúvidas?

Se tiver alguma dúvida durante os desafios:

-   **Primeira opção:** Consulte os READMEs dos desafios
-   **Segunda opção:** Use seu melhor julgamento, vocês não são robôs, e somos bem flexíveis e compreensivos.
-   **Terceira opção:** Documente a dúvida no vídeo ou nas observações do envio do email.

<div align="center">
  <img src="./assets/HAKUTAKU/HKTK-ARTES-R02_LOGO-H-00-SELO.svg" width="300" alt="Logo Completo Hakutaku" />
  <h3>🚀 Boa sorte, futuro(a) Hakutaku!</h3>
  <p><strong>Adoraríamos ver como você trabalha no dia a dia. Seja você mesmo(a)!</strong></p>
</div>

---

<div align="center">
  <sub>Processo Seletivo Hakutaku • 2025.08 • Primeira edição</sub>
</div>
