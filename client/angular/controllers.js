app.controller('UsersController', function(UserFactory, $cookies, $location){
    console.log('UsersController');

    var self = this
    self.registration_errors = []
    self.login_errors = []

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
