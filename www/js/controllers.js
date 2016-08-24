angular.module('starter.controllers', [])





.controller('AppCtrl', function($state, $rootScope, $scope, $ionicModal, $timeout, $http,$location,$localStorage, $ionicHistory) {

 

  // Form data for the login modal
  $scope.loginData = {};


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/social/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it


   if($localStorage.authorization !== undefined) {

  $rootScope.userToken  = $localStorage.authorization;    

 }
    $scope.user = [];
       
    $http.get('http://pixelesp-api.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
      
     $location.path('/app/inicio');
      
 
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/start');
      // err.status will contain the status code
    }); 


   

  $scope.remove = function() {   
    delete $localStorage.authorization; 

    localStorage.clear(); 

       
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
      
        $state.go('app.start');

  }; 

     $scope.esAdmin = function () {

        if ($scope.user.userlevel == 1) {
            return 'ng-show';
        } else {
            return 'ng-hide';
        }

    };





})




.controller('UsuariosCtrl', function($scope, $rootScope, $http, $location, $localStorage) {

 
  $scope.usuarios = [];
   $scope.$on('$ionicView.beforeEnter', function() {
    
    $http.get('http://pixelesp-api.herokuapp.com/usuarios').then(function(resp) {
      $scope.usuarios = resp.data.data;
 console.log('Succes', resp.data.data);


    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });


  });

 


})

.controller('UsuariocomunidadCtrl', function($ionicLoading, $scope,$state, $stateParams, $http, $location, $ionicModal, $ionicPopover, $rootScope, CONFIG, $localStorage) {
  $ionicLoading.show({
            template: '<ion-spinner class="spinner"></ion-spinner>'
        });
 $scope.user = [];
    $http.get('http://pixelesp-api.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);

    }),

   $scope.EditarPerfil = function () {
 
        if ($scope.usuario.id == $scope.user.id) {
            return 'ng-show';
        } else {
            return 'ng-hide';
        }
     $ionicLoading.hide();
    };
    
  $scope.usuario = {};
   $scope.$on('$ionicView.beforeEnter', function() {
  $http.get('http://pixelesp-api.herokuapp.com/usuarios/'+ $stateParams.UsuarioId).then(function(resp) {
    $scope.usuario = resp.data.data;

     
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  }); 
  }); 

  $scope.noticias = {};

  $http.get('http://pixelesp-api.herokuapp.com/noticiasusuario/'+ $stateParams.UsuarioId).then(function(resp) {
    $scope.noticias = resp.data.data;
 $ionicLoading.hide();
     
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  }); 
  $scope.abrirComentarios = function  (noticia) {
    var viewNoticia = noticia;
    $scope.viewNoticia = viewNoticia;
    $scope.newCommentario = {text:''};
    $scope.modal.show();
  }
  $scope.guardarComentario = function  (newCommentarioForm) {

    $http.get('http://pixelesp-api.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
        console.log(newCommentarioForm);
        console.log(resp);
        var newCommentario = {
          idusuario : resp.data.data.id,
         username : resp.data.data.username,
          id_noticia : $scope.viewNoticia.id,
          text : newCommentarioForm.text,
        };
        $http.post(CONFIG.APIURL+'newscomments',newCommentario ).then(function(resp) {
          console.log(resp.data);

           $state.go($state.current, {}, {reload: true});
           $scope.modal.hide();
           $scope.viewNoticia = {};
           $scope.newCommentario = {text:''};
        }, function(err) {
          console.error('ERR', err);
           
          // err.status will contain the status code
        });


    }, function(err) {
      console.error('ERR', err);
        $scope.modal.hide();
       $location.path('/app/start');
    }); 

    // $scope.viewNoticia = viewNoticia;
    // $scope.modal.show();
  }

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });


  $scope.$storage = $localStorage.$default({
          x: 32
        });

  $scope.imagenes = [];
   

        $http.get('http://pixelesp-api.herokuapp.com/listarfavoritos/' + $stateParams.UsuarioId).then(function (resp) {

            $scope.imagenes = resp.data.data;

            console.log('Succes', resp.data.data);

        }, function (err) {

            console.error('ERR', err);
            // err.status will contain the status code

        });

          $scope.imageness = [];
   

        $http.get('http://pixelesp-api.herokuapp.com/listarimagenes/' + $stateParams.UsuarioId).then(function (resp) {

            $scope.imageness = resp.data.data;

            console.log('Succes', resp.data.data);

        }, function (err) {

            console.error('ERR', err);
            // err.status will contain the status code

        });


 

 })



