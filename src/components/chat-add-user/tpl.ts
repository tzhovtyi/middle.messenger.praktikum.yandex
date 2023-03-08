const tpl = `<form class="add-user-form">
    <h4>Добавить пользователя</h4>
    <div class="add-user-form__search">
        <div class="chat-sidebar__message-search">
            <input class="chat-sidebar__message-search-input" placeholder="Поиск" name="login">
            <div class="chat-sidebar__message-search-label">
                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.59239 8.41382C6.16047 9.84574 3.83886 9.84574 2.40694 8.41382C0.975017 6.9819 0.975017 4.6603 2.40694 3.22837C3.83886 1.79645 6.16047 1.79645 7.59239 3.22837C9.02431 4.6603 9.02431 6.9819 7.59239 8.41382ZM8.03277 9.79678C6.07255 11.2962 3.25696 11.1495 1.46413 9.35663C-0.488491 7.40401 -0.488491 4.23819 1.46413 2.28556C3.41675 0.332943 6.58258 0.332943 8.5352 2.28556C10.3279 4.07831 10.4747 6.89373 8.97555 8.85394L12.5423 12.4206L11.5994 13.3635L8.03277 9.79678Z"
                        fill="#999999" />
                </svg>
            </div>
        </div>
        <button type="submit" class="search-user-btn">Найти</button>
    </div>
    <div class="add-user-search-results">
        {{#each searchResults}}
        <div class="add-user-search-result" data-uid="{{id}}">
            <span>{{login}}</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.999756 9H8.99976M8.99976 9H16.9998M8.99976 9V17M8.99976 9V1" stroke="#CCCCCC"
                    stroke-linecap="round" />
            </svg>
        </div>
        {{/each}}
</form>`;
export default tpl;
