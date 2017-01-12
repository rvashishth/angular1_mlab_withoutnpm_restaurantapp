var fact = angular.module("factModule",['ngResource']);

fact.factory("menuFactory",function($http,$resource){
    var menuitems;
    /*menuitems = [{"code":"VG101","name":"Allo tiki Burger","price":120,"description":"Veg Burgger"},
                    {"code":"VG102","name":"Egg White Burger","price":130,"description":"Egg Burgger"},
                    {"code":"VG103","name":"Big Boy Burger","price":140,"description":"Ham Burgger"},
                    {"code":"VG104","name":"Yummy Burger","price":150,"description":"Cheese Burgger"}];*/
    
    /*$http.get("http://localhost:2403/menuitems")
        .success(function(data){
        menuitems = data;
    }).error(function(){
        console.log("=========Unable to fetch Data from menuitem service===");
    });*/
    
    var menuResource = $resource("http://localhost:2403/menuitems/:id",{"id":"@id"},{myupdate:{method:"PUT"}});
    menuitems = menuResource.query();
    return {
        getMenuItems : function(){
            return menuitems;
        },
        addNewMenuItem : function(newItem){
            menuResource.save(newItem,function(resData){
                menuitems.push(resData);
            },function(respdata,status){
                console.log("Error While saving new item");
            });
        },
        deleteMenuItem : function(menuItemId,itemIndex){
            menuResource.remove({"id":menuItemId},function(){
            menuitems.splice(itemIndex,1);
            },function(){
                console.log("Error while deleting menu item");
            })
        },
        updateMenuItem : function(menuItem){
            menuResource.myupdate(menuItem);
            
            for (var i in menuitems) {
                if (menuitems[i].id == menuItem.id) {
                    menuitems[i].name = menuItem.name;
                    menuitems[i].price = menuItem.price;
                    menuitems[i].code = menuItem.code;
                    menuitems[i].description = menuItem.description;
                    break;
                }
            }
        }
    };
});

fact.factory("orderFactory",function(){
    var orderedItems = [];
    return {
        getOrderedItems: function(){
            return orderedItems;
        },
        addOrderedItem: function(newOrderedItem){
            orderedItems.push(newOrderedItem);
        },
        removeOrderedItem: function(itemIndex){
            orderedItems.splice(itemIndex,1);
        }
    };
});