.controller('EntrarCtrl', function($ionicHistory, $state, $rootScope, $scope, $stateParams, $http, $ionicPopup, $location, CONFIG, $ionicSideMenuDelegate, $localStorage ) {
  
   $rootScope.userToken = ''; 

        $scope.user={};
     
         $scope.user.username='';
        $scope.user.password =''; 

if($localStorage.authorization !== undefined) {
  $rootScope.userToken  = $localStorage.authorization;    
     
}

   $scope.doLogin = function() {
      
       



      $http.post('http://pixelesp-api.herokuapp.com/login',$scope.user).then(function(resp) {
        console.log(resp.data);

         $rootScope.userToken = resp.data.token;
         console.log('asdsad: '+$rootScope.userToken);

                    $scope.user = $rootScope.user;
           $scope.user = {};
             



  if(typeof(Storage) != "undefined") {

      $localStorage.authorization =   $rootScope.userToken;
        console.log( $localStorage.authorization );
 
     
  } else {
      alert("LocalStorage not supported!"); 
  }

   
          
   $location.path('/app/inicio'); 

         
    }, function(err) {
      console.error('ERR', err);
      var alertPopup = $ionicPopup.alert({
             title: 'Error en el ingreso',
             template: 'Usuario o contraseña invalido'
           });
           alertPopup.then(function(resp) {
             $location.path('/app/start'); 
        
           });
      // err.status will contain the status code
    });

    };
  $ionicSideMenuDelegate.canDragContent(false)



})

.controller('TabController', function(){
    this.tab = 1;

    this.setTab = function(selectedTab){
      this.tab = selectedTab;
    };

    this.isSet = function(givenTab){
      return this.tab === givenTab;
    };
  })



.controller('EntrarAdminCtrl', function($rootScope, $scope, $stateParams, $http, $ionicPopup, $location, CONFIG ) {
  
    $rootScope.userToken = ''; 
        $scope.user={};
        $scope.user.username='';
        $scope.user.password ='';
      
        
  
   $scope.doLogin = function() {
      $http.post(CONFIG.APIURL+'loginadmin',$scope.user).then(function(resp) {
        console.log(resp.data);

         $rootScope.userToken = resp.data.token;

    
             $location.path('/app/admin');
         
          
    }, function(err) {
      console.error('ERR', err);
      var alertPopup = $ionicPopup.alert({
             title: 'Error en el ingreso',
             template: 'Acceso denegado'
           });
           alertPopup.then(function(resp) {
             $location.path('/app/EntrarAdmin');
           });
      // err.status will contain the status code
    });
    };
  
})

.controller('AdminCtrl', function($rootScope, $scope, $http, $location) {
    
    console.log($rootScope.userToken);     
    
    $scope.user = [];
    $http.get('http://pixelesp-api.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
      $location.path('/app/admin');
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/EntrarAdmin');
      // err.status will contain the status code
    }); 
})
.controller('UsuarioslistsCtrl', function($rootScope, $scope, $http, $location) {
    
 

  $scope.usuarios = [];
   $scope.$on('$ionicView.beforeEnter', function() {
    $http.get('http://pixelesp-api.herokuapp.com/usuarios').then(function(resp) {
      $scope.usuarios = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });
  });

})
 


.controller('UsuarioCtrl', function($ionicHistory, $scope, $stateParams, $http, $location, $ionicPopup, $cordovaFileTransfer, $cordovaCamera, $q, $rootScope) {

  $scope.usuario = {};

  $http.get('http://pixelesp-api.herokuapp.com/usuarios/'+ $stateParams.UsuarioId).then(function(resp) {
    $scope.usuario = resp.data.data;

     
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  }); 



//cambiar avatar:
  document.addEventListener("deviceready",function(){
        
        $scope.upload = function (){
            console.log("encotro");
            navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI ,sourceType: Camera.PictureSourceType.PHOTOLIBRARY });            
    
   
function onSuccess(imageURI) {

                var image = document.getElementById('fotoServidor3');
                image.src = imageURI;

                
                 var deferred = $q.defer();
                subirImagen(); 
  function subirImagen() {

                
                 var options = {  
 
                  
                        params : { 
                          
                  'upload_preset': 'c5o7wpot',            
                  'api_key': 584471834239559,  
                  'folder' : 'Avatar'

                

                }
                    
                                    } 


     $cordovaFileTransfer.upload(encodeURI("https://api.cloudinary.com/v1_1/hyktxhgfc/image/upload"), imageURI, options).then(function (result) {
    
          console.log("SUCCESS: " + JSON.stringify(result.response));

             var response = JSON.parse(decodeURIComponent(result.response));
                  deferred.resolve(response);
                  var resultado = JSON.stringify(result.response);
var url = response.url;

 $scope.usuario.imagen = url.substr(url.lastIndexOf('d/') + 2); 

         console.log("SUCCESS2: " +  url.substr(url.lastIndexOf('d/') + 2));

   console.log("SUCCESS2: " +  resultado.substr(resultado.lastIndexOf('/') + 1));


     }, function (err) {
          console.log("ERROR: " + JSON.stringify(err));

             deferred.reject(err);
     }, function (progress) {
           
      });
           
                       

             

            }

            }
            function onFail(message) {
                alert('Failed because: ' + message);
            }            
          

            function uploadSuccess(r) {
                console.log("Code = " + r.responseCode+" Response = " + r.response+" Sent = " + r.bytesSent);
                var image = document.getElementById('fotoServidor3');
                image.src = r.response;
            }

            function uploadFail(error) {
                console.log("An error has occurred: Code = " + error.code+ " upload error source " + error.source+" upload error target " + error.target);
            }            
        }


 
  },false); 

  $scope.doSave = function() {
    $http.put('http://pixelesp-api.herokuapp.com/usuarios/'+ $stateParams.UsuarioId, $scope.usuario).then(function(resp) {
      console.log(resp.data);  
      $ionicHistory.goBack();
      
    }, function(err) {
      console.error('ERR', err);
        var alertPopup = $ionicPopup.alert({
             title: 'Completar todos los campos',
             template: 'Volver'
           });
          
      // err.status will contain the status code
    });
     };

       $scope.doDelete = function() {
    $http.delete('http://pixelesp-api.herokuapp.com/usuarios/'+ $stateParams.UsuarioId, $scope.usuario).then(function(resp) {
      console.log(resp.data);  
      $ionicHistory.goBack();
      
    }, function(err) {
      console.error('ERR', err);
     
          
      // err.status will contain the status code
    });
     };
  


 })

