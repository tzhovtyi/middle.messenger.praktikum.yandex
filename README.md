## Practicum Yandex: sprint_1 ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/tzhovtyi/middle.messenger.praktikum.yandex/tests.yml) [![Netlify Status](https://api.netlify.com/api/v1/badges/d9eb756c-9169-45dc-890e-4f53abab2631/deploy-status)](https://app.netlify.com/sites/practicum-chat-app/deploys)

### Web chat messenger

| Command            | Description                                            |
| ------------------ | ------------------------------------------------------ |
| `npm run dev`      | Starts Webpack developer server at port 3000           |
| `npm run build`    | Builds the project into dist/ folder                   |
| `npm run start`    | Builds the project and starts Node server at port 3000 |
| `npm run test`     | Runs unit test with Jest                               |
| `npm run tsc`      | Checks for ts error in all files                       |
| `npm run lint`     | Runs ESlint and fixes errors                           |
| `npm run stylelint`| Runs stylelint                                         |

[Deployed on Netlify](https://practicum-chat-app.netlify.app/)
[Deployed on Render](https://yandex-praktikum-messenger-ejza.onrender.com)

[Figma design templates](https://www.figma.com/file/dctKPtCeSqShhDfyEVkJZX/Yandex?node-id=0%3A1&t=uAIvx9AX66zrlCWI-1)

### Running with Docker (port 3000)

    docker build -t chat .
    docker run -p 3000:3000 -d chat


#### Technical features:

✔️ SPA application built with native class components  
✔️ No frameworks are used  
✔️ Typescript  
✔️ Only one frontend library (Handlebars)  
✔️ Styles written in SCSS  
✔️ Built with Webpack    
✔️ Deployed on Netlify  
✔️ All form validations performed by one class  
✔️ Vanilla router implementation  
✔️ API: auth, profile info changing, creating/deleting chats, adding/removing chat members,  
avatar upload for user and chats  
✔️ WebSocket for real-time messages  
✔️ XSS- and DOS- protected  
✔️ Tested with Jest    
✔️ Uses Docker container  
✔️ Pre-commit checks with Husky  
