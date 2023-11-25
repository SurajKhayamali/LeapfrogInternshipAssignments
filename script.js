// const assignment = {
//   name: "",
//   demoLink: "",
//   codeLink: "",
// };
// const assignment = {
//   name: "",
//   relativeFolderPath: "",
// };

const ROOT_URL_FOR_DEMO =
  "https://github.surajkhayamali.com.np/LeapfrogInternshipAssignments";
const ROOT_URL_FOR_CODE =
  "https://github.com/SurajKhayamali/LeapfrogInternshipAssignments";
const BRANCH_NAME = "main";

const assignments = [
  {
    name: "Assignment (HTML/CSS Basic Card) (Design to Code)",
    relativeFolderPath: "Week 1/Day 2/HTML CSS Assignment",
  },
  {
    name: "Assignment with responsive card (Design to Code)",
    relativeFolderPath:
      "Week 1/Day 2/Assignment with responsive card (Design to Code)",
  },
  {
    name: "Assignment with responsive design (More complex)(Design to Code)",
    relativeFolderPath: "Week 1/Day 3/scss-demo",
  },
  {
    name: "Landing Page Design to Code",
    relativeFolderPath: "Week 1/Day 4/Landing Page",
  },
];

const assignmentListTable = document.getElementById("assignment-list-table");
const tableBodyRef = assignmentListTable.getElementsByTagName("tbody")[0];

function addRowToTable(index, assignment) {
  const newRow = tableBodyRef.insertRow();
  const indexCell = newRow.insertCell(0);
  const nameCell = newRow.insertCell(1);
  const demoLinkCell = newRow.insertCell(2);
  const codeLinkCell = newRow.insertCell(3);

  const { name, relativeFolderPath } = assignment;
  indexCell.innerHTML = `<p>${index + 1}.</p>`;
  nameCell.innerHTML = `<p>${name}</p>`;
  demoLinkCell.innerHTML = `<a href="${ROOT_URL_FOR_DEMO}/${relativeFolderPath}" target="_blank">Demo</a>`;
  codeLinkCell.innerHTML = `<a href="${ROOT_URL_FOR_CODE}/tree/${BRANCH_NAME}/${relativeFolderPath}" target="_blank">Code</a>`;
}

const assignmentsCount = assignments.length;
for (let i = 0; i < assignmentsCount; i++) {
  addRowToTable(i, assignments[i]);
}

// const assignmentListItems = assignments.map((assignment) => {
//   const listItem = document.createElement("li");
//   const demoLink = document.createElement("a");
//   const codeLink = document.createElement("a");
//   demoLink.href = `${ROOT_URL_FOR_DEMO}/${assignment.relativeFolderPath}`;
//   demoLink.target = "_blank";
//   demoLink.innerText = "Demo";
//   codeLink.href = `${ROOT_URL_FOR_CODE}/${assignment.relativeFolderPath}`;
//   codeLink.target = "_blank";
//   codeLink.innerText = "Code";
//   listItem.innerText = assignment.name;
//   listItem.appendChild(demoLink);
//   listItem.appendChild(codeLink);
//   return listItem;
// });
