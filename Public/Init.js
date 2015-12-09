'use strict';

var InitVendors = (function () {

	return {
		Form: {
			Element: function() {
				$('.ui.checkbox').checkbox();
			},
			Validation: function(model) {
				return $('.ui.form').form({ on: 'blur', inline: 'true', fields: model });
			}
		},
		Layout: {
			Element: function() {
				$('.ui.dropdown').dropdown();
				$('.popup').popup();
				$('.ui.accordion').accordion();
				$('.activating-popup').popup({
		          transition: 'scale',
				  on: 'click'
		        });
				$('.message .close').on('click', function() {
  					$(this).closest('.message').fadeOut();
				});
				/*$('.ui.modal').modal({
				    blurring: true,
					closable: false,
		  		}).modal('attach events', '.modal-open.button', 'show');*/
			}
		}
	};

});