.controller('UsuarioNuevoCtrl', function($scope, $stateParams, $http, $ionicPopup, $location ) {
            
  $scope.usuario={};
  $scope.usuario.password='';

  $scope.usuario.username='';
    $scope.usuario.imagen='';
  $scope.usuario.email='';
  $scope.usuario.id =''; 

  
   $scope.doRegister = function() {
      $http.post('http://pixelesp-api.herokuapp.com/usuarios',$scope.usuario ).then(function(resp) {
        console.log(resp.data);
         var alertPopup = $ionicPopup.alert({
             title: 'Usuario Creado con exito',
             template: 'Ingresa ahora'
           });
           alertPopup.then(function(res) {
             $location.path('/app/start');
           });
          
    }, function(err) {
      console.error('ERR', err);
        var alertPopup = $ionicPopup.alert({
             title: 'Error en el ingreso',
             template: 'Volver'
           });
           alertPopup.then(function(resp) {
             $location.path('/app/registrarse');
           });
     
    });  

     

    };
    
  
})

.controller('NoticiaslistsCtrl', function($rootScope, $scope, $http, $location, CONFIG) {
    


  $scope.noticias = [];
   $scope.$on('$ionicView.beforeEnter', function() {
    $http.get(CONFIG.APIURL+'noticias').then(function(resp){  
      $scope.noticias = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });
  });



})
 

.controller('NoticiaCtrl', function($scope, $stateParams, $http, $location) {

  $scope.noticia = {};

  $http.get('http://pixelesp-api.herokuapp.com/noticias/'+ $stateParams.NoticiaId).then(function(resp) {
    $scope.noticia = resp.data.data;

     
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  }); 

  $scope.doSave = function() {
    $http.put('http://pixelesp-api.herokuapp.com/noticias/'+ $stateParams.NoticiaId, $scope.noticia).then(function(resp) {
      console.log(resp.data);  
      $location.path('/app/noticias');
    }, function(err) {
      console.error('ERR', err);
     
      // err.status will contain the status code
    });
     };

    $scope.doDelete = function() {
   $http.delete('http://pixelesp-api.herokuapp.com/noticias/'+ $stateParams.NoticiaId, $scope.noticia).then(function(resp) {
      console.log(resp.data);
      $location.path('/app/noticias');
    }, function(err) {
      console.error('ERR', err);
      
      // err.status will contain the status code
    });


  };
  


 })


