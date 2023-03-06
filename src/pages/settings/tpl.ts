const tpl = `<div class="settings-sidebar">
    {{{returnBtn}}}
</div>
<div id="avatar" name="avatar" class="settings__avatar">
    {{#if avatarURL}}
    <img src='{{IMG_URL}}/{{avatarURL}}'>
    {{/if}}
</div>
<h4 class="settings__user-name">{{name}}</h4>
<div class="settings__user-info-container">
    {{{userInfo}}}
</div>
<div class="settings__actions-container">
    {{{settingsActions}}}
</div>
<div class="settings__change-avatar-menu-container" name="avatarChange">
    <div class="settings__change-avatar-menu">
        <h4>Загрузите файл</h4>
        <input type="file" id='avatar-input' accept="Image">
        <label for="avatar-input" class="btn-div">
            Выбрать файл на компьютере
        </label>
    </div>
</div>`;
export default tpl;
