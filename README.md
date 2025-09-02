# 🎟️ Meu Evento - Aplicativo de Check-in

Aplicativo móvel desenvolvido com **React Native** e **Expo**, projetado para gerenciar eventos e realizar o **check-in de participantes** em tempo real.  
O app consome uma **API** para listar eventos, exibir detalhes, estatísticas e confirmar presenças de forma simples e eficiente.

---

## 🚀 Funcionalidades

- ✔️ **Listagem de Eventos** – Exibe todos os eventos disponíveis.  
- ✔️ **Detalhes do Evento** – Mostra título, data, local e estatísticas.  
- ✔️ **Lista de Participantes** – Visualize todos os inscritos em cada evento.  
- ✔️ **Busca em Tempo Real** – Encontre participantes por nome, e-mail ou documento.  
- ✔️ **Check-in Rápido** – Confirme presença com apenas um toque.  

---


### 🔹 Destaques

- **`src/api/apiService.ts`**  
  Centraliza a comunicação com a API usando **axios**.  
  - `getEventsList()` → Lista de eventos  
  - `getEventDetails(eventId)` → Detalhes de um evento  
  - `getAttendees(eventId, query, page)` → Participantes (com busca e paginação)  
  - `checkInAttendee(eventId, attendeeId)` → Check-in de participante  

- **Componentes**  
  - `EventListItem.tsx` → Card de eventos  
  - `AttendeeItem.tsx` → Item da lista de participantes  
  - `KpiCard.tsx` → Exibe indicadores como Total, Presentes e Ausentes  

- **Hooks**  
  - `useDebounce.ts` → Otimiza buscas, evitando requisições desnecessárias  

- **Telas**  
  - `EventsListScreen.tsx` → Lista inicial de eventos  
  - `EventScreen.tsx` → Detalhes do evento e KPIs  
  - `AttendeesScreen.tsx` → Participantes + Check-in em tempo real  

---

## ⚙️ Tecnologias e Dependências

📦 **Principais libs**:

- [axios](https://axios-http.com/) → Requisições HTTP  
- [@react-navigation/native-stack](https://reactnavigation.org/) → Navegação entre telas  
- [@gorhom/bottom-sheet](https://gorhom.github.io/react-native-bottom-sheet/) → UI com modais  
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) → Animações avançadas  
- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/) → Gestos fluídos  

---

## ▶️ Como Rodar o Projeto

1. **Clone o repositório**  
   ```bash
   git clone https://github.com/CarlosDanielMS/dev-mobile.git
   cd <NOME-DO-PROJETO>

   
## ⚙️ Instalação e Configuração

### 📦 1. Instale as dependências
```bash
npm install
🔑 2. Configure a API
Abra o arquivo src/api/apiService.ts e edite:

Defina a constante BASE_URL com o endereço da sua API

Insira o seu TOKEN de autenticação

▶️ 3. Inicie o servidor de desenvolvimento
bash
Copiar código
npm start
📱 4. Rodar no dispositivo ou emulador
bash
Copiar código
npm run android
npm run ios
📊 Demonstração Visual
👉 Adicione aqui prints de tela ou GIFs curtos mostrando:

🗓️ Lista de eventos

📈 Detalhes com KPIs

✅ Tela de participantes com check-in em tempo real

✨ Diferenciais do Projeto
🖥️ Interface leve e intuitiva para fácil uso em qualquer dispositivo

🔄 Check-in em tempo real, garantindo agilidade no processo

⚡ Hooks customizados para otimização de buscas e performance

📌 Código limpo e organizado, facilitando manutenção e escalabilidade

