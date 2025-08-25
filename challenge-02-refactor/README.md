# 🔧 Challenge 02: Code Refactor

<div align="center">
  <img src="../assets/HAKUTAKU/HKTK-ARTES-R02_AVATAR-FACE-SONO.svg" width="120" alt="Hakutaku com sono" />
  <h3>Este código está funcionando, mas pode melhorar muito...</h3>
</div>

## 📋 Contexto

Você recebeu um componente que implementa uma base de conhecimento para a Hakutaku. O código **funciona perfeitamente**, mas foi escrito às pressas e precisa de uma **refatoração** para ficar profissional e maintível.

## 🎯 Objetivos (sugestão: 10-15 minutos)

1. **Identificar** problemas de código/arquitetura
2. **Refatorar** o componente seguindo boas práticas
3. **Justificar** suas decisões no vídeo

## 🚀 Como executar

```bash
# Instalar dependências (recomendamos bun, mas npm/yarn funcionam)
bun install     # ou: npm install / yarn install

# Executar em modo desenvolvimento (porta 3001)
bun run dev     # ou: npm run dev / yarn dev
```

Acesse: `http://localhost:3001`

## 🔍 O que avaliar

### Problemas para resolver:

-   **Componente muito grande** (~200+ linhas)
-   **Lógica repetitiva** e código duplicado
-   **Múltiplas responsabilidades** no mesmo lugar
-   **Estilos inline** espalhados pelo código
-   **Falta de componentização**

### Sugestões de melhorias:

-   **Separar** em componentes menores
-   **Extrair** hooks personalizados
-   **Remover** duplicação de código
-   **Organizar** estilos
-   **Aplicar** princípios de design (SRP, DRY, etc.) que você conhece ou encontrou ao pesquisar

## 📊 Métricas de Sucesso

**Antes** da refatoração:

-   1 arquivo com ~200 linhas
-   Componente com múltiplas responsabilidades
-   Estilos inline em todo lugar

**Depois** da refatoração:

-   Múltiplos componentes especializados
-   Hooks customizados para lógica
-   Código mais limpo e legível

## 🎥 Sugestões para o vídeo:

-   **Quais problemas** você identificou
-   **Como** você estruturou a refatoração
-   **Por que** escolheu essa abordagem
-   **Quais patterns** aplicou

## 💡 Critérios de Avaliação

-   **Identificação** dos problemas de código
-   **Qualidade** da refatoração
-   **Aplicação** de boas práticas
-   **Justificativa técnica** das decisões

## 🌟 Sugestões

-   Pense em **Single Responsibility Principle**
-   Considere **Custom Hooks** para lógica
-   Abstraia **componentes reutilizáveis**
-   Organize **estilos de forma consistente**

---

<div align="center">
  <img src="../assets/HAKUTAKU/HKTK-ARTES-R02_LOGO-H-01.svg" width="200" alt="Logo Hakutaku" />
  <br>
  <strong>Mostre seu estilo de refatoração! 🏗️</strong>
</div>
