/**
 * Created by ram45 on 12/23/2016.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', WebsiteListController)
        .controller('NewWebsiteController', NewWebsiteController)
        .controller('EditWebsiteController', EditWebsiteController);


    function WebsiteListController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.profile = profile;
        vm.websiteOpen = websiteOpen;
        vm.websiteNew = websiteNew;
        vm.websiteEdit = websiteEdit;
        vm.back = back;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        init();

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function websiteOpen(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id + "/page");
        }

        function websiteNew() {
            $location.url("/user/" + vm.userId + "/website/new");
        }

        function websiteEdit(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id);
        }

        function back(){
            $location.url("/user/" + vm.userId);
        }
    }


    function NewWebsiteController($location,$routeParams, WebsiteService ) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.profile = profile;
        vm.websiteOpen = websiteOpen;
        vm.websiteNew = websiteNew;
        vm.websiteEdit = websiteEdit;
        vm.websiteCreate = websiteCreate;
        vm.back = back;
        vm.clear = clear;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function profile() {
            $location.url("/user/" + vm.userId);
        }


        function websiteOpen(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id + "/page");
        }

        function websiteNew() {
            $location.url("/user/" + vm.userId + "/website/new");
        }

        function websiteEdit(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id);
        }

        function websiteCreate(website) {
            if (website) {
                website = WebsiteService.createWebsite(vm.userId, website);
                if (website==null) {
                    vm.alert = "website could not be created";
                } else {
                    vm.success = "Website created successfully";
                    $location.url("/user/" + vm.userId + "/website");
                }
            } else {
                vm.alert = "No details found";
            }
        }

        function back() {
            $location.url("/user/" + vm.userId + "/website");
        }

        function clear() {
            vm.alert = "";
            vm.success = "";
        }

    }

    function EditWebsiteController($location, $routeParams, WebsiteService ) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.profile = profile;
        vm.websiteOpen = websiteOpen;
        vm.websiteNew = websiteNew;
        vm.websiteEdit = websiteEdit;
        vm.websiteUpdate = websiteUpdate;
        vm.websiteDelete = websiteDelete;
        vm.back = back;
        vm.clear=clear;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }

        init();

        function profile() {
            $location.url("/user/" + vm.userId);
        }


        function websiteOpen(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id + "/page");
        }

        function websiteNew() {
            $location.url("/user/" + vm.userId + "/website/new");
        }

        function websiteEdit(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id);
        }


        function back() {
            $location.url("/user/" + vm.userId + "/website");
        }


        function websiteUpdate(website) {
            website = WebsiteService.updateWebsite(vm.websiteId, website);
            if (website==null) {
                vm.alert = "website could not be updated";
            } else {
                vm.success = "Website updated successfully";
                $location.url("/user/" + vm.userId + "/website");
            }
        }

        function websiteDelete() {
            var response = WebsiteService.deleteWebsite(vm.websiteId);
            if (response==null) {
                vm.alert = "website could not be deleted";
            } else {
                vm.success = "Website deleted successfully";
                $location.url("/user/" + vm.userId + "/website");
            }
        }

        function clear() {
            vm.alert = "";
            vm.success = "";
        }
    }
})();