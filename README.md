Meu Evento - Aplicativo de Check-in (React Native)
Este é um aplicativo móvel desenvolvido com React Native e Expo, projetado para gerenciar eventos e o check-in de participantes. Ele consome uma API para listar eventos, exibir detalhes e estatísticas, e permite que um operador visualize e confirme a presença dos participantes em tempo real.

🚀 Funcionalidades
Listagem de Eventos: Tela inicial que exibe todos os eventos disponíveis a partir da API.

Detalhes do Evento: Ao selecionar um evento, o usuário visualiza informações detalhadas como título, data, local e estatísticas (total de inscritos, presentes e ausentes).

Lista de Participantes: Para cada evento, é possível ver a lista completa de participantes.

Busca em Tempo Real: Funcionalidade de busca para encontrar participantes por nome, e-mail ou documento.

Check-in de Participantes: Confirmação de presença de um participante com um simples toque, atualizando seu status.

📂 Estrutura do Projeto (Foco em src)
O coração do aplicativo está no diretório src, que é organizado da seguinte forma para garantir escalabilidade e manutenção:

src/api/
apiService.ts: Centraliza toda a comunicação com a API externa. Ele utiliza o axios para criar um cliente pré-configurado com a BASE_URL e o token de autorização. Exporta funções assíncronas para cada endpoint, como:

getEventsList(): Busca a lista de todos os eventos.

getEventDetails(eventId): Retorna os detalhes de um evento específico.

getAttendees(eventId, query, page): Obtém a lista paginada de participantes de um evento, com suporte a busca.

checkInAttendee(eventId, attendeeId): Realiza o check-in de um participante.

src/components/
Contém os componentes de UI reutilizáveis, que são a base para a construção das telas.

EventListItem.tsx: Um card que exibe as informações principais de um evento na lista inicial (título, data, local e estatísticas).

AttendeeItem.tsx: Componente para cada item da lista de participantes. Exibe o nome e e-mail e permite a ação de check-in.

KpiCard.tsx: Um card para exibir os indicadores chave de desempenho (KPIs) de um evento, como "Total", "Presentes" e "Ausentes".

src/hooks/
Hooks customizados que encapsulam lógicas reutilizáveis.

useDebounce.ts: Um hook essencial para a funcionalidade de busca. Ele adiciona um "atraso" (debounce) na atualização do termo de busca, evitando que uma nova chamada à API seja feita a cada caractere digitado pelo usuário, melhorando a performance.

src/screens/
As telas que compõem a navegação principal do aplicativo.

EventsListScreen.tsx: A tela principal que consome o getEventsList da API para renderizar uma lista de eventos usando o componente EventListItem.

EventScreen.tsx: Exibe os detalhes de um evento específico, incluindo os cards de KPI (KpiCard) e um botão que leva à lista de participantes.

AttendeesScreen.tsx: Tela que lista todos os participantes de um evento. Utiliza o hook useDebounce para a barra de busca e gerencia a paginação, o estado de carregamento e as ações de check-in.

src/types/
api.ts: Arquivo central para as definições de tipos TypeScript usadas nas respostas da API. Garante a tipagem segura dos dados em todo o aplicativo, definindo interfaces como Event, Attendee e EventStats.

⚙️ Configuração e Dependências
O arquivo package.json define os scripts e as dependências do projeto.

Scripts Principais:

npm start: Inicia o servidor de desenvolvimento do Expo.

npm run android: Inicia o app no emulador Android.

npm run ios: Inicia o app no simulador iOS.

Dependências Notáveis:

axios: Para as requisições HTTP à API.

@react-navigation/native-stack: Para a navegação baseada em pilha entre as telas.

@gorhom/bottom-sheet: Utilizado para componentes de UI modais.

react-native-reanimated: Para animações complexas.

react-native-gesture-handler: Para um controle avançado de gestos.

🏁 Como Rodar o Projeto
Clone o repositório:

Bash

git clone <URL-DO-SEU-REPOSITORIO>
cd <NOME-DO-PROJETO>
Instale as dependências:

Bash

npm install
Configure a API:

Abra o arquivo src/api/apiService.ts.

Altere a constante BASE_URL para o endereço da sua API local ou remota.

Insira o seu token de autenticação na constante TOKEN.

Inicie o servidor de desenvolvimento:

Bash

npm start
