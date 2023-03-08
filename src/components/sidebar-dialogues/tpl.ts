const tpl = `{{#each chats}}
<div class="sidebar-dialogue" data-chatid="{{id}}" data-chattitle="{{title}}" data-chatavatar="{{avatar}}">
    <div class="sidebar-dialogue__avatar">
        {{#if avatar}}
        <img src="{{../IMG_URL}}/{{avatar}}">
        {{/if}}
    </div>
    <div class="sidebar-dialogue__message">
        <h5 class="sidebar-dialogue__message__sender">{{title}}</h5>
        {{#if last_message}}
        <div class="sidebar-dialogue__message__content">
            {{#if last_message.user.login}}
            <span>{{last_message.user.login}}:
                {{/if}}
            </span>{{last_message.content}}
        </div>
        {{/if}}
    </div>
    <span class="sidebar-dialogue__info sidebar-dialogue__timestamp">{{last_message.time}}</span>
    {{#if unread_count}}
    <span class="sidebar-dialogue__info sidebar-dialogue__unread">{{unread_count}}</span>
    {{/if}}
</div>
{{/each}}`;
export default tpl;
