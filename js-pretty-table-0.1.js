(function ($) {

	/*
	 * Creates the menu for the column
	 */
	var createMenuForColumn = function(column, bodyRows, header, table) {
		console.log("column " + column);
		var itens = getColumnItens(column, bodyRows);			
		var list = document.createElement('ul');
		$(list).append(createLi('Todos', table));
		for (var i = 0 ; i < itens.length ; i++) {
			$(list).append(createLi(itens[i], table));
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
		header.data('data', {
			menu : $(div), 
			table : table});		
		header.click(function () {
			var div = $(this).data('data').menu;
			div.slideToggle();
		});
	};
	
	/*
	 * Gets the menu itens form column data.
	 */
	var getColumnItens = function(column, bodyRows) {
		var itens = new Array();
		for (var row = 0 ; row < bodyRows.length ; row++) {
			insertArrayNoReps(itens, $(bodyRows[row].cells[column]).html());
		}
		itens.sort();
		return itens;
	}
	
	/*
	 * Inserts strings in an array not allowing repetitions.
	 */
	var insertArrayNoReps = function(array, val) {
		for (var i = 0 ; i < array.length ; i++) {
			if (array[i] == val) {
				return;
			}
		}
		array[array.length] = val;
	};
	
	var createLi = function(item, table) {
		console.log(table);
		$(this).data('tabela', table);
		var li = document.createElement('li');
		$(li).html(item);		
		$(li).click(function (event) {
			console.log("Clique em :" + $(this).html());
			atualizarTabela($(this).data('tabela'));
			event.stopPropagation();
		});
		return li;
	};
	var atualizarTabela = function(tabela) {
		console.log(tabela);
	};
	
	/*
	 * Inserts the function to initalize the Pretty Tables in jQuery namespace
	 */ 
	$.fn.extend({
		prettyTable : function () {
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
							createMenuForColumn(column, bodyRows, $(headers[column]), table);
						}
					}
				});
		}
	});
})(jQuery);