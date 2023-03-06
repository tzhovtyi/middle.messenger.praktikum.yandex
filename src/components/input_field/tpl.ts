const tpl = `<input class="form-field__input" placeholder="." id="{{id}}" name="{{id}}" type="{{inputType}}"></input>
<label class="form-field__label" for="{{id}}">{{label}}</label>
<div id="error-{{id}}" class="input-error-message"></div>`;
export default tpl;
