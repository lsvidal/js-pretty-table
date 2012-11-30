(function ($) {

	var prettyTable = {
		init : function(tables) {
			console.log("init called");
			tables.each(function (table) {
				table.addClass("juju");
			});
		}
	};
	$.fn.extend({
		prettyTable : function () {
			console.log("pretty table called");			
			prettyTable.init(this);
		}
	});
})(jQuery);