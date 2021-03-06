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
    const currentListsLength =  $(".list-drag-drop").length;
    const listHtml = [
        '<div class="list-drag-drop">',
        '<div class="list__panel active">',
        '<input type="checkbox" id="chooseList" class="checkbox-round checkbox-round_active pointer" title="Mark as completed">',
        '<label class="list__text" draggable="true">' + newList + '</label>',
        '<span class="list__delete pointer" role="button" title="Delete list"><img src="images/icon-cross.svg" alt="Delete list"></span>',
        '</div>',
        '</div>'
    ];

    if (newList !== '') {
        if ($(".container").hasClass("light")) {
            $(".list__current-lists").append(listHtml.join(''));
            $(".list-drag-drop").eq(currentListsLength).children(".list__panel").addClass("light");
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

// Delegated event because lists are created dynamically

$("#currentLists").on("click", ".list__delete", function() {
    $(this).parent().parent().remove(); 
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
    $(".list__panel.completed").parent().remove();
});


// Drag and drop HTML5 API (desktop browsers)
// Great article: https://web.dev/drag-and-drop/



let dragSrcEl = null;
const dragItemsWrapper = $("#currentLists");

$.fn.checkIfCompleted = function () {
    if (this.children(".list__panel").hasClass("completed")) {
        this.find(".checkbox-round_active").prop('checked', true);  
    } 
};


dragItemsWrapper.on("dragstart", ".list-drag-drop", function(e) {
    $(this).css("opacity", "0.4");
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

    e.stopPropagation();
    dragSrcEl.css("opacity", "1");

    if (dragSrcEl.html() !== $(this).html()) {

        dragSrcEl.html($(this).html());
        dragSrcEl.checkIfCompleted();


        $(this).html(e.originalEvent.dataTransfer.getData('text/html'));
        $(this).checkIfCompleted();
      }

     return false; 

})

//Drag and Drop on mobile devices:
// DragDropTouch polyfill: https://github.com/Bernardo-Castilho/dragdroptouch


})