.controller('NoticiasCtrl', function($scope, $http, $state,CONFIG,$ionicModal, $rootScope,  $location, $ionicPopover, $timeout, $cordovaSocialSharing, $stateParams, $localStorage) {
      
   if($localStorage.authorization !== undefined) {

  $rootScope.userToken  = $localStorage.authorization;    
     
   console.log($rootScope.userToken); 
 
}

    $scope.user = [];
    $http.get('http://pixelesp-api.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
 $location.path('/app/inicio');
     
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/start');
      // err.status will contain the status code
    }); 

  $scope.noticias = [];
  $scope.$on('$ionicView.beforeEnter', function() {
  
    $http.get(CONFIG.APIURL+'noticias').then(function(resp) {
      $scope.noticias = resp.data.data;


    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/start');
      // err.status will contain the status code
    });

  });

   $scope.doRefresh = function() {
    
    console.log('Refreshing!');
    $timeout( function() {
      //simulate async response
      

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
  };

  $scope.$storage = $localStorage.$default({
          x: 32
        });

  $scope.imagenes = [];
  $scope.$on('$ionicView.beforeEnter', function() {
    
    $http.get(CONFIG.APIURL+'imagenes').then(function(resp) {
      $scope.imagenes = resp.data.data;

    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });

  });



  $scope.abrirComentarios = function  (noticia) {
    var viewNoticia = noticia;
    $scope.viewNoticia = viewNoticia;
    $scope.newCommentario = {text:''};
    $scope.modal.show();
  }
  $scope.guardarComentario = function  (newCommentarioForm) {

    $http.get('http://pixelesp-api.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
        console.log(newCommentarioForm);
        console.log(resp);
        var newCommentario = {
          idusuario : resp.data.data.id,
         username : resp.data.data.username,
          id_noticia : $scope.viewNoticia.id,
          text : newCommentarioForm.text,
        };
        $http.post(CONFIG.APIURL+'newscomments',newCommentario ).then(function(resp) {
          console.log(resp.data);

           $state.go($state.current, {}, {reload: true});
           $scope.modal.hide();
           $scope.viewNoticia = {};
           $scope.newCommentario = {text:''};
        }, function(err) {
          console.error('ERR', err);
           
          // err.status will contain the status code
        });


    }, function(err) {
      console.error('ERR', err);
        $scope.modal.hide();
       $location.path('/app/start');
    }); 

    // $scope.viewNoticia = viewNoticia;
    // $scope.modal.show();
  }

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.demo = 'ios';
  $scope.setPlatform = function(p) {
    document.body.classList.remove('platform-ios');
    document.body.classList.remove('platform-android');
    document.body.classList.add('platform-' + p);
    $scope.demo = p;
  }


//favoritos noticias:
     $scope.StartEvent = function (event) {
            event.preventDefault();
            $scope.EventRunning = true;
            
            // your code
            $scope.newsfavoritos={};
            $scope.newsfavoritos.idnoticia= $scope.noticias.id;
        

          
               $http.post('http://pixelesp-api.herokuapp.com/newsfavoritos', $scope.newsfavoritos, {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
                 console.log(resp.data);

             }, function(err) {
               console.error('ERR', err);
               // err.status will contain the status code
             });


    }


    $scope.StopEvent = function (event) {
            event.preventDefault();
            $scope.EventRunning = false;
            // your code
            $scope.newsfavoritos={};
            $scope.newsfavoritos.idnoticia = $scope.noticias.id;

               $http.delete('http://pixelesp-api.herokuapp.com/delfavoritos', $scope.favoritos, {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
                 console.log(resp.data);

             }, function(err) {
               console.error('ERR', err);
               // err.status will contain the status code+

             });

    }

  $scope.compartir = function (id) {
         console.log(id);


        $cordovaSocialSharing.share("This is your message", "This is your subject", "www/img/gemionic/gem-logo.gif", 'www.pixelesp.com/noticia/'+ id);
    }



  







})

.controller('NoticiasinicioCtrl', function($scope, $stateParams, $http, $location) {

   $scope.noticia = {};

  $http.get('http://pixelesp-api.herokuapp.com/noticias/'+ $stateParams.NoticiaId).then(function(resp) {
    $scope.noticia = resp.data.data;

     
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  });


 })
.controller('NoticiaNuevaCtrl', function($scope, $stateParams, $http, $ionicPopup, $location,$rootScope ) {
            
        $scope.noticia={};
        $scope.noticia.Titulo='';
        $scope.noticia.Descripcion='';
        $scope.noticia.id =''; 
  
   $scope.doRegister = function() {
    
    $scope.noticia.username =''; 


    $http.get('http://pixelesp-api.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {


        $scope.noticia.idusuario = resp.data.data.id;

        $http.post('http://pixelesp-api.herokuapp.com/noticias',$scope.noticia).then(function(resp) {
              console.log(resp.data);
           
       $location.path('/app/inicio');


              
        }, function(err) {
          console.error('ERR', err);
          // err.status will contain the status code
        });


    }, function(err) {
      console.error('ERR', err);
     
    }); 
  };
  
})

