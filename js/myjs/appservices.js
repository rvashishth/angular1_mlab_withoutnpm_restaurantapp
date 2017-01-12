var servicemod = angular.module("svcModule",['factModule']);

servicemod.service("menuService",function(menuFactory){
    this.getAllMenuItems = function(){
        return menuFactory.getMenuItems();
    };
    
    this.addNewMenuItem = function(newitme){
        menuFactory.addNewMenuItem(newitme);
    };
    
    this.deleteMenuItem = function(menuItemId,itemIndex){
        menuFactory.deleteMenuItem(menuItemId,itemIndex);
    };
    
    this.updateMenuItem = function(menuItem){
        menuFactory.updateMenuItem(menuItem);  
    };
});

servicemod.service("orderService",function(orderFactory){
    this.getAllOrderedItem = function(){
        return orderFactory.getOrderedItems();
    };
    
    this.addOrderedItem = function(newItem){
        orderFactory.addOrderedItem(newItem);
    };
    
    this.removeOrderedItem = function(index){
        orderFactory.removeOrderedItem(index);
    };
    
    this.totalAmount = function(){
        var tot = 0;
        angular.forEach(orderFactory.getOrderedItems(), function(singleItem){
            tot = tot + (singleItem.price * singleItem.qty);
        })
        return tot;
    };
});