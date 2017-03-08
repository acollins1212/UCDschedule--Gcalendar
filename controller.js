var app = angular.module('myApp', ['ngAnimate']);
app.controller('myCtrl', function($scope) {

    $scope.courseIndex = 0;
    $scope.noInput = true;
    $scope.courseArray = [];
	$scope.hideTextBox = false;

    

    $scope.hideTable = function() {
        if ($scope.courseArray.length <= 0){
            return true;
        } 
        else
            return false;
    }
	
	$scope.hideTextArea = function() {
		return $scope.hideTextBox;
	}

    $scope.getCourses = function() {
        stringArray = parseSchedule();
        for (var i = 0; i < stringArray.length; i++) {
            $scope.courseArray.push(new Course(stringArray[i]));
        } //for

		$scope.hideTextBox = true;

        //Hide button and textbox after clicking it
        document.getElementById('get-button').style.display = 'none';
        document.getElementById('textArea-id').style.display = 'none';
        document.getElementById('courseTable').style.display = 'block';

    } //createTable()

    $scope.incrementIndex = function() {
        if($scope.courseIndex >= $scope.courseArray.length - 1){
            $scope.courseIndex = 0;
        }
        else {
            $scope.courseIndex++;
        }
    } //incrementIndex()

    $scope.decrementIndex = function() {
        if($scope.courseIndex <= 0) {
            $scope.courseIndex = $scope.courseArray.length - 1;
        }
        else {
            $scope.courseIndex--;
        }
    }

    $scope.insertCourse = function(index) {

        var currentCourse = $scope.courseArray[index];
		var len = $scope.courseArray.length;
        var event;
        var exam;

        for(var i = 0; i < currentCourse.meeting_array.length; i++) {
            event = currentCourse.getEventJSON(i);
            insertEvent(event);
        } //for

        exam = currentCourse.getFinalJSON();
        insertEvent(exam);
        $scope.courseArray.splice(index, 1);
        if ($scope.courseIndex > len - 2)
			$scope.courseIndex--;
        
    } //insertCourse()

    $scope.insertCal = function() {
        insertCalendar();
    } //insertCal()

});

