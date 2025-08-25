# 🐛 Challenge 01: Debug Hunt

<div align="center">
  <img src="../assets/HAKUTAKU/HKTK-ARTES-R02_AVATAR-FACE-DUVIDA.svg" width="120" alt="Hakutaku com dúvida" />
  <h3>Algo não está funcionando como deveria...</h3>
</div>

## 📋 Contexto

Você recebeu um sistema de **Team Dashboard** da Hakutaku que lista os membros da equipe com integração a uma API. O código **funciona**, mas contém bugs que podem acontecer com qualquer um 🤡. Sua missão é identificar e resolver esses problemas autênticos.

## 🎯 Objetivos (sugestão: 10-15 minutos)

1. **Identificar** todos os bugs no código
2. **Corrigir** os problemas encontrados
3. **Explicar** sua linha de raciocínio no vídeo

## 🚀 Como executar

```bash
# Instalar dependências (recomendamos bun, mas npm/yarn funcionam)
bun install     # ou: npm install / yarn install

# Executar em modo desenvolvimento
bun run dev     # ou: npm run dev / yarn dev
```

Acesse: `http://localhost:3000`

## 🕵️ Sugestões para o Debug

<details>
<summary><strong>🔍 DevTools & Console</strong></summary>

-   Abra o **DevTools** do browser (F12)
-   Observe o **Console** para erros e warnings
-   Verifique a aba **Network** para requisições
-   Use **React Developer Tools** se disponível

</details>

<details>
<summary><strong>⚛️ Debugging React</strong></summary>

-   Teste a **interação** com os componentes
-   Verifique **warnings** do React no console
-   Analise o comportamento dos **hooks**
-   Observe re-renderizações desnecessárias

</details>

<details>
<summary><strong>📝 TypeScript</strong></summary>

-   Execute `bun run build` ou `npm run build` ou `yarn build`
-   Observe erros de **tipagem** no terminal
-   Verifique **tipos opcionais** vs obrigatórios
-   Analise inicializações de estado

</details>

<details>
<summary><strong>🌐 API & Network</strong></summary>

-   Verifique a aba **Network** no DevTools
-   Observe **status codes** das requisições
-   Teste **refresh rápido** múltiplo (race conditions)
-   Analise **tempos de resposta** variáveis
-   Verifique **CORS errors** no console

</details>

## 📝 O que procurar

Existem **6 bugs** reais neste código:

| Bug | Tipo              | Área             | Hint                            |
| --- | ----------------- | ---------------- | ------------------------------- |
| 🔴  | **TypeScript**    | Estado inicial   | Algo faltando na declaração     |
| 🟠  | **Infinite Loop** | useEffect        | Dependências problemáticas      |
| 🟡  | **React Warning** | Renderização     | Propriedade obrigatória ausente |
| 🔵  | **State Bug**     | Botão delete     | Mudança não refletida na tela   |
| 🟣  | **Memory Leak**   | Event listener   | Recurso não limpo               |
| 🟢  | **API Error**     | Resposta de erro | Número inadequado               |

## 🎥 Sugestões para o vídeo:

-   Como você **identificou** cada bug
-   **Por que** cada um é um problema
-   Qual seria o **impacto** de deixar sem corrigir
-   Como você **solucionou** cada um

## 💡 Critérios de Avaliação

-   **Identificação correta** dos bugs
-   **Qualidade** da solução aplicada
-   **Explicação técnica** clara no vídeo
-   **Raciocínio lógico** demonstrado

---

<div align="center">
  <img src="../assets/HAKUTAKU/HKTK-ARTES-R02_LOGO-H-01.svg" width="200" alt="Logo Hakutaku" />
  <br>
  <strong>Divirta-se debuggando! 🚀</strong>
</div>
