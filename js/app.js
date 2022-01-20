$(document).ready(function () {
    readClient();
    readCloud();
    readMessage();

    $('ul.tabs li a:first').addClass('active');
    $('.secciones article').hide();
    $('.secciones article:first').show();

    $('ul.tabs li a').click(function () {
        $('ul.tabs li a').removeClass('active');
        $(this).addClass('active');
        $('.secciones article').hide();

        var activeTab = $(this).attr('href');
        $(activeTab).show();
        return false;
    });
});

//Funciones Client

function cleanClient() {
    $("#id").val("");
    $("#id").attr("readonly", false);
    $("#name").val("");
    $("#email").val("");
    $("#age").val("");
}

function readClient() {
    $.ajax({
        url: "https://gac0ca2eb1bb20c-db202109300648.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type: "GET",
        dataType: "json",
        success: function (respose) {
            $("#contenidoTabla").empty();
            respose.items.forEach(element => {
                var row = $("<tr>");
                row.append($("<td>").text(element.id));
                row.append($("<td>").text(element.name));
                row.append($("<td>").text(element.email));
                row.append($("<td>").text(element.age)); +
                    row.append($("<td class='text-center no-padding'>").append('<button type="button" class="btn btn-outline-warning btn-block w-100" onclick="listar(' + element.id + ')">Load Data</button>'));
                $("#contenidoTabla").append(row);
            });
        },
        error: function (xhr, status) {
            alert("An error has occurred!!");
        }
    });
}

function createClient() {
    var id = $("#id").val();
    var name = $("#name").val();
    var email = $("#email").val();
    var age = $("#age").val();
    $.ajax({
        url: "https://gac0ca2eb1bb20c-db202109300648.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type: "POST",
        dataType: "json",
        data: {
            id: id,
            name: name,
            email: email,
            age: age,
        },
        statusCode: {
            201: function () {
                alert("Successfully Created!!");
                $("#id").val("");
                $("#name").val("");
                $("#email").val("");
                $("#age").val("");
                readClient();
            }
        }
    });
}

function listar(id) {
    $.ajax({
        url: "https://gac0ca2eb1bb20c-db202109300648.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client/?id=" + id,
        type: "GET",
        dataType: "json",
        success: function (respose) {
            if (respose.items.length > 0) {
                $("#id").val(respose.items[0].id);
                $("#id").attr("readonly", true);
                $("#name").val(respose.items[0].name);
                $("#email").val(respose.items[0].email);
                $("#age").val(respose.items[0].age);
            }
            else {
                alert("The record was not found!!");
            }
        },
        error: function (xhr, status) {
            alert("An error has occurred!!");
        }
    });
}


function updateClient() {
    var id = $("#id").val();
    var name = $("#name").val();
    var email = $("#email").val();
    var age = $("#age").val();
    var data = {
        id: id,
        name: name,
        email: email,
        age: age,
    }; 
    $.ajax({
        url: "https://gac0ca2eb1bb20c-db202109300648.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type: "PUT",
        dataType: "json",
        data: JSON.stringify(data), 
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            201: function () {
                alert("Successfully updated!!");
                $("#id").val("");
                $("#id").attr("readonly", false);
                $("#name").val("");
                $("#email").val("");
                $("#age").val("");
                readClient();
            }
        }
    });
}

function deleteClient() {

    var id = $("#id").val();
    var name = $("#name").val();
    var r = confirm("Are you sure to delete the client " + id + " by name " + name +" ?"); 
    if (r == true) { 
        var data = {
            id: id
        }; 
        $.ajax({
            url: "https://gac0ca2eb1bb20c-db202109300648.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
            type: "DELETE",
            dataType: "json",
            data: JSON.stringify(data), 
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                204: function () { 
                    alert("Successfully removed!!");
                    $("#id").val("");
                    $("#id").attr("readonly", false);
                    $("#name").val("");
                    $("#email").val("");
                    $("#age").val("");
                    readClient();
                }
            }
        });
    }
}

// Funciones Cloud

function cleanCloud() {
    $("#idCloud").val("");
    $("#idCloud").attr("readonly", false);
    $("#brand").val("");
    $("#model").val("");
    $("#category_id").val("");
    $("#nameCloud").val("");

}

function readCloud() {
    $.ajax({
        url: "https://gac0ca2eb1bb20c-db202109300648.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/cloud/cloud",
        type: "GET",
        dataType: "json",
        success: function (respose) {
            $("#contenidoTablaCloud").empty();
            respose.items.forEach(element => {
                var row = $("<tr>");
                row.append($("<td>").text(element.id));
                row.append($("<td>").text(element.brand));
                row.append($("<td>").text(element.model));
                row.append($("<td>").text(element.category_id));
                row.append($("<td>").text(element.name)); +
                    row.append($("<td class='text-center no-padding'>").append('<button type="button" class="btn btn-outline-warning btn-block w-100" onclick="listarCloud(' + element.id + ')">Load Data</button>'));
                $("#contenidoTablaCloud").append(row);
            });
        },
        error: function (xhr, status) {
            alert("An error has occurred!!");
        }
    });
}

function createCloud() {
    var id = $("#idCloud").val();
    var brand = $("#brand").val();
    var model = $("#model").val();
    var category_id = $("#category_id").val();
    var name = $("#nameCloud").val();
    $.ajax({
        url: "https://gac0ca2eb1bb20c-db202109300648.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/cloud/cloud",
        type: "POST",
        dataType: "json",
        data: {
            id: id,
            brand: brand,
            model: model,
            category_id: category_id,
            name: name,
        },
        statusCode: {
            201: function () {
                alert("Successfully Created!!");
                $("#idCloud").val("");
                $("#brand").val("");
                $("#model").val("");
                $("#category_id").val("");
                $("#nameCloud").val("");
                readCloud();
            }
        }
    });
}

