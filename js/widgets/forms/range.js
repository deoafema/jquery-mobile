//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Slider form widget
//>>label: Slider
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.slider.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../../jquery.mobile.core", "../../jquery.mobile.widget", "./textinput", "../../jquery.mobile.buttonMarkup", "./reset" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {
	$.widget( "mobile.range", $.mobile.widget, {
		widgetEventPrefix: "range",

		options: {
			theme: null,
			trackTheme: null,
			disabled: false,
			initSelector: ":jqmData(role='range')",
			mini: false,
			highlight: false
		},

		_create: function() {
			var inputFirst,inputs,sliders, inputLast, sliderFirst, sliderLast, sliderLastWidth, sliderFirstWidth, label,
			self = this,
			$el = self.element,
			o = this.options;
			inputFirst = $el.find( "input:first" );
			inputLast = $el.find( "input:last" );
			inputFirst.addClass( "ui-range-first" );
			inputLast.addClass( "ui-range-last" );
			label = $el.find( "label" );
			//$el.wrap( "<div class=\"ui-range-wrap\" />" );
			//wrap = $el.closest( ".ui-range-wrap" );
			$el.append("<div class=\"ui-range-inputs\" />").append("<div class=\"ui-range-sliders\" />");
			inputs = $el.find(".ui-range-inputs");
			sliders = $el.find(".ui-range-sliders");
			
			inputFirst.appendTo( inputs );
			inputs.append(" - ");
			inputLast.appendTo( inputs );
			if( o.mini ){
				label.addClass("ui-mini");
				self.element.addClass("ui-mini");
			}
			$el.find( "input" ).slider({
				theme: o.theme,
				trackTheme: o.trackTheme,
				disabled: o.disabled,
				mini: o.mini,
				highlight: o.highlight
			}).slider( "refresh" );
			$el.addClass( "ui-range" );
			sliderFirst = $el.find( ".ui-slider:first" ).addClass( "ui-slider-first" );
			sliderLast = $el.find( ".ui-slider:last" ).addClass( "ui-slider-last" );
			sliderFirst.appendTo(sliders);
			sliderLast.appendTo(sliders);
			label.prependTo(inputs).addClass( "ui-slider" );
			$.extend( self, {
				inputFirst: inputFirst,
				inputLast: inputLast,
				label: label,
				sliderFirst: sliderFirst,
				sliderLast: sliderLast,
				sliderFirstWidth: sliderFirstWidth,
				sliderLastWidth: sliderLastWidth
			});

			self._bindResize();
			self._bindChangeEvents();
			self._bindToggle();
		},

		_bindChangeEvents: function() {
			this._on( {
				"change input": function( event ){
					var min = parseInt( this.inputFirst.val() ),
						max = parseInt( this.inputLast.val() ),
						first = $(event.target).hasClass("ui-range-first");
						if( min > max )  {
							$( event.target ).val(first ? max: min).slider("refresh");
						}
						if(first){
							this.sliderFirstWidth = this.sliderFirst.find( ".ui-slider-bg" ).width();
						} else {
							this.sliderLastWidth = this.sliderLast.find( ".ui-slider-bg" ).width();
						}
						if( min !== max || !first ) this._updateHighlight();
				}
			});
		},

		_bindResize: function() {
			var self = this,delay;
			this._on( this.element.closest(".ui-page") , {
				"pageshow": function(){
					self.sliderFirstWidth = self.sliderFirst.find( ".ui-slider-bg" ).width();
					self.sliderLastWidth = self.sliderLast.find( ".ui-slider-bg" ).width();
				}
			});
			this._on( window , {
				"throttledresize": function(event){
					self.sliderLastWidth = self.sliderLast.find( ".ui-slider-bg" ).width();
				}
			});
		},

		_bindToggle: function() {
			this._on( this.element.find( ".ui-slider-handle" ), {
				"vclick": function( event ){
					var first = $(event.target).closest( ".ui-slider" ).hasClass( "ui-slider-first" );
					this.sliderFirst.css( "z-index", first ? 1 : "" );
				}
			});
		},

		_updateHighlight: function() {
			var newWidth = this.sliderLastWidth - this.sliderFirstWidth,
				tWidth = this.sliderLast.width();
				this.element.find( ".ui-slider-bg" ).css({
					"margin-left": parseInt(this.sliderFirstWidth / tWidth * 100) + "%",
					"width": parseInt((newWidth) / tWidth * 100) + "%"
				});
		}

	});

$.widget( "mobile.range", $.mobile.range, $.mobile.behaviors.formReset );

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ) {
	$.mobile.range.prototype.enhanceWithin( e.target, true );
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");