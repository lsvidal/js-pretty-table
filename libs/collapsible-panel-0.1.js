(function ($) {
		$.fn.extend({
			collapsiblePanel : function () {
				$(this).each(function () {
					$(this).addClass("ui-widget");
					$(this).wrapInner("<div class='ui-widget-content'></div>");
					$("<div class='ui-widget-header'><span class='ui-icon ui-expander' style='float: left'>+</span><span>" + $(this).attr("title") + "</span></div>").prependTo($(this));
					$(this).removeAttr("title");
					
					if ($(this).attr("state") == 'open') {
						$(".ui-widget-content", this).slideDown();
						$(".ui-expander", this).addClass('ui-icon-triangle-1-e');						
					} else {
						$(".ui-widget-content", this).slideUp();
						$(".ui-expander", this).addClass('ui-icon-triangle-1-s');
					} 
										
					$(".ui-widget-header", this).click(function () {
						var content = $(".ui-widget-content", $(this).parent());
						content.slideToggle(300, function() {
							if (content.is(':visible')) {
								$(".ui-expander", $(this).parent()).removeClass('ui-icon-triangle-1-s').addClass('ui-icon-triangle-1-e');
							} else {
								$(".ui-expander", $(this).parent()).removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-s');
							}
						});
					});					
				});
			}
		});
	})(jQuery);