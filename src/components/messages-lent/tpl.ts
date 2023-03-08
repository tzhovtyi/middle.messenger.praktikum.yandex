const tpl = `{{#each messages}}
{{#if fromThisUser}}
<div class="message message_right">
    <p>{{content}}</p>
    <span class="message__timestamp">{{time}}</span>
</div>
{{/if}}
{{#unless fromThisUser}}
<div class="message">
    <p>{{content}}</p>
    <span class="message__timestamp">{{time}}</span>
</div>
{{/unless}}
{{/each}}`;

export default tpl;
