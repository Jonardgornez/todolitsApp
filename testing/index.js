const task = ["Jonard", "Je"];
task.push("ahahah");
task.pop();

localStorage.setItem("task", JSON.stringify(task));
