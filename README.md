
Это дипломная работа, в процессе написания. Тема диплома Социальная сеть. Стек на фронте React + TypeScript + Vite, бэк отдельным проектом на Python + Django (Django REST framework)

# Временно не работает аутентификация. 
Что бы обойти аутентификацию, нужно удалить обвязку домашней страницы в файле
```src\app\routes\AppRoutes.tsx```

а именно в строке:
```javascript
element: (
    <RequireAuth><HomePage /></RequireAuth>
)
```
удалить компонент ```RequireAuth```

Далее запускаем сначало сервер командой:
```bash
 npm run server
```
Потом сам проект командой:
```bash
 npm run dev
```