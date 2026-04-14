Етап 1: TypeScript Deep Dive (Основа всього)Перш ніж іти в AWS Lambda чи GraphQL, треба впевнено володіти TS, оскільки
весь бекенд буде на ньому.Що вивчити: Interfaces vs Types, Generics (дуже важливо для API), Union/Intersection types,
Utility Types (Partial, Pick, Omit).Практика: Перепиши невеликий проп-скрипт у Vue з JS на суворий TS.Етап 2: AWS
Fundamentals & Amplify (Хмарне середовище)Amplify — це твій міст між фронтендом і бекендом.Amplify Gen 2 (Code-first):
Вивчи новий підхід, де інфраструктура описується кодом (TypeScript). Це зараз стандарт.Auth (Cognito): Налаштування User
Pools. Розберися, як працюють JWT-токени (idToken, accessToken).SSM Parameter Store: Як зберігати конфігурації (
наприклад, URL до API) не в коді, а в сервісі AWS.Етап 3: Data Layer (GraphQL + DynamoDB)Це найскладніша частина
стеку.GraphQL (AppSync): Навчися писати схеми (schema.graphql), зрозумій різницю між Query, Mutation та
Subscription.DynamoDB: Це NoSQL. Забудь про Join'и. Вивчи, що таке Partition Key та Sort Key. Розберися з базовими
операціями: GetItem, Query, Scan (чому Scan — це дорого і повільно).Зв'язок: Як Amplify автоматично генерує типи TS на
основі твоєї GraphQL схеми.Етап 4: Backend Logic (Lambda + API Gateway)Тут ти стаєш Fullstack розробником.AWS Lambda:
Написання функцій на TS. Обробка подій (Event), робота з контекстом.API Gateway: Як створити REST або WebSocket
інтерфейс перед Лямбдою.Логіка: Напиши Лямбду, яка читає дані з DynamoDB і повертає їх через API.Етап 5: UI &
Integration (PrimeVue + Vite)Тепер з'єднуємо все в один інтерфейс.PrimeVue 3.5: Робота з компонентами (DataTable, Form
validation). Налаштування тем та стилів.Vite: Оптимізація збірки, робота з .env файлами.Інтеграція: Використання
aws-amplify бібліотеки у Vue-компонентах для виклику GraphQL та авторизації.Етап 6: Enterprise Security & DevOpsЦе те,
що відрізняє Middle розробника від Junior.Azure AD + Cognito: Налаштування Federation (щоб заходити в додаток через
корпоративний акаунт Microsoft). Робота з групами (RBAC — Role Based Access Control).CloudFormation: Розуміння "
Infrastructure as Code" (IaC). Навіть якщо Amplify робить це за тебе, треба розуміти, як виглядають ресурси під
капотом.VPN та VPC: Як твій додаток може безпечно "спілкуватися" з внутрішніми базами даних компанії, які не виставлені
в інтернет.Рекомендований графік (Roadmap)ТижденьТемаРезультат1TS + PrimeVueСтворено UI-форму з повною типізацією на Vue
3.2Amplify Auth + CognitoМожна зареєструватися і залогінитися в додаток.3GraphQL + DynamoDBСтворена база даних рослин (
чи інша), дані відображаються у таблиці PrimeVue.4Lambda + APIКалькулятор або логіка обробки даних винесена на бекенд в
Lambda.5Azure AD + VPNНалаштований вхід через корпоративну пошту (якщо є доступ) та робота з SSM.
