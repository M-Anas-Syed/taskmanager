document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialDate: '2022-03-01',
    editable: true,
    selectable: true,
    businessHours: true,
    dayMaxEvents: true, // allow "more" link when too many events
    events: [
      {
        title: 'Career Fairs',
        start: '2022-03-03',
        url: 'http://www.le.ac.uk'
      },
      {
        title: 'Happy days',
        start: '2022-03-07',
        end: '2022-03-10'
      },
      {
        title: 'Meeting',
        start: '2022-03-12T10:30:00',
        end: '2022-03-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2022-03-12T12:00:00'
      }
    ], eventClick: function (info) {
      info.jsEvent.preventDefault(); // don't let the browser navigate

      if (info.event.url) {
        alert(info.event.url);
        //window.open(info.event.url);
      }
    }
  });

  calendar.render();
});

if (document.URL.includes('profile_page.html')) {

  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(drawPieChart);

  function drawPieChart() {

    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Tasks completed', 15],
      ['Tasks abandoned', 2],
      ['Tasks pending', 7]
    ]);

    var options = {
      title: 'My Progress',
      backgroundColor: 'transparent'
    };

    var piechart = new google.visualization.PieChart(document.getElementById('piechart'));

    piechart.draw(data, options);
  }

  const numb = document.querySelector(".number");
  let counter = 0;
  setInterval(() => {
    if (counter == 60) {
      clearInterval();
    } else {
      counter += 1;
      numb.textContent = counter + "%";
    }
  }, 60);

  const numb1 = document.querySelector(".number1");
  let counter1 = 0;
  setInterval(() => {
    if (counter1 == 40) {
      clearInterval();
    } else {
      counter1 += 1;
      numb1.textContent = counter1 + "%";
    }
  }, 95);
}


var attempt = 3;

function validate() {
  console.log(attempt);
  var username = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  if (username == "user" && password == "name") {
    alert("Login sucessfully");
    window.location = "/pages/home.html";
    return false;

  } else {
    attempt--;
    alert("You have left " + attempt + " attempts.");
  }

  if (attempt == 0) {
    document.getElementById("email").disabled = true;
    document.getElementById("password").disabled = true;
    document.getElementsByClassName("login_btn")[0].disabled = true;
  }
}
if (window.location.href.includes('signup')) {
    document.getElementById('sign-in-form').addEventListener('submit', function () {
      alert("Registeration completed");
      window.location.href = "/pages/login.html";
    });
}



var doneTask = document.getElementsByClassName("checkbox");

document.addEventListener("click", function (ele) {
  if (ele.target.classList.contains("checkbox")) {
    if (!ele.target.parentElement.previousElementSibling.childNodes[0].classList.contains('completed_task')) {
      ele.target.parentElement.previousElementSibling.childNodes[0].classList.add('completed_task');
    } else {
      ele.target.parentElement.previousElementSibling.childNodes[0].classList.remove('completed_task');
    }
  }
})

var togBtn = document.getElementsByClassName('switch')[0];
var taskList = document.getElementsByClassName('home_body')[0];
var gantt = document.getElementsByClassName('c_div')[0];

