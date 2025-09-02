🎟️ Meu Evento - Aplicativo de Check-in

Aplicativo móvel desenvolvido com React Native e Expo, projetado para gerenciar eventos e realizar o check-in de participantes em tempo real.
O app consome uma API para listar eventos, exibir detalhes, estatísticas e confirmar presenças de forma simples e eficiente.

🚀 Funcionalidades

✔️ Listagem de Eventos – Exibe todos os eventos disponíveis.
✔️ Detalhes do Evento – Mostra título, data, local e estatísticas.
✔️ Lista de Participantes – Visualize todos os inscritos em cada evento.
✔️ Busca em Tempo Real – Encontre participantes por nome, e-mail ou documento.
✔️ Check-in Rápido – Confirme presença com apenas um toque.

📂 Estrutura do Projeto

O núcleo do app está no diretório src/, organizado para garantir escalabilidade e manutenção.

src/
 ├── api/           # Comunicação com a API
 │   └── apiService.ts
 ├── components/    # Componentes reutilizáveis
 ├── hooks/         # Hooks customizados
 ├── screens/       # Telas principais do app
 └── types/         # Tipagens TypeScript

🔹 Destaques

src/api/apiService.ts
Centraliza a comunicação com a API usando axios.

getEventsList() → Lista de eventos

getEventDetails(eventId) → Detalhes de um evento

getAttendees(eventId, query, page) → Participantes (com busca e paginação)

checkInAttendee(eventId, attendeeId) → Check-in de participante

Componentes

EventListItem.tsx → Card de eventos

AttendeeItem.tsx → Item da lista de participantes

KpiCard.tsx → Exibe indicadores como Total, Presentes e Ausentes

Hooks

useDebounce.ts → Otimiza buscas, evitando requisições desnecessárias

Telas

EventsListScreen.tsx → Lista inicial de eventos

EventScreen.tsx → Detalhes do evento e KPIs

AttendeesScreen.tsx → Participantes + Check-in em tempo real

⚙️ Tecnologias e Dependências

📦 Principais libs:

axios
 → Requisições HTTP

@react-navigation/native-stack
 → Navegação entre telas

@gorhom/bottom-sheet
 → UI com modais

react-native-reanimated
 → Animações avançadas

react-native-gesture-handler
 → Gestos fluídos

▶️ Como Rodar o Projeto

Clone o repositório

git clone <URL-DO-SEU-REPOSITORIO>
cd <NOME-DO-PROJETO>


Instale as dependências

npm install


Configure a API

Edite src/api/apiService.ts

Defina a BASE_URL da sua API

Insira seu TOKEN de autenticação

Inicie o servidor de desenvolvimento

npm start


ou, se preferir rodar direto no dispositivo/emulador:

npm run android
npm run ios

📊 Demonstração Visual (Sugestão)

👉 Aqui você pode adicionar prints de tela ou gifs curtos mostrando:

Lista de eventos

Detalhes com KPIs

Tela de participantes + check-in

✨ Diferenciais

Interface leve e intuitiva 🖥️

Check-in em tempo real 🔄

Otimização com hooks customizados ⚡

Código limpo e organizado para fácil manutenção 📌
