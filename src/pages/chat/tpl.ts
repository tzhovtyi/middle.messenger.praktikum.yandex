const tpl = `<div class="chat-sidebar">
    {{{profileSettings}}}
    {{{dialogues}}}
    {{{newChatMenu}}}
    {{{newChatBtn}}}
</div>

{{#if currentChat}}
<div class="chat-lent">
    <nav class="chat-lent__head">
        <div class="chat-lent__head__avatar">
            {{#if currentChat.avatar}}
            <img src="{{IMG_URL}}/{{currentChat.avatar}}">
            {{/if}}
        </div>
        <h5 class="chat-lent__head__name">{{currentChat.title}}</h5>
        {{{openActionsBtn}}}
        {{{actionsMenu}}}
    </nav>
    {{{userAddMenu}}}
    {{{userRemoveMenu}}}

    {{{messages}}}

    <div class="chat-lent__messages-input-container">
        <button class="chat-lent__messages-input-container__attach-btn"></button>
        <textarea id="message" name="message" class="chat-lent__messages-input-container__textarea" {{!-- adjust area
            size to the number of lines entered --}}
            oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'></textarea>
        <button name="send-message" class="chat-lent__messages-input-container__send-btn"></button>
    </div>
</div>
{{/if}}
{{#unless currentChat}}
<div class="nochat-placeholder">
    <h5>Выберите чат из списка или создайте новый</h5>
</div>
{{/unless}}`;
export default tpl;