document.addEventListener("click", function (ele) {
  if (ele.target.classList.contains("switch")) {
    if (!taskList.classList.contains('inactive')) {
      taskList.classList.add('inactive');
      gantt.classList.remove('inactive');

      google.charts.load("current", { packages: ["gantt"] });
      google.charts.setOnLoadCallback(drawChart);

      function toMilliseconds(minutes) {
        return minutes * 60 * 1000;
      }

      function drawChart() {
        var otherData = new google.visualization.DataTable();
        otherData.addColumn("string", "Task ID");
        otherData.addColumn("string", "Task Name");
        otherData.addColumn("string", "Resource");
        otherData.addColumn("date", "Start");
        otherData.addColumn("date", "End");
        otherData.addColumn("number", "Duration");
        otherData.addColumn("number", "Percent Complete");
        otherData.addColumn("string", "Dependencies");

        otherData.addRows([
          [
            "toTrain",
            "Walk to train stop",
            "walk",
            null,
            null,
            toMilliseconds(5),
            100,
            null,
          ],
          [
            "music",
            "Listen to music",
            "music",
            null,
            null,
            toMilliseconds(70),
            100,
            null,
          ],
          [
            "wait",
            "Wait for train",
            "wait",
            null,
            null,
            toMilliseconds(10),
            100,
            "toTrain",
          ],
          [
            "train",
            "Train ride",
            "train",
            null,
            null,
            toMilliseconds(45),
            75,
            "wait",
          ],
          [
            "toWork",
            "Walk to work",
            "walk",
            null,
            null,
            toMilliseconds(10),
            0,
            "train",
          ],
          [
            "work",
            "Sit down at desk",
            null,
            null,
            null,
            toMilliseconds(2),
            0,
            "toWork",
          ],
        ]);

        var options = {
          height: 275,
          width: 1000,
          gantt: {
            defaultStartDate: new Date(2015, 3, 28),
          },
        };

        var chart = new google.visualization.Gantt(
          document.getElementById("chart_div")
        );

        chart.draw(otherData, options);
      }

    } else {
      taskList.classList.remove('inactive');
      gantt.classList.add('inactive');
    }
  }
})

// var obj = {
//   taskName: taskName,
//   taskStatus: taskStatus,
//   taskPriority: taskPriority
// }

// var taskName;
// var taskStatus;
// var taskPriority;

var taskNamesList;
var taskStatusList;
var taskPriorityList;

function addTask() {

  var myInput = document.getElementById("newTaskId");
  if(myInput.value == ''){
    alert('The name field can not be empty!')
  }else{
    if (window.localStorage.getItem("tasks") != null) {
      var taskName = window.localStorage.getItem("tasks");
      taskName += myInput.value + ',';
      window.localStorage.setItem("tasks", taskName);
    } else {
      var taskName = '';
      taskName += myInput.value + ',';
      window.localStorage.setItem("tasks", taskName);
    }

    var ts = document.getElementsByClassName('task_status')[0];
    if (window.localStorage.getItem("taskStat") != null) {
      var taskStatus = window.localStorage.getItem("taskStat");
      taskStatus += ts.value + ',';
      window.localStorage.setItem("taskStat", taskStatus);
    } else {
      var taskStatus = '';
      taskStatus += ts.value + ',';
      window.localStorage.setItem("taskStat", taskStatus);
    }

    var tp = document.querySelector('input[name="status"]:checked').value;
    if (window.localStorage.getItem("taskP") != null) {
      var taskPriority = window.localStorage.getItem("taskP");
      taskPriority += tp + ',';
      window.localStorage.setItem("taskP", taskPriority);
    } else {
      var taskPriority = '';
      taskPriority += tp + ',';
      window.localStorage.setItem("taskP", taskPriority);
    }
  

  location.reload(true);
  }

}

if (document.URL.includes('home.html')) {
  var addTaskBtn = document.getElementsByClassName('add_task')[0];
  var popup = document.getElementsByClassName('popup')[0];
  var cancel = document.getElementById('cancel_add');

  addTaskBtn.onclick = function () {
    popup.style.display = "block";
  }

  cancel.onclick = function () {
    popup.style.display = "none";
  }
}