.controller('subirimagen', function($scope, $stateParams, $http, $ionicPopup, $location, $cordovaFileTransfer, $timer) {
            $scope.testFileDownload = function () {
  // Function code goes here
}
$scope.testFileUpload = function () {

// Destination URL 
var url = "http://example.gajotres.net/upload/upload.php";
 
//File for Upload
var targetPath = cordova.file.externalRootDirectory + "logo_radni.png";
 
// File name only
var filename = targetPath.split("/").pop();
 
var options = {
     fileKey: "file",
     fileName: filename,
     chunkedMode: false,
     mimeType: "image/jpg",
 params : {'directory':'upload', 'fileName':filename} // directory represents remote directory,  fileName represents final remote file name
 };
      
 $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
     console.log("SUCCESS: " + JSON.stringify(result.response));
 }, function (err) {
     console.log("ERROR: " + JSON.stringify(err));
 }, function (progress) {
     // PROGRESS HANDLING GOES HERE
 });








  // Function code goes here
}


        // $scope.imagen={};
        // $scope.imagen.Titulo='';
        // $scope.imagen.Descripcion='';
        // $scope.imagen.id =''; 
  // 
   // $scope.doRegister = function() {
      // $http.post('http://pixelesp-api.herokuapp.com/imagenes',$scope.imagen ).then(function(resp) {
        // console.log(resp.data);
         // var alertPopup = $ionicPopup.alert({
             // title: 'imagen creada con exito',
             // template: 'OK'
           // });
           // alertPopup.then(function(res) {
             // $location.path('/app/galeria');
           // });
          // 
    // }, function(err) {
      // console.error();
      // err.status will contain the status code
    // });
    // };
  // 
})
.controller('imagenlistsCtrl', function($rootScope, $scope, $http, $location) {
    
  $scope.imagenes = [];
  
  $scope.$on('$ionicView.beforeEnter', function() {
      $http.get('http://pixelesp-api.herokuapp.com/imagenes').then(function(resp) {
        $scope.imagenes = resp.data.data;
        console.log('Succes', resp.data.data);
      }, function(err) {
        console.error('', err);
        // err.status will contain the status code
      });
  });

})
 

.controller('imagenCtrl', function($scope, $stateParams, $http, $location) {

  $scope.imagen = {};

  $http.get('http://pixelesp-api.herokuapp.com/imagenes/'+ $stateParams.imagenId).then(function(resp) {
    $scope.imagen = resp.data.data;

     
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  }); 

  $scope.doSave = function() {
    $http.put('http://pixelesp-api.herokuapp.com/imagenes/'+ $stateParams.imagenId, $scope.imagen).then(function(resp) {
      console.log(resp.data);  
      $location.path('/app/imagenes');
    }, function(err) {
      console.error('ERR', err);
     
      // err.status will contain the status code
    });
     };

    $scope.doDelete = function() {
   $http.delete('http://pixelesp-api.herokuapp.com/imagenes/'+ $stateParams.imagenId, $scope.imagen).then(function(resp) {
      console.log(resp.data);
      $location.path('/app/imagenes');
    }, function(err) {
      console.error('ERR', err);
      
      // err.status will contain the status code
    });


  };
  


 })


//trabajos:


.controller('TrabajoslistsCtrl', function($rootScope, $scope, $http, $location) {
    


  $scope.trabajos = [];
   $scope.$on('$ionicView.beforeEnter', function() {
    $http.get('http://pixelesp-api.herokuapp.com/trabajos').then(function(resp) {
      $scope.trabajos = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });
  });

})

  
 

.controller('TrabajoCtrl', function($scope, $stateParams, $http, $location, $rootScope, $cordovaSocialSharing) {

     console.log($rootScope.userToken);     
    
    $scope.user = [];
    $http.get('http://pixelesp-api.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
 
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/start');
      // err.status will contain the status code
    }); 

  $scope.trabajo = {};

  $http.get('http://pixelesp-api.herokuapp.com/trabajos/'+ $stateParams.TrabajoId).then(function(resp) {
    $scope.trabajo = resp.data.data;

     
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  }); 

  $scope.doSave = function() {
    $http.put('http://pixelesp-api.herokuapp.com/trabajos/'+ $stateParams.TrabajoId, $scope.trabajo).then(function(resp) {
      console.log(resp.data);  
      $location.path('/app/trabajo');
    }, function(err) {
      console.error('ERR', err);
     
      // err.status will contain the status code
    });
     };

    $scope.doDelete = function() {
   $http.delete('http://pixelesp-api.herokuapp.com/trabajos/'+ $stateParams.TrabajoId, $scope.trabajo).then(function(resp) {
      console.log(resp.data);
      $location.path('/app/trabajo');
    }, function(err) {
      console.error('ERR', err);
      
      // err.status will contain the status code
    });


  };
  


 })


