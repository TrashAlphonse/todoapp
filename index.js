$(document).ready(function() {

// Toggle Dark/Light Mode

$("#toggleMode").click(function() {
    $(".container, .list__toggle-mode, .list__panel, .list__footer, .hint").toggleClass("light");
})

// Active lists left

function getActiveLists() {
    const activeListsNumber = $(".list__panel.active").length;
    $(".list__items-left").html(activeListsNumber + " items left");
}

getActiveLists();


//Add new lists

function addList() {

    const newList = $("#newList").val();
    const listHtml = [
        '<div class="list-drag-drop">',
        '<div class="list__panel active" draggable="true">',
        '<input type="checkbox" id="chooseList" class="checkbox-round checkbox-round_active pointer" title="Mark as completed">',
        '<label class="list__text" for="chooseList">' + newList + '</label>',
        '<span class="list__delete pointer" role="button" title="Delete list"><img src="images/icon-cross.svg" alt="Delete list"></span>',
        '</div>',
        '</div>'
    ];

    if (newList !== '') {
        if ($(".container").hasClass("light")) {
            $(".list__current-lists").append(listHtml.join(''));
            $(".list__panel").addClass("light");
            $("#newList").val('');
            
        } else {
            $(".list__current-lists").append(listHtml.join(''));
            $("#newList").val('');
        }
        

    } else {
        alert("What's your task for today?)")
    }

};


$("#newList").on('keydown',function(e) {
    if(e.which == 13) {
        addList();
        getActiveLists();
    }
});

$("#addList").click(function() {
    addList(); 
    getActiveLists();
});


// Remove lists

// the click is delegated to any element in .list__current-lists having the class .list__delete
// , even if it's added after you bound the event handler.
$("#currentLists").on("click", ".list__delete", function() {

    $(this).parent().remove(); 
    getActiveLists();
    
});



// Filter lists


$("#currentLists").on("change", ".checkbox-round_active", function() {
    if ($(this).is(":checked")) {
        $(this).parent().removeClass("active");
        $(this).parent().addClass("completed");
        
    } else {
        $(this).parent().removeClass("completed");
        $(this).parent().addClass("active");
       
    }

    getActiveLists();
    
  });



$(".list__filter span").click(function() {
    
    $(this).siblings().removeClass("active");
    $(this).addClass("active");

    const filterId = $(this).attr('id');
    
    switch(filterId) {

        case "showActive":
            $(".list__panel.completed").hide();
            $(".list__panel.active").show();
            break;
        case "showCompleted":
            $(".list__panel.active").hide();
            $(".list__panel.completed").show();
            break;
        case "showAll":
            $(".list__panel").show();

    }

});


// Clear completed

$(".list__clear").click(function() {
    $(".list__panel.completed").remove();
});


// Drag and drop
// Great article: https://web.dev/drag-and-drop/

let dragSrcEl = null;
const dragItemsWrapper = $("#currentLists");

$.fn.checkIfCompleted = function () {
    if (this.children(".list__panel").hasClass("completed")) {
        this.find(".checkbox-round_active").prop('checked', true);  
    } 
};

dragItemsWrapper.on("dragstart", ".list-drag-drop", function(e) {
    dragSrcEl = $(this);
    e.originalEvent.dataTransfer.effectAllowed = 'move';
    e.originalEvent.dataTransfer.setData('text/html', dragSrcEl.html());
});

dragItemsWrapper.on("dragover", ".list-drag-drop", function(e) {
    
    e.preventDefault();
    e.originalEvent.dataTransfer.dropEffect = 'move';
    return false;

});

dragItemsWrapper.on("drop", ".list-drag-drop", function(e) {

    if (dragSrcEl.html() !== $(this).html()) {

        dragSrcEl.html($(this).html());
        dragSrcEl.checkIfCompleted();


        $(this).html(e.originalEvent.dataTransfer.getData('text/html'));
        $(this).checkIfCompleted();
      }

})

})



