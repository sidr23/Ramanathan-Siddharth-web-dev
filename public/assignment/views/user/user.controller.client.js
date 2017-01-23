/**
 * Created by ram45 on 12/23/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController",RegisterController);


    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        vm.register=register;
        vm.clear=clear;
        function login(user) {
            if(user){
                var user = UserService.findUserByCredentials(user.username, user.password);
                if(user) {
                    $location.url("/user/" + user._id);
                } else {
                    vm.alert = "No such user";
                }
            } else {
                vm.alert="Enter details first";
            }

        }
        function register()
        {
            $location.url("/register");
        }

        function clear() {
            vm.alert = "";
        }
    }

    function RegisterController($location, UserService){
        var vm=this;
        vm.register=register;
        vm.cancel=cancel;
        vm.clear=clear;
        function register(user) {
            if (user) {
                if (user.password === user.verifyPassword && user.password) {
                    regUser = UserService.createUser(user);
                    if (regUser) {
                        $location.url("/user/" + user._id);
                    } else {
                        vm.alert = "user cannot Register";
                    }
                }
                else {
                    vm.alert = "Passwords do not match";
                }
            } else {
                vm.alert = "Enter a username and password";
            }
        }

        function clear() {
            vm.alert = "";
        }

        function cancel() {
            $location.url("/login");
        }

    }


    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.website = website;
        vm.logout = logout;
        vm.clear=clear;

        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }

        init();

        function updateUser(user) {
            user = UserService.updateUser(vm.userId, user);
            if (user === null) {
                vm.error = "User could not update profile";
            } else {
                vm.success = "User updated";
            }
        }

        function website() {
            $location.url("/user/" + vm.userId + "/website");
        }

        function logout() {
            $location.url("/login");
        }

        function clear() {
            vm.alert = "";
            vm.success = "";
        }
    }
})();