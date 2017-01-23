(function () {
    angular
        .module('WebAppMaker')
        .controller('PageListController', PageListController)
        .controller('NewPageController', NewPageController)
        .controller('EditPageController', EditPageController);


    function PageListController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId=$routeParams["wid"];
        vm.profile = profile;
        vm.pageOpen = pageOpen;
        vm.pageNew = pageNew;
        vm.pageEdit = pageEdit;
        vm.back = back;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }

        init();

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function pageOpen(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id + "/widget");
        }

        function pageNew() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/new");
        }

        function pageEdit(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id);
        }

        function back(){
            $location.url("/user/" + vm.userId + "/website");
        }


    }


    function NewPageController($location,$routeParams, PageService ) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId=$routeParams["wid"];
        vm.profile = profile;
        vm.pageOpen = pageOpen;
        vm.pageNew = pageNew;
        vm.pageEdit = pageEdit;
        vm.pageCreate=pageCreate;
        vm.back = back;
        vm.clear=clear;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();


        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function pageOpen(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id + "/widget");
        }

        function pageNew() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/new");
        }

        function pageEdit(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id);
        }

        function pageCreate(page) {
            if (page) {
                var returnedpage = PageService.createPage(vm.websiteId, page);
                if (!returnedpage) {
                    vm.alert = "page could not be created";
                } else {
                    vm.success = "Page created successfully";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");                }
            } else {
                vm.alert = "No details found";
            }
        }

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function clear(){
            vm.alert="";
            vm.success="";
        }
    }

    function EditPageController($location, $routeParams, PageService ) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId=$routeParams["pid"];
        vm.profile = profile;
        vm.pageOpen = pageOpen;
        vm.pageNew = pageNew;
        vm.pageEdit = pageEdit;
        vm.pageUpdate = pageUpdate;
        vm.pageDelete = pageDelete;
        vm.back = back;
        vm.clear=clear;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        }

        init();

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function pageOpen(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id + "/widget");
        }

        function pageNew() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/new");
        }

        function pageEdit(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id);
        }


        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }


        function pageUpdate(page) {
            page = PageService.updatePage(vm.pageId, page);
            if (!page) {
                vm.alert = "page could not be updated";
            } else {
                vm.success = "Page updated successfully";
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");            }
        }

        function pageDelete() {
            var response = PageService.deletePage(vm.pageId);
            if (!response) {
                vm.alert = "page could not be deleted";
            } else {
                vm.success = "Page deleted successfully";
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
        }

        function clear(){
            vm.alert="";
            vm.success="";
        }

    }
})();