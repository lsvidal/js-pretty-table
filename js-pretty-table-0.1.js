(function ($) {

	var prettyTable = {
		init : function(tables) {
			console.log("init called");
			tables.each(function (table) {
				//console.log(tables[table]);
				//$(tables[table]).addClass("juju");
				prettyTable.initTable(tables[table]);
				//prettyTable.initTable($(tables[table]));
			});
		},
		initTable : function(table) {
			console.log("A tabela tem " + table.rows.length + " linhas");
			console.log("A tabela tem " + table.tBodies.length + " corpo");
			console.log("O corpo tem " + table.tBodies[0].rows.length + " linhas");
			var bodyRows = table.tBodies[0].rows;
			var headers = $("th", table);
			console.log(headers.length);
			for (var column = 0 ; column < headers.length ; column++) {
				if ($(headers[column]).hasClass("filter_me")) {
					var div = prettyTable.createDiv(column, bodyRows);
					$(headers[column]).data('menu', $(div));
					$(headers[column]).click(function () {
						var div = $(this).data('menu');
						var pos = $(this).offset();
						div.offset({ top: pos.top + 20 , left : pos.left});
						div.slideToggle();
					});
				}
			}
		},
		createDiv : function(column, bodyRows) {
			console.log("coluna " + column);
			var itens = new Array();
			for (var row = 0 ; row < bodyRows.length ; row++) {
				prettyTable.insertArrayNoReps(itens, $(bodyRows[row].cells[column]).html());
			}
			itens.sort();			
			var list = document.createElement('ul');
			var li = document.createElement('li');
			$(li).html('Todos');
			$(list).append(li);
			for (var i = 0 ; i < itens.length ; i++) {
				var li = document.createElement('li');
				$(li).html(itens[i]);
				$(list).append(li);
				console.log(itens[i]);
			}
			var div = document.createElement('div');
			$(div).append(list);
			$(div).slideUp();
			$(div).mouseout(function () {
				$(this).slideUp();
			});
			$("body").append(div);
			return div;
		},
		insertArrayNoReps : function(array, val) {
			for (var i = 0 ; i < array.length ; i++) {
				if (array[i] == val) {
					return;
				}
			}
			array[array.length] = val;
		}
	};
	$.fn.extend({
		prettyTable : function () {
			prettyTable.init(this);
		}
	});
})(jQuery);