const tpl = `<form class="add-user-form">
    <h4>Удалить пользователя</h4>
    </div>
    <div class="add-user-search-results">
        {{#each searchResults}}
        <div class="add-user-search-result" data-uid="{{id}}">
            <span>{{login}}</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L9 9M9 9L17 17M9 9L1 17M9 9L17 1" stroke="white" stroke-linecap="round" />
            </svg>
        </div>
        {{/each}}
</form>`;
export default tpl;
