$(function() {
    "use strict";
    
    // Sidebar functionality removed as sidebars are now always visible
    // This file is kept for potential future sidebar enhancements
    
    // No need for custom tooltips now that we have icon titles
    // But we'll keep the hover effect for better UX
    $(".sidebar-left a, .sidebar-right a").hover(function() {
        $(this).find(".icon-title").css("color", "#fff");
    }, function() {
        $(this).find(".icon-title").css("color", "#ccc");
    });
});