function listarCloud(id) {
    $.ajax({
        url: "https://gac0ca2eb1bb20c-db202109300648.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/cloud/cloud/?id=" + id,
        type: "GET",
        dataType: "json",
        success: function (respose) {
            if (respose.items.length > 0) {
                $("#idCloud").val(respose.items[0].id);
                $("#idCloud").attr("readonly", true);
                $("#brand").val(respose.items[0].brand);
                $("#model").val(respose.items[0].model);
                $("#category_id").val(respose.items[0].category_id);
                $("#nameCloud").val(respose.items[0].name);
            }
            else {
                alert("The record was not found!!");
            }
        },
        error: function (xhr, status) {
            alert("An error has occurred!!");
        }
    });
}

function updateCloud() {

    var id = $("#idCloud").val();
    var brand = $("#brand").val();
    var model = $("#model").val();
    var category_id = $("#category_id").val();
    var name = $("#nameCloud").val();
    var data = {
        id: id,
        brand: brand,
        model: model,
        category_id: category_id,
        name: name,
    }; 
    $.ajax({
        url: "https://gac0ca2eb1bb20c-db202109300648.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/cloud/cloud",
        type: "PUT",
        dataType: "json",
        data: JSON.stringify(data), 
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            201: function () {
                alert("Successfully updated!!");
                $("#idCloud").val("");
                $("#idCloud").attr("readonly", false);
                $("#brand").val("");
                $("#model").val("");
                $("#category_id").val("");
                $("#nameCloud").val("");
                readCloud();
            }
        }
    });
}

function deleteCloud() {

    var id = $("#idCloud").val();
    var name = $("#nameCloud").val();
    var r = confirm("Are you sure to delete the cloud " + id + " by name " + name +" ?"); 
    if (r == true) { 
        var data = {
            id: id
        }; 
        $.ajax({
            url: "https://gac0ca2eb1bb20c-db202109300648.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/cloud/cloud",
            type: "DELETE",
            dataType: "json",
            data: JSON.stringify(data), 
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                204: function () { 
                    alert("Successfully removed!!");
                    $("#idCloud").val("");
                    $("#idCloud").attr("readonly", false);
                    $("#brand").val("");
                    $("#model").val("");
                    $("#category_id").val("");
                    $("#nameCloud").val("");
                    readCloud();
                }
            }
        });
    }
}


// Funciones Message

function cleanMessage() {
    $("#idMessage").val("");
    $("#textmessage").val("");
}

function readMessage() {
    $.ajax({
        url: "https://gac0ca2eb1bb20c-db202109300648.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type: "GET",
        dataType: "json",
        success: function (respose) {
            $("#contenidoTablaMessage").empty();
            respose.items.forEach(element => {
                var row = $("<tr>");
                row.append($("<td>").text(element.id));
                row.append($("<td>").text(element.messagetext)); +
                row.append($("<td class='text-center no-padding'>").append('<button type="button" class="btn btn-outline-warning btn-block w-100" onclick="listarMessage(' + element.id + ')">Load Data</button>'));
                $("#contenidoTablaMessage").append(row);
            });
        },
        error: function (xhr, status) {
            alert("An error has occurred!!");
        }
    });
}

function createMessage() {
    var id = $("#idMessage").val();
    var messagetext = $("#textmessage").val();
    $.ajax({
        url: "https://gac0ca2eb1bb20c-db202109300648.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type: "POST",
        dataType: "json",
        data: {
            id: id,
            messagetext: messagetext,
        },
        statusCode: {
            201: function () {
                alert("Successfully Created!!");
                $("#idMessage").val("");
                $("#textmessage").val("");
                readMessage();
            }
        }
    });
}

function listarMessage(id) {
    $.ajax({
        url: "https://gac0ca2eb1bb20c-db202109300648.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message/?id=" + id,
        type: "GET",
        dataType: "json",
        success: function (respose) {
            if (respose.items.length > 0) {
                $("#idMessage").val(respose.items[0].id);
                $("#idMessage").attr("readonly", true);
                $("#textmessage").val(respose.items[0].messagetext);
            }
            else {
                alert("The record was not found!!");
            }
        },
        error: function (xhr, status) {
            alert("An error has occurred!!");
        }
    });
}

function updateMessage() {

    var id = $("#idMessage").val();
    var messagetext = $("#textmessage").val();
    var data = {
        id: id,
        messagetext: messagetext,
    }; 
    $.ajax({
        url: "https://gac0ca2eb1bb20c-db202109300648.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type: "PUT",
        dataType: "json",
        data: JSON.stringify(data), 
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            201: function () {
                alert("Successfully updated!!");
                $("#idMessage").val("");
                $("#idMessage").attr("readonly", false);
                $("#textmessage").val("");
                readMessage();
            }
        }
    });
}

function deleteMessage() {

    var id = $("#idMessage").val();
    var r = confirm("Are you sure to delete the message " + id); 
    if (r == true) { 
        var data = {
            id: id
        }; 
        $.ajax({
            url: "https://gac0ca2eb1bb20c-db202109300648.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
            type: "DELETE",
            dataType: "json",
            data: JSON.stringify(data), 
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                204: function () { 
                    alert("Successfully removed!!");
                    $("#idMessage").val("");
                    $("#idMessage").attr("readonly", false);
                    $("#textmessage").val("");
                    readMessage();
                }
            }
        });
    }
}


// Funciones Category

function cleanCategory() {
    $("#idCategory").val("");
    $("#nameCategory").val("");
}


