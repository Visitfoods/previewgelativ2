# Gelatomania AR

Este é um projeto de Realidade Aumentada que permite escanear QR codes para visualizar modelos 3D em AR.

## Funcionalidades

- Página inicial com botão para iniciar o scanner de QR code
- Scanner de QR code que lê códigos e redireciona para a experiência AR
- Experiência AR que mostra um modelo 3D sobre uma imagem alvo

## Tecnologias Utilizadas

- Next.js como framework principal
- QR Scanner para leitura de QR codes
- A-Frame e AR.js para a experiência de Realidade Aumentada
- Three.js para renderização 3D

## Como Executar

1. Instale as dependências:
   ```
   npm install
   ```

2. Execute o servidor de desenvolvimento:
   ```
   npm run dev
   ```

3. Acesse a aplicação em `http://localhost:3000`

## Preparação para Teste

1. Para testar a funcionalidade AR, você precisará:
   - Criar um QR code com o texto "gelato-ar"
   - Ter um marcador Hiro padrão ou criar um marcador personalizado
   - Adicionar seu modelo 3D na pasta `public/models/` com o nome `meuModelo.glb`

2. Para marcadores personalizados:
   - Crie uma imagem para usar como marcador
   - Use o MindAR Image Target Compiler online
   - Baixe o arquivo .mind gerado e coloque em `public/targets/target.mind`

## Desenvolvimento

Para modificar o projeto:

- Edite os componentes em `src/components/`
- Modifique as páginas em `src/pages/`
- Personalize os estilos em `src/styles/` 