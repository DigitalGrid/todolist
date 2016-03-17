function Todo() {
  this.todoActivities = [];
  this.doneActivities = [];
}

Todo.prototype.add = function(activity) {
  if(activity && activity.replace(/\s+/g, "") !== "") {
    var length = this.todoActivities.push(activity);
    return length-1;
  } else {
    return false; 
  }
}

Todo.prototype.move = function(index) {
  this.doneActivities.push(this.todoActivities[index]);
  this.remove(index, "todoActivities");
}

Todo.prototype.edit = function(index, activity) {
  if(activity && typeof this.todoActivities[index] != "undefined" && activity.replace(/\s+/g, "") !== "") {
    this.todoActivities[index] = activity;
    return activity;
  } else {
    return false; 
  }
}

Todo.prototype.remove = function(index, list) {
  if(list == "todoActivities") {
    this.todoActivities.splice(index,1);
  } else if(list == "doneActivities") {
    this.doneActivities.splice(index,1);
  }
}