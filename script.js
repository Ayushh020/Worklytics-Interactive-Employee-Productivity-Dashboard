// Employee Array
let employees = [
  { name: "Alice", department: "HR", tasks: 12, performance: 90 },
  { name: "Bob", department: "Development", tasks: 18, performance: 85 },
  { name: "Charlie", department: "Sales", tasks: 15, performance: 70 },
];

// DOM Elements
const employeeBody = document.getElementById("employee-body");
const searchInput = document.getElementById("search");
const tasksCard = document.getElementById("tasks");
const hoursCard = document.getElementById("hours");
const performanceCard = document.getElementById("performance");

const empForm = document.getElementById("employee-form");
const empName = document.getElementById("emp-name");
const empDept = document.getElementById("emp-dept");
const empTasks = document.getElementById("emp-tasks");
const empPerformance = document.getElementById("emp-performance");

// Render Table
function renderTable(data) {
  employeeBody.innerHTML = "";
  data.forEach(emp => {
    const tr = document.createElement("tr");

    // Color row based on performance
    if(emp.performance >= 90){
      tr.style.background = "linear-gradient(90deg, #43cea2, #185a9d)";
      tr.style.color = "#fff";
    } else if(emp.performance >= 75){
      tr.style.background = "linear-gradient(90deg, #f7971e, #ffd200)";
      tr.style.color = "#000";
    } else {
      tr.style.background = "linear-gradient(90deg, #ff5f6d, #ffc371)";
      tr.style.color = "#000";
    }

    tr.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.department}</td>
      <td>${emp.tasks}</td>
      <td>${emp.performance}</td>
    `;
    employeeBody.appendChild(tr);
  });
  updateMetrics(data);
  updateChart(data);
}

// Update Metrics
function updateMetrics(data){
  const totalTasks = data.reduce((sum, emp) => sum + emp.tasks,0);
  const avgHours = data.length * 8;
  const avgPerformance = Math.round(data.reduce((sum, emp)=>sum+emp.performance,0)/data.length);

  tasksCard.textContent = totalTasks;
  hoursCard.textContent = avgHours;
  performanceCard.textContent = avgPerformance + "%";
}

// Search
searchInput.addEventListener("input",()=>{
  const term = searchInput.value.toLowerCase();
  const filtered = employees.filter(emp => emp.name.toLowerCase().includes(term));
  renderTable(filtered);
});

// Add Employee
empForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  const newEmp = {
    name: empName.value.trim(),
    department: empDept.value.trim(),
    tasks: parseInt(empTasks.value),
    performance: parseInt(empPerformance.value)
  };
  employees.push(newEmp);
  renderTable(employees);
  empForm.reset();
});

// Chart.js
const ctx = document.getElementById("productivityChart").getContext("2d");
const productivityChart = new Chart(ctx,{
  type:"bar",
  data:{
    labels: employees.map(emp=>emp.name),
    datasets:[{
      label:"Tasks Completed",
      data: employees.map(emp=>emp.tasks),
      backgroundColor: employees.map(emp=>{
        if(emp.performance>=90) return "#43cea2";
        if(emp.performance>=75) return "#f7971e";
        return "#ff5f6d";
      })
    }]
  },
  options:{responsive:true, plugins:{legend:{display:false}}}
});

// Update Chart
function updateChart(data){
  productivityChart.data.labels = data.map(emp=>emp.name);
  productivityChart.data.datasets[0].data = data.map(emp=>emp.tasks);
  productivityChart.data.datasets[0].backgroundColor = data.map(emp=>{
    if(emp.performance>=90) return "#43cea2";
    if(emp.performance>=75) return "#f7971e";
    return "#ff5f6d";
  });
  productivityChart.update();
}

// Initial Render
renderTable(employees);
