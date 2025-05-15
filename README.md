# Gelatomania AR

Aplicação de Realidade Aumentada (AR) com scanner QR para visualização de modelos 3D.

## Descrição

Gelatomania AR é um MVP (Produto Mínimo Viável) que permite aos utilizadores escanear códigos QR e visualizar modelos 3D em realidade aumentada. A aplicação foi desenvolvida utilizando Next.js, React, Three.js e bibliotecas AR como MindAR e A-Frame.

## Funcionalidades

- Scanner de códigos QR
- Visualização de modelos 3D em realidade aumentada
- Múltiplas abordagens de AR (MindAR, A-Frame AR.js)
- Visualização simples de modelos 3D (sem AR)
- Interface de utilizador intuitiva e responsiva

## Tecnologias Utilizadas

- **Next.js** - Framework React para renderização do lado do servidor
- **React** - Biblioteca JavaScript para construção de interfaces
- **Three.js** - Biblioteca para gráficos 3D na web
- **MindAR** - Biblioteca de AR baseada em imagens
- **A-Frame** - Framework para experiências de realidade virtual
- **QR Scanner** - Biblioteca para leitura de códigos QR

## Estrutura do Projeto

```
GelatomaniaARV2/
├── public/
│   ├── models/         # Modelos 3D (.glb)
│   └── targets/        # Marcadores para AR (.mind)
├── src/
│   ├── components/     # Componentes React reutilizáveis
│   ├── pages/          # Páginas da aplicação
│   └── styles/         # Estilos CSS
├── .next/              # Arquivos de build do Next.js
├── next.config.js      # Configuração do Next.js
├── package.json        # Dependências do projeto
└── README.md           # Documentação
```

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/GelatomaniaARV2.git
cd GelatomaniaARV2
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Aceda à aplicação em `http://localhost:3000`

## Como Utilizar

1. Na página inicial, clique em "Iniciar Scanner QR" ou "Experiência AR Melhorada"
2. Se escolher o scanner QR, aponte a câmara para um código QR válido
3. Após a deteção do código QR, clique em "Continuar para AR"
4. Na experiência AR, aponte a câmara para o marcador (target)
5. O modelo 3D aparecerá sobre o marcador

## Modos de AR Disponíveis

### 1. MindAR (Recomendado)
- Baseado em reconhecimento de imagens
- Mais estável e preciso
- Melhor desempenho em dispositivos móveis

### 2. A-Frame AR.js
- Dois modos disponíveis:
  - Marcador personalizado (target.mind)
  - Marcador padrão Hiro

### 3. Visualização Simples
- Visualização do modelo 3D sem AR
- Útil para testar o modelo

## Resolução de Problemas

Se encontrar problemas com a experiência AR:

1. **Certifique-se de que tem boa iluminação**
2. **Mantenha o dispositivo estável**
3. **Ajuste a distância ao marcador**
4. **Verifique se o seu dispositivo suporta WebAR**
5. **Experimente diferentes modos de AR disponíveis na aplicação**

## Licença

ISC

## Contacto

Para questões ou sugestões, entre em contacto connosco através de [email@exemplo.com](mailto:email@exemplo.com). 