.controller('TrabajosCtrl', function($stateParams, $scope, $http, $location, $state,CONFIG,$ionicModal, $rootScope, $ionicPopover, $timeout) {


  $scope.trabajos = [];
   $scope.$on('$ionicView.beforeEnter', function() {
    
    $http.get('http://pixelesp-api.herokuapp.com/trabajos').then(function(resp) {
      $scope.trabajos = resp.data.data;

    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });

  });
   $scope.doRefresh = function() {
    
    console.log('Refreshing!');
    $timeout( function() {
      //simulate async response
      

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
  };



$scope.abrirComentarios = function  (trabajo) {
    var viewEmpleo = trabajo;
    $scope.viewEmpleo = viewEmpleo;
    $scope.newCommentario = {text:''};
    $scope.modal.show();
  }
  $scope.guardarComentario = function  (newCommentarioForm) {

    $http.get('http://pixelesp-api.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
        console.log(newCommentarioForm);
        console.log(resp);
        var newCommentario = {
          idusuario : resp.data.data.id,
         username : resp.data.data.username,
         imagen : resp.data.data.imagen,

           trabajo : resp.data.data.trabajo,
          id_empleo : $scope.viewEmpleo.id,
         
          text : newCommentarioForm.text,
        };

        $http.post(CONFIG.APIURL+'empleocomments',newCommentario ).then(function(resp) {
          console.log(resp.data);

           $state.go($state.current, {}, {reload: true});
           $scope.modal.hide();
           $scope.viewEmpleo = {};
           $scope.newCommentario = {text:''};
        }, function(err) {
          console.error('ERR', err);
          // err.status will contain the status code
        });


    }, function(err) {
      console.error('ERR', err);
     
    }); 
    // $scope.viewNoticia = viewNoticia;
    // $scope.modal.show();
  }

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.demo = 'ios';
  $scope.setPlatform = function(p) {
    document.body.classList.remove('platform-ios');
    document.body.classList.remove('platform-android');
    document.body.classList.add('platform-' + p);
    $scope.demo = p;
  }

  $scope.compartir = function (id) {
         console.log(id);
         

        $cordovaSocialSharing.share("This is your message", "This is your subject", "www/img/gemionic/gem-logo.gif", 'www.pixelesp.com/trabajo/'+ id);
    }







})

.controller('TrabajoNuevoCtrl', function($scope, $stateParams, $http, $ionicPopup, $location, $rootScope) {
            
        $scope.trabajo={};
        $scope.trabajo.Titulo='';
        $scope.trabajo.Descripcion='';
        $scope.trabajo.id=''; 
  
   // $scope.doRegister = function() {
   //    $http.post('http://pixelesp-api.herokuapp.com/trabajos',$scope.trabajo ).then(function(resp) {
   //      console.log(resp.data);
   //           $location.path('/app/trabajo');
          
   //  }, function(err) {
   //    console.error('ERR', err);
   //    // err.status will contain the status code
   //  });
   //  };
      $scope.doRegister = function() {
    
    $scope.trabajo.username =''; 


    $http.get('http://pixelesp-api.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {


        $scope.trabajo.idusuario = resp.data.data.id;

        $http.post('http://pixelesp-api.herokuapp.com/trabajos',$scope.trabajo).then(function(resp) {
              console.log(resp.data);
           
       $location.path('/app/trabajo');


              
        }, function(err) {
          console.error('ERR', err);
          // err.status will contain the status code
        });


    }, function(err) {
      console.error('ERR', err);
     
    }); 
  };
  
})

//imagenes:


.controller('ImagengaleriaCtrl', function($scope, $stateParams, $http, $state, $location, CONFIG, $ionicModal, $rootScope) {


  $scope.imagen = {};
   $scope.$on('$ionicView.beforeEnter', function() {
  $http.get('http://pixelesp-api.herokuapp.com/imagenes/'+ $stateParams.ImagenId).then(function(resp) {
    $scope.imagen = resp.data.data;
  


     
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  }); 
  });
  
      $scope.ratingsObject = {
        iconOn : 'ion-ios-star',
        iconOff : 'ion-ios-star-outline',
        iconOnColor: 'rgb(200, 200, 100)',
        iconOffColor:  'rgb(150, 150, 150)',
        rating:  2,
        minRating:1,
        callback: function(rating) {
          $scope.ratingsCallback(rating);
        }
      };

      $scope.ratingsCallback = function(rating) {
        console.log('Selected rating is : ', rating);
      };



       $scope.abrirFavoritos = function  (imagen) {

    var viewImagen = imagen;
    $scope.viewImagen = viewImagen;
    $scope.newCommentario = {text:''};

    $scope.modal.show();
   
  }



  $scope.guardarComentario = function  (newCommentarioForm) {

    $http.get('http://pixelesp-api.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
    
       console.log(newCommentarioForm);
        console.log(resp);
        var newCommentario = {
          idusuario : resp.data.data.id,
           username : resp.data.data.username,
               imagen : resp.data.data.imagen,
           id_imagen : $scope.imagen.id,
           text : newCommentarioForm.text,
        };    
        $http.post(CONFIG.APIURL+'imgcomments',newCommentario ).then(function(resp) {
          console.log(resp.data);

           $state.go($state.current, {}, {reload: true});
           $scope.viewImagen = {};
           $scope.newCommentario = {text:''};
        }, function(err) {
          console.error('ERR', err);
          // err.status will contain the status code
        });


    }, function(err) {
      console.error('ERR', err);
     
    }); 


    
  }

  $ionicModal.fromTemplateUrl('templates/modal.html', {
     scope: $scope,
   }).then(function(modal) {
     $scope.modal = modal;
   });


 
 //favoritos
     
        

    $scope.EventRunning = false;
       
  
   


      $scope.StartEvent = function (event) {
     

            event.preventDefault();
          
            $scope.EventRunning = true;
          
            // your code
            $scope.imgfavoritos={};
            $scope.imgfavoritos.idimagen= $scope.imagen.id;
       
          
               $http.post('http://pixelesp-api.herokuapp.com/imgfavoritos', $scope.imgfavoritos, {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
                    
                   console.log(resp.data);
$state.reload();
             }, function(err) {
               console.error('ERR', err);
               // err.status will contain the status code
             });

  } 

    $scope.StopEvent = function (event) {
            event.preventDefault();
            $scope.EventRunning = false;
            // your code
            $scope.imgfavoritos={};


   $http.delete('http://pixelesp-api.herokuapp.com/imgfavoritos/' + $stateParams.ImagenId, {headers: {'auth-token': $rootScope.userToken}}).then(function (resp) {
               
                 console.log(resp.data);
                 $state.reload();

             }, function(err) {
               console.error('ERR', err);
               // err.status will contain the status code+

             });

    }




 })








