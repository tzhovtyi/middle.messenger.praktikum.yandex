const tpl = `<div class="settings__field__input-container">
    <span class="settings__field__label">{{label}}</span>
    <input class="settings__field__input" disabled id="{{id}}" value="{{value}}" name="{{id}}" type="{{type}}">
</div>
<div id="error-{{id}}" class="settings__field__input__error"></div>`;
export default tpl;
