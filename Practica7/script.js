var app = angular.module('ProductApp',[]);
app.controller('ProductController', ($scope)=> {
    
    $scope.product = {};
    $scope.products = new Array();

    $scope.addProduct = () => {
        $scope.products.push({
            nameProduct: $scope.product.nombreProducto,
            priceProduct: $scope.product.precioProducto,
            quantity: $scope.product.cantidadDisponible,
            description: $scope.product.descripcion
        });
    }
    $scope.deleteProduct = (i) => {
        $scope.products.splice(i,1);
    };  
});