.controller('imagenesCtrl', function ($scope, $ionicModal, $ionicSlideBoxDelegate, $http, $location) {

    $scope.imagenes = [];

    $scope.$on('$ionicView.beforeEnter', function() {
      
      $http.get('http://pixelesp-api.herokuapp.com/imagenes').then(function(resp) {
        $scope.imagenes = resp.data.data;
        //$scope.imgLoadedCallback();

      }, function(err) {
        console.error('ERR', err);
        // err.status will contain the status code
      });

    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    $scope.goToSlide = function(index) {
      $scope.modal.show();
      $ionicSlideBoxDelegate.slide(index);
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };


$scope.noMoreItemsAvailable = false;
  
  $scope.loadMore = function() {
    $scope.imagenes.push({ id: $scope.imagenes.length});
   
    if ( $scope.imagenes.length == 99 ) {
      $scope.noMoreItemsAvailable = true;
    }
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };
  
  $scope.imagenes = [];

  
  }
)

.controller('subirimagenes', function($scope, $cordovaFileTransfer, $cordovaCamera, $http, $q, $stateParams, $ionicPopup, $location, $rootScope) {

   $scope.imagen={};
        $scope.imagen.Titulo='';
        $scope.imagen.Descripcion='';
      
        $scope.imagen.id =''; 
        $scope.imagen.Imagen =''; 
        $scope.imagen.Previa =''; 
  document.addEventListener("deviceready",function(){
        
        $scope.upload = function (){
            console.log("encotro");
            navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI ,sourceType: Camera.PictureSourceType.PHOTOLIBRARY });            
    
   
function onSuccess(imageURI) {

                var image = document.getElementById('fotoServidor');
                image.src = imageURI;

                
                 var deferred = $q.defer();
                subirImagen(); 
  function subirImagen() {

                
                 var options = {  
 
                  
                        params : { 
                          
                  'upload_preset': 'c5o7wpot',            
                  'api_key': 584471834239559,  


                

                }
                    
                                    } 


     $cordovaFileTransfer.upload(encodeURI("https://api.cloudinary.com/v1_1/hyktxhgfc/image/upload"), imageURI, options).then(function (result) {
    
          console.log("SUCCESS: " + JSON.stringify(result.response));

             var response = JSON.parse(decodeURIComponent(result.response));
                  deferred.resolve(response);
                  var resultado = JSON.stringify(result.response);
var url = response.url;

 $scope.imagen.Imagen = url.substr(url.lastIndexOf('d/') + 2); 

         console.log("SUCCESS2: " +  url.substr(url.lastIndexOf('d/') + 2));

   console.log("SUCCESS2: " +  resultado.substr(resultado.lastIndexOf('/') + 1));


     }, function (err) {
          console.log("ERROR: " + JSON.stringify(err));

             deferred.reject(err);
     }, function (progress) {
           
      });
           
                       

             

            }

            }
            function onFail(message) {
                alert('Failed because: ' + message);
            }            
          

            function uploadSuccess(r) {
                console.log("Code = " + r.responseCode+" Response = " + r.response+" Sent = " + r.bytesSent);
                var image = document.getElementById('fotoServidor');
                image.src = r.response;
            }

            function uploadFail(error) {
                console.log("An error has occurred: Code = " + error.code+ " upload error source " + error.source+" upload error target " + error.target);
            }            
        }


 
  },false);  

//subirprevia:

document.addEventListener("deviceready",function(){
$scope.upload2 = function (){
            console.log("encotro");
            navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI ,sourceType: Camera.PictureSourceType.PHOTOLIBRARY });            
    
   
function onSuccess(imageURI) {

                var image = document.getElementById('fotoServidor2');
                image.src = imageURI;

                
                 var deferred = $q.defer();
                subirImagen(); 
  function subirImagen() {

                
                 var options = {  
 
                  
                        params : { 
                          
                  'upload_preset': 'c5o7wpot',            
                  'api_key': 584471834239559,    
                   'folder': 'Previa',             
                

                }
                    
                                    } 


     $cordovaFileTransfer.upload(encodeURI("https://api.cloudinary.com/v1_1/hyktxhgfc/image/upload"), imageURI, options).then(function (result) {
    
          console.log("SUCCESS: " + JSON.stringify(result.response));

             var response = JSON.parse(decodeURIComponent(result.response));
                  deferred.resolve(response);
                  var resultado = JSON.stringify(result.response);
var url = response.url;

 $scope.imagen.Previa = url.substr(url.lastIndexOf('d/') + 2); 

         console.log("SUCCESS2: " +  url.substr(url.lastIndexOf('d/') + 2));

   console.log("SUCCESS2: " +  resultado.substr(resultado.lastIndexOf('/') + 1));


     }, function (err) {
          console.log("ERROR: " + JSON.stringify(err));

             deferred.reject(err);
     }, function (progress) {
           
      });
           
                       

             

            }

            }
            function onFail(message) {
                alert('Failed because: ' + message);
            }            
          

            function uploadSuccess(r) {
                console.log("Code = " + r.responseCode+" Response = " + r.response+" Sent = " + r.bytesSent);
                var image = document.getElementById('fotoServidor');
                image.src = r.response;
            }

            function uploadFail(error) {
                console.log("An error has occurred: Code = " + error.code+ " upload error source " + error.source+" upload error target " + error.target);
            }            
        }        


  },false);  

        $scope.SubirImagen = function() {
    
    $scope.imagen.username =''; 


    $http.get('http://pixelesp-api.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
        

        $scope.imagen.idusuario = resp.data.data.id;

      

        $http.post('http://pixelesp-api.herokuapp.com/imagenes',$scope.imagen).then(function(resp) {
              console.log(resp.data);
           
       $location.path('/app/galeria');


              
        }, function(err) {
          console.error('ERR', err);
          // err.status will contain the status code
        });


    }, function(err) {
      console.error('ERR', err);
     
    }); 
  };
         
  
})
        

