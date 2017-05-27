/**************************************
    ANGULAR USERS CONTROLLER
**************************************/
app.controller('UsersController', function(UserFactory, $cookies, $location, $routeParams){
    console.log('UsersController');

    var self = this
    self.registration_errors = []
    self.login_errors = []
    self.current_user;

    // SESSION SHIT
    self.session = function(){
		UserFactory.session(function(user){
			console.log('user: ', user);
			if(user){
				self.current_user = user;
			} else {
				$location.url('/');
			}
		})
	}

    self.show = function(){
        // console.log($routeParams.id);
        UserFactory.show($routeParams.id, function(res){
            self.user = res.data
            console.log(res.data);
        })
    }

    self.login = function(loginUser) {
        self.login_errors = []
        UserFactory.login(loginUser, function(res){
            if(res.data.errors){
                for(key in res.data.errors){
                    var error = res.data.errors[key];
                    self.login_errors.push(error.message)
                }
            } else {
                $cookies.put('user_id', res.data._id);
                $location.url('/home')
            }
        })
    }

    self.getUsers = function(){
        UserFactory.index(function(res){
            console.log(res);
            self.users = res.data;
        })
    },
    self.create = function(newUser){
		self.registration_errors = [];
		console.log('newUser: ', newUser);
		UserFactory.create(newUser, function(res){
			if(res.data.errors){
				for(key in res.data.errors){
					var error = res.data.errors[key];
					self.registration_errors.push(error.message);
				}
			} else {
				//save the user into session
				var user_id = res.data._id;
				$cookies.put('user_id', user_id);
				$location.url('/home')
				//redirect to the next part of our app
			}
		})
	}

})
/**************************************
        ANGULAR BUCKETS CONTROLLER
**************************************/
app.controller('BucketsController', function(ItemFactory, BucketFactory, UserFactory, $location){
    console.log('Buckets Controller');
    var self = this
    self.new_bucket_errors = []
    self.newBucket = {};

    self.index = function(){
        BucketFactory.index(function(res){
            self.buckets = res.data
        })
    }


    self.create = function(newBucket){
        console.log(newBucket)
        UserFactory.session(function(user){
            newBucket.user = user._id
            BucketFactory.create(newBucket, function(res){
                if(res.data.errors){
					for(key in res.data.errors){
						var error = res.data.errors[key];
						self.new_bucket_errors.push(error.message)
					}
                } else {
                    self.index();
                    $location.url('/bucket/:id')
                }
            })
        })
    }

    self.createItem =  function(newItem, bucket_id){
        self.new_item_errors = {};
        UserFactory.session(function(user){
            newItem.user = user._id
            ItemFactory.create(newItem, function(res){
                self.newItem = {}
                if(res.data.errors){
                    for(key in res.data.errors){
						var error = res.data.errors[key];
						self.new_item_errors.push(error.message);
					}
                } else {
                    // self.index()
                    // console.log(res);
                }
            })
        })
    }
})
