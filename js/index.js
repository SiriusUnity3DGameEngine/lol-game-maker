var initUI = function() {
    $('#menu').menu({
        position: {
            my: "left bottom",
            at: "left top"
        },
        icons: {
            submenu: "ui-icon-triangle-1-s",
        }
    });
    $('#leftPanel').tabs();
    $('#accordion').accordion({
        heightStyle: "fill"
    });
};

$(function() {
    initUI();
});