.controller('CrearMensajeCtrl', function ($scope, $stateParams, $http, $location, $ionicPopup, $ionicLoading, $ionicHistory, $localStorage, $rootScope) {

   $scope.mensaje = {};

    $scope.mensaje.asunto = '';
    $scope.mensaje.mensaje = '';

    $scope.usuario = {};
 


 $http.get('http://pixelesp-api.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {


        $scope.mensaje.id_origen = resp.data.data.id;
}, function(err) {
      console.error('ERR', err);
     
    }); 
  
    $scope.doSend = function () {

        $http.post('http://pixelesp-api.herokuapp.com/crearmensaje/' + $stateParams.UsuarioId, $scope.mensaje).then(function (resp) {

            console.log('Creado');

            var alertPopup = $ionicPopup.alert({
                title: 'Perfecto!',
                template: '¡Mensaje enviado!'
            });

            alertPopup.then(function (res) {
                $ionicHistory.goBack();
            });

        }, function (err) {

            console.error('ERR', err);

            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: err.data.msg
            });

            alertPopup.then(function (res) {});

        });

    };

    



})


.controller('MensajesCtrl', function ($scope, $http, $stateParams, $rootScope) {

    
  


    $http.get('http://pixelesp-api.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
        $scope.user = resp.data.data;
 

   }, function(err) {
      console.error('ERR', err);

  }); 
$scope.mensajes = [];
        $http.get('http://pixelesp-api.herokuapp.com/listarmensajes/' + $stateParams.UsuarioId).then(function (resp) {
         
            $scope.mensajes = resp.data.data;
   
        }, function (err) {

            console.error('ERR', err);
            // err.status will contain the status code

        });
   


   

})
.controller('MensajeCtrl', function ($scope, $state, $stateParams, $http, $location, $ionicPopup, $ionicLoading, $ionicHistory) {

    $scope.mensaje = {};

    $scope.$on('$ionicView.beforeEnter', function () {
        $http.get('http://pixelesp-api.herokuapp.com/mensaje/' + $stateParams.IdMensaje).then(function (resp) {

            //Saco el icono de Cargando.
            $ionicLoading.hide();

            $scope.mensaje = resp.data.data[0];

            console.log($scope.mensaje);

        }, function (err) {

            //Saco el icono de Cargando.
            $ionicLoading.hide();

            console.error('ERR', err);
            // err.status will contain the status code
        });
    });

    $scope.doBorrar = function () {

        console.log('Borrado!');

        $http.delete('http://pixelesp-api.herokuapp.com/borrarmensaje/' + $stateParams.IdMensaje).then(function (resp) {

           
          
                $ionicHistory.goBack();
                
           

        }, function (err) {

            console.error('ERR', err);
            // err.status will contain the status code

            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: err.data.msg
            });

            alertPopup.then(function (res) { });

        });
    };
});



