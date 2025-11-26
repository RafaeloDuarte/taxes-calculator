# 📘 Tax Calculator – CLI (Cálculo de taxas)

Este projeto implementa um **programa de linha de comando (CLI)** capaz de calcular o imposto devido sobre operações de compra e venda de ações, seguindo todas as regras descritas no desafio técnico do Nubank.

O programa lê operações via **stdin** (uma lista de operações por linha, em JSON) e devolve para o **stdout** o valor do imposto pago em cada operação, mantendo o estado da simulação apenas dentro da linha processada.

O projeto foi escrito em **Typescript** e precisa de ambiente **Nodejs** configurado. A versão do Node usada foi **v22.14.0**. A versão de Ttpescript é **v5.9.3**.

---

## 📑 Conteúdo
- [Descrição](#descrição)
- [Regras do Calculo de taxas](#regras-do-calculo)
- [Arquitetura e Decisões Técnicas](#arquitetura-e-decisões-técnicas)
- [Instalação](#instalação)
- [Como Executar](#como-executar)
- [Executando com arquivo (input-redirection)](#executando-com-arquivo-input-redirection)
- [Testes](#testes)

---

## Descrição

O objetivo da aplicação é:

- Calcular o imposto pago sobre operações de compra e venda de ações.
- Considerar preço médio ponderado, lucros, prejuízos acumulados e as regras de isenção.
- Garantir consistência entre as operações sem utilizar banco de dados ou estado entre execuções.
- Fornecer uma solução simples e de fácil manutenção.

O programa recebe **uma lista de operações por linha** e retorna o imposto correspondente a cada operação na mesma ordem.

---

## Regras do Calculo de taxas

### ✔️ 1. Compra não paga imposto
Sempre retorna `{ "tax": 0 }`.

### ✔️ 2. Cálculo do preço médio ponderado
Atualiza o preço médio **somente em operações de compra**.

### ✔️ 3. Lucro e imposto
O lucro é calculado por:

(preço_venda - preço_médio) * quantidade


O imposto é **20% sobre o lucro após dedução de prejuízos anteriores**.

### ✔️ 4. Prejuízo
- Prejuízo ocorre quando vende abaixo da média.
- Prejuízos são **acumulativos**, nunca substituídos.
- Podem ser usados para reduzir lucros futuros.

### ✔️ 5. Regra dos R$ 20.000
Se o total da venda (`unit-cost * quantity`) for **≤ 20.000**:
- Não paga imposto  
- O prejuízo **não é usado**  
- O prejuízo **não é alterado**

### ✔️ 6. Estado isolado por linha
Cada linha do input representa uma simulação independente.

### ✔️ 7. Arredondamento
Todos os valores monetários são arredondados para **duas casas decimais**.

---

## Arquitetura e Decisões Técnicas

A solução foi estruturada com foco em:

### **Simplicidade**
- Código pequeno, organizado e fácil de entender.
- Sem dependências desnecessárias.

### **Separação de responsabilidades**
- `calculator.ts`: regras de imposto e cálculos.
- `cli.ts`: interação via stdin/stdout.
- `types.ts`: tipagem das operações e estado.

### **Estado explícito**
- O estado da simulação é armazenado em uma estrutura clara.
- Zero dependência externa.

### **Testes sólidos**
- Todos os 9 casos oficiais do PDF foram implementados.
- Garantia de comportamento correto em cenários complexos.

---

## Instalação

```bash
npm install
```

## Como construir

```bash
npm run build
```

## Como executar

```bash
npm start
```

Após iniciar, o programa espera linhas no seguinte formato:

```bash
[{"operation":"buy","unit-cost":10.00,"quantity":10000},{"operation":"sell","unit-cost":20.00,"quantity":5000}]
```

Finalize enviando uma linha vazia.

## Executando com arquivo (input redirection)

```bash
./nubank-tax-calculator < input.txt
```

Isso simula a execução real esperada pelo Nubank.

## Testes

```bash
npm test
```

Os testes incluem:

- Todos os Casos #1 a #9 do PDF oficial

- Verificações de preço médio

- Acúmulo correto de prejuízo

- Regra de isenção dos 20.000
