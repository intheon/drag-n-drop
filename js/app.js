$(document).ready(function(){

	// Author Ben@YUDU

	Drag.init();

});


var Drag = {

	init: function()
	{

		Drag.registerListeners();

	},

	registerListeners: function()
	{
		Drag.assignIdsToChildren(".draggables");
		Drag.assignIdsToChildren(".droppables");

		$(".draggable-answer").draggable({
			containment: '#content',
			cursor: 'move',
			revert: true
		});

		Drag.matchIds();

	},

	assignIdsToChildren: function(parentSelector)
	{
		var chilDom = $(parentSelector).children();
		
		$.each(chilDom, function(i){

			var type = $(this)[0].className;
				type = type.split(" ")[0];
				type = type.split("-")[0];

			if (type == "draggable") $(this).attr("id", "draggable-" + i);
			else if (type == "droppable") $(this).attr("id", "droppable-" + i);

		});


	},

	matchIds: function()
	{

		var draggables = $(".draggables").children();
		var droppables = $(".droppables").children();

		// magic, merges arrays together at their correponding indicies
		var zipped = _.zip(draggables, droppables);

		$.each(zipped, function(pointer, value){

			var dragId = value[0].id;
			var dropId = value[1].id;

			Drag.createDropListener(dragId, dropId);

		});

		setTimeout(function(){
			Drag.randomiseCells();
		},20);

	},

	createDropListener: function(dragId, dropId)
	{
		$("#" + dropId).droppable({
			accept: "#" + dragId,
			drop: Drag.handleDropEvent
		});
	},

	randomiseCells: function()
	{

		var dragPar = $(".draggables");
		var dropPar = $(".droppables");
		var dragChil = $(dragPar).children();
		var dropChil = $(dropPar).children();

		while (dragChil.length) dragPar.append(dragChil.splice(Math.floor(Math.random() * dragChil.length), 1)[0]);

		while (dropChil.length) dropPar.append(dropChil.splice(Math.floor(Math.random() * dropChil.length), 1)[0]);

	},

	handleDropEvent: function(event, ui)
	{
		var draggable = ui.draggable;
     ui.draggable.draggable( 'disable' );
     ui.draggable.removeClass("enabled ans");
     ui.draggable.addClass("dragRight");
     $(this).addClass("right");
     ui.draggable.removeAttr("style");
    $(this).droppable( 'disable' );
    $(this).children().show();
      ui.draggable.appendTo(this);
    ui.draggable.draggable( 'option', 'revert', false );
	}


}
