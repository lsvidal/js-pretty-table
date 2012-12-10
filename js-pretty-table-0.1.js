(function ($) {

	var createDiv = function(column, bodyRows, header) {
		console.log("coluna " + column);
		var itens = new Array();
		for (var row = 0 ; row < bodyRows.length ; row++) {
			insertArrayNoReps(itens, $(bodyRows[row].cells[column]).html());
		}
		itens.sort();			
		var list = document.createElement('ul');
		$(list).append(createLi('Todos'));
		for (var i = 0 ; i < itens.length ; i++) {
			$(list).append(createLi(itens[i]));
			console.log(itens[i]);
		}
		var div = document.createElement('div');
		$(div).append(list);
		var off = header.offset();
		 $(div).css(
			{ position: "absolute",
				top: off.top + "px",
				left: off.left + "px"
			}).hide();  
		$(div).mouseleave(function () {
			$(this).slideUp();
		});
		header.append(div);
		header.data('menu', $(div));
		header.click(function () {
			var div = $(this).data('menu');
			div.slideToggle();
		});
	};
	var insertArrayNoReps = function(array, val) {
		for (var i = 0 ; i < array.length ; i++) {
			if (array[i] == val) {
				return;
			}
		}
		array[array.length] = val;
	};
	var createLi = function(item) {
		var li = document.createElement('li');
		$(li).html(item);
		$(li).click(function (event) {
			console.log("Clique em :" + $(this).html());
			event.stopPropagation();
		});
		return li;
	};

	$.fn.extend({
		prettyTable : function () {
				//console.log(this);
				$(this).each(function () {
					var table = this;
					console.log(table);					
					console.log("A tabela tem " + table.rows.length + " linhas");
					console.log("A tabela tem " + table.tBodies.length + " corpo");
					console.log("O corpo tem " + table.tBodies[0].rows.length + " linhas");
					if (table.tFoot) {
						console.log("O rodapé tem " + table.tFoot.rows.length + " linhas");
					} else {
						console.log("A tabela não tem rodapé");
					}
					var bodyRows = table.tBodies[0].rows;
					var headers = table.tHead.rows[0].cells;			
					for (var column = 0 ; column < headers.length ; column++) {
						if ($(headers[column]).hasClass("filter_me")) {
							createDiv(column, bodyRows, $(headers[column]));
						}
					}
				});
		}
	});
})(jQuery);