window.onload = function loadPage() {

  if (document.URL.includes('calendar.html')) {
    var calendarhelp = document.getElementById('calendar_help');
    calendarhelp.addEventListener('click', function (event) {
      event.preventDefault();
      console.log(event.target);
      if (event.target.parentElement.nextElementSibling.classList.contains('inactive')) {
        event.target.parentElement.nextElementSibling.classList.remove('inactive');
      } else {
        event.target.parentElement.nextElementSibling.classList.add('inactive');
      }
    });
  }

  if (document.URL.includes('home.html')) {
    var helpIcon = document.getElementById('help');
    helpIcon.addEventListener('click', function (event) {
      event.preventDefault();
      if (event.target.parentElement.parentElement.previousElementSibling.classList.contains('inactive')) {
        event.target.parentElement.parentElement.previousElementSibling.classList.remove('inactive');
      } else {
        event.target.parentElement.parentElement.previousElementSibling.classList.add('inactive');
      }
    });

    var gantthelpIcon = document.getElementById('gantt_help');
    gantthelpIcon.addEventListener('click', function (event) {
      event.preventDefault();
      if (event.target.parentElement.parentElement.previousElementSibling.classList.contains('inactive')) {
        event.target.parentElement.parentElement.previousElementSibling.classList.remove('inactive');
      } else {
        event.target.parentElement.parentElement.previousElementSibling.classList.add('inactive');
      }
    });


    if (window.localStorage.getItem("tasks").split(",") != null) {


      taskNamesList = window.localStorage.getItem("tasks").split(",");
      taskNamesList.pop();

      taskStatusList = window.localStorage.getItem("taskStat").split(",");
      taskStatusList.pop();
      for (let i = 0; i < taskStatusList.length; i++) {
        if (taskStatusList[i] == "1") {
          taskStatusList[i] = 'Inactive';
        } else if (taskStatusList[i] == "2") {
          taskStatusList[i] = 'Started';
        } else if (taskStatusList[i] == "3") {
          taskStatusList[i] = "Ongoing";
        } else if (taskStatusList[i] == "4") {
          taskStatusList[i] = "Completed";
        }
      }

      taskPriorityList = window.localStorage.getItem("taskP").split(",");
      taskPriorityList.pop();

      // Below is the code to create the layout for each new task

      for (let i = 0; i < taskNamesList.length; i++) {

        let taskBody = document.createElement('div');
        taskBody.setAttribute("class", "task_body");

        let parentTask = document.createElement('div');
        parentTask.setAttribute("class", "parent_task");

        taskBody.appendChild(parentTask);

        let taskInfo = document.createElement('div');
        taskInfo.setAttribute("class", "task_info");

        let taskTitle = document.createElement("p");
        taskTitle.setAttribute("class", "task_name");
        taskTitle.innerHTML = taskNamesList[i];

        taskInfo.appendChild(taskTitle);

        parentTask.appendChild(taskInfo);

        let d = document.createElement('div');
        d.setAttribute('class', 'pos_rel');

        let cbox = document.createElement('input');
        cbox.setAttribute("type", "checkbox");
        cbox.setAttribute("class", "checkbox");
        cbox.style.marginRight = "8px";

        d.appendChild(cbox);


        let status_span = document.createElement('span');
        status_span.setAttribute("class", "status");

        let default_btn = document.createElement('button');
        default_btn.setAttribute("class", taskStatusList[i]);
        default_btn.innerHTML = taskStatusList[i];
        default_btn.style.marginRight = "4.45px";

        status_span.appendChild(default_btn);

        var temp = ['Ongoing', 'Inactive', 'Started', 'Completed'];

        for (let j = 0; j < 3; j++) {
          if (temp.includes(taskStatusList[i])) {
            temp = temp.filter(item => item !== taskStatusList[i]);
          }
          let temp_btn = document.createElement('button');
          temp_btn.setAttribute("class", temp[j] + " inactive");
          //temp_btn.setAttribute("class","inactive");
          temp_btn.innerHTML = temp[j];
          temp_btn.style.marginRight = "4.45px";

          status_span.appendChild(temp_btn);
          //temp = temp.filter(item => item !== temp[j]);
        }

        d.appendChild(status_span);

        let pBtn = document.createElement("button");
        pBtn.setAttribute("class", taskPriorityList[i]);
        pBtn.innerHTML = taskPriorityList[i];
        pBtn.style.marginRight = "4.45px";

        d.appendChild(pBtn);

        let editBtn = document.createElement("button");
        editBtn.setAttribute("class", "edit_btn");

        let editSvg = document.createElement("img");
        editSvg.setAttribute("class", "edit_svg");
        editSvg.src = "/images/edit_btn.svg";
        editSvg.alt = "edit_btn";

        editBtn.appendChild(editSvg);

        d.appendChild(editBtn);

        let tdd = document.createElement('div');
        tdd.setAttribute('class', 'task_dropdown inactive');

        let ed = document.createElement('a');
        ed.setAttribute('class', 'edit');
        ed.innerHTML = 'Edit'

        tdd.appendChild(ed);

        let de = document.createElement('a');
        de.setAttribute('class', 'delete');
        de.innerHTML = 'Delete';

        tdd.appendChild(de);

        d.appendChild(tdd);

        parentTask.appendChild(d);

        document.getElementsByClassName('tasks')[0].insertBefore(taskBody, document.getElementsByClassName('create_task')[0]);
      }


      var tStats = document.getElementsByClassName('status');

      for (var i = 0; i < tStats.length; i++) {
        var curr = 0;
        for (var x = 0; x < tStats[i].children.length; x++) {
          tStats[i].children[x].addEventListener("click", function (elem) {
            elem.target.classList.add('inactive');
            curr += 1;
            if (curr > 3) {
              curr = 0;
            }
            elem.target.parentElement.children[curr].classList.remove('inactive');

          });
        }
      }

      var ed_dropdown = document.getElementsByClassName('edit_btn');

      for (i = 0; i < ed_dropdown.length; i++) {
        ed_dropdown[i].addEventListener("click", function () {
          if (this.nextElementSibling.classList.contains('inactive')) {
            this.nextElementSibling.classList.remove('inactive');
          } else {
            this.nextElementSibling.classList.add('inactive');
          }

        })
      }



      var editPopup = document.getElementsByClassName('edit_popup')[0];
      var editBtn = document.getElementsByClassName('edit');
      var delBtn = document.getElementsByClassName('delete');
      var cancelEdit = document.getElementById('cancel_edit');
      var editTaskButton = document.getElementById('edit_task_button');

      for (i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener("click", function () {
          editPopup.style.display = "block";
        });
      }

      for (i = 0; i < delBtn.length; i++) {
        delBtn[i].addEventListener("click", function () {
          var tn = this.parentElement.parentElement.previousElementSibling.children[0].innerHTML;
          let taskNameLis = localStorage.getItem('tasks').split(',');
          let taskIndex = taskNameLis.indexOf(tn);
          taskNameLis.splice(taskIndex, 1);
          localStorage.removeItem('tasks');
          localStorage.setItem('tasks', taskNameLis);

          let tasksl = localStorage.getItem('taskStat').split(',');
          tasksl.splice(taskIndex, 1);
          localStorage.removeItem('taskStat');
          localStorage.setItem('taskStat', tasksl);

          let taskPriolis = localStorage.getItem('taskP').split(',');
          taskPriolis.splice(taskIndex, 1);
          localStorage.removeItem('taskP');
          localStorage.setItem('taskP', taskPriolis);
          // console.log(localStorage.getItem('tasks'));
          //localStorage.removeItem(tn);
          location.reload(true);
        });
      }

      cancelEdit.onclick = function () {
        editPopup.style.display = "none";
      }

      editTaskButton.onclick = function () {
        location.reload(true);
      }

      window.onclick = function (event) {
        if (event.target == editPopup) {
          editPopup.style.display = "none";
        } else if (event.target == popup) {
          popup.style.display = "none";
        }
      }
    }
    var listOfTasks = document.getElementsByClassName('tasks')[0].children.length;
    var emptyTasksList = document.getElementById('empytasks');

    if (listOfTasks <= 4) {
      console.log('reached 1st');
      emptyTasksList.classList.remove('inactive');
    } else {
      console.log('reached 2st');
      emptyTasksList.classList.add('inactive');

    }
  }

}
