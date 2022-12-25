
const FORM_ID = '#login-form';
const CONTROLS = `${FORM_ID} .form-group.material-control`;
const ALL_FORM_CONTROLS = [];

$(document).ready(function() {
  useHttps();
  initControls();
  listenEvents();
});

function useHttps() {
	const urlAction = $(FORM_ID).attr('action');
	if (urlAction && window.location.protocol === 'https:') {
		if (urlAction.startsWith('https')) return;
		$(FORM_ID).attr('action', urlAction.replace("http", "https"));
	}
}

function initControls() {
  $(CONTROLS).each((_, el) => {
    let control = $(el);
    if (InputField.is(control)) {
      ALL_FORM_CONTROLS.push(InputField.create(control));
    }
  });
}

function listenEvents() {
  // $('#submit-btn').click(__handleSubmit);

  if ($('#kc-alert-close').length > 0) {
    $('#kc-alert-close').on('click', closeAlert);
    $('#kc-alert-backdrop').on('click', closeAlert);
  }
}

function __handleSubmit(event) {
  // __resetFormValidation();
  // if (!__validate()) {
  //   event.preventDefault();
  //   return false;
  // }

  $(FORM_ID).submit();
}

function __resetFormValidation() {
  ALL_FORM_CONTROLS.forEach(control => control.reset());
}

function __validate() {
  return ALL_FORM_CONTROLS.reduce((isValid, control) => {
    return isValid && control.validate({ wantFocus: true, forceValidate: true });
  }, true);
}

function closeAlert() {
  $('#kc-alert-panel').addClass('close');
  $('#kc-alert-backdrop').addClass('close');
  setTimeout(() => {
    $('#kc-alert-panel').remove();
    $('#kc-alert-backdrop').remove();
    $(`${FORM_ID} .form-group.material-control`).each((index, el) => {
      const input = $(el).find('input');
      input.attr('tabindex', 0);
      if (index === 0) input.focus();
    })
    $('#submit-btn').attr('tabindex', 0);
  }, 200);
}