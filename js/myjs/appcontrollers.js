var crtlapp = angular.module("ctrlModule",['svcModule']);

crtlapp.run(function(){
    console.log("RUN====CtrlModule======");
});

crtlapp.config(function(){
    console.log("CONFIG=====CtrlModule=====");
});

crtlapp.controller("myMenuAppController",function($scope,menuService,orderService){
    console.log("This is menu controller========");
    
    $scope.itemlist = menuService.getAllMenuItems();
    
    $scope.placeOrder = function(menuitem){
        console.log("========in placeorder===");
        var orderedItem = {"name":menuitem.name,"price":menuitem.price, "qty":1};
        orderService.addOrderedItem(orderedItem);
    };
    
    $scope.save = function(){
        if($scope.newmenuitem.id== undefined){
            menuService.addNewMenuItem($scope.newmenuitem);    
        }else{
            menuService.updateMenuItem($scope.newmenuitem);
        }
       
        $scope.newmenuitem = {};
    };
    
    $scope.removeItem = function(menuItemId,itemIndex){
        menuService.deleteMenuItem(menuItemId,itemIndex);
    };
    
    $scope.editItem = function(menuitem){
        $scope.newmenuitem = angular.copy(menuitem);
    }
});

crtlapp.controller("OrderController",function($scope,orderService){
    console.log("OrderController==CtrlModule");
    $scope.orderedItem = orderService.getAllOrderedItem();
    $scope.cancleOrder = function(index){
        orderService.removeOrderedItem(index);
    };
    $scope.totalAmount= function(){
        return orderService.totalAmount();
    };
});

crtlapp.controller("mainController",function($scope,$location,$rootScope){
    $scope.$on("$routeChangeSuccess",function(){
        console.log("Inside route change success"+$location.path());
        if($location.path()=="/logout"){
            $rootScope.isAdmin=false;
        }
    });
    
    $scope.$on("$routeChangeStart",function(){
       if(!$rootScope.isAdmin){
           if($location.path()=="/menuitems"){
               $location.path("/login")
           }
       } 
    });
});

crtlapp.controller("loginController",function($scope,$location,$rootScope){
    $scope.dologin = function(){
        if($scope.login.username=="admin"){
            $rootScope.isAdmin = true;
            $location.path("/menuitems");
        }else{
            $location.path("/error");
        }
    }
});

crtlapp.controller("signupController",function($scope){
    $scope.stateList = [{"stateId":1,"stateName":"HR"},
                        {"stateId":2,"stateName":"AP"}];
    $scope.$watch("user.state",function(newValue,oldValue){
        console.log("newValue:"+newValue+"===="+"oldValue:"+oldValue);
        if(newValue==1){
            $scope.cityList = [{"cityId":1,"cityName":"Gurugram"}];
        }else if(newValue==2){
            $scope.cityList = [{"cityId":1,"cityName":"Hyderabad"},
                              {"cityId":2,"cityName":"Guntur"}];
        }
    });
});


