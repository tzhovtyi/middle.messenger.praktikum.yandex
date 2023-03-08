const tpl = `<div class="error">
    <h1>{{errorNumber}}</h1>
    <h2>{{errorText}}</h2>
    {{{returnBtn}}}
</div>

<nav class="for-reviewer">
    <h5>For reviewer</h5>
    <a href="/">Вход</a>
    <a href="/#registration">Регистрация</a>
    <a href="/#chat">Чат</a>
    <a href="/#settings">Настройки</a>
    <a href="/#404">404</a>
    <a href="/#500">5**</a>
</nav>`;
export default tpl;
