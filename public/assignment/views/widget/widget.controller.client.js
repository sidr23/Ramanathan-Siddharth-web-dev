/**
 * Created by ram45 on 1/22/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("WidgetListController", WidgetListController);


    function WidgetListController($sce, $location, $routeParams, WidgetService){
        var vm  = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYoutubeUrl = checkSafeYoutubeUrl;
        vm.widgetNew = widgetNew;
        vm.profile = profile;
        vm.back = back;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function checkSafeHtml() {
            return $sce.trustAsHtml(widget.text);
        }
        function checkSafeYoutubeUrl(widget) {
            var parts = widget.url.split('/');
            var id = parts[parts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);

        }
        function widgetNew() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page" + vm.pageId + "/widget/new");
        }

        function back() {
            $location.url("/user/" + vm.userId +  "/website/" + vm.websiteId + "/page");
        }
    }

    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetCreate = widgetCreate;
        vm.profile = profile;
        vm.back = back;
        vm.clear = clear;

        function init() {
        }
        init();

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function widgetCreate(widgetType) {
            var widget={};
            widget.widgetType=widgetType;
            widget = WidgetService.createWidget(vm.pageId, widget);
            if (widget) {
                vm.success = "Widget created successfully";
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
            } else {
                vm.alert = "widget could not be created";
            }
        }

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function clear()
        {
            vm.alert="";
            vm.success="";
        }
    }


    function EditWidgetController($location, $routeParams, WidgetService ) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.profile = profile;
        vm.widgetUpdate = widgetUpdate;
        vm.widgetDelete = widgetDelete;
        vm.back = back;
        vm.clear=clear;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }

        init();

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function widgetUpdate(widget) {
            widget = WidgetService.updateWidget(vm.widgetId, widget);
            if (widget) {
                vm.success = "Widget updated successfully";
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                vm.alert = "widget could not be updated";
            }
        }

        function widgetDelete() {
            var response = WidgetService.deleteWidget(vm.widgetId);
            if (!response) {
                vm.alert = "widget could not be deleted";
            } else {
                vm.success = "Widget deleted successfully";
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");            }
        }

        function clear() {
            vm.success = "";
            vm.alert = "";
        }
    }
})();