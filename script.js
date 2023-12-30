// const assignment = {
//   name: "",
//   demoLink: "",
//   codeLink: "",
// };
// const assignment = {
//   name: "",
//   relativeFolderPath: "",
// };
// interface Assignment {
//   name: string;
//   relativeFolderPath: string;
//   codeFolderPath?: string;
//   omitDemoLink?: boolean;
// }

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
  {
    name: "ToDo App",
    relativeFolderPath: "Week 2/Day 2/ToDoApp/public",
    codeFolderPath: "Week 2/Day 2/ToDoApp",
  },
  {
    name: "Scatter Plot",
    relativeFolderPath: "Week 2/Day 3/ScatterPlot",
  },
  {
    name: "Bouncing Ball",
    relativeFolderPath: "Week 2/Day 3/BouncingBall",
  },
  {
    name: "Image Carousel",
    relativeFolderPath: "Week 2/Day 3/ImageCarousel",
  },
  {
    name: "Ball Collision",
    relativeFolderPath: "Week 2/Day 4/BallCollision",
  },
  {
    name: "Doodle Jump (Complex Game)",
    relativeFolderPath: "Week 2/Day 5/DoodleJump",
  },
  {
    name: "Chess (Major Project)",
    absoluteLinks: {
      demoLink: "https://chess.surajkhayamali.com.np/",
      codeLink: "https://github.com/SurajKhayamali/Chess",
    },
  },
  {
    name: "Todo App (TypeScript)",
    relativeFolderPath: "Week 5/Day 2/Tasker/dist",
    codeFolderPath: "Week 5/Day 2/Tasker",
  },
  {
    name: "Database Assignment 1",
    relativeFolderPath: "Week 6/Day 2/sql",
    omitDemoLink: true,
  },
  {
    name: "Database Assignment 2",
    relativeFolderPath: "Week 6/Day 4/Database assignment 2",
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

  const {
    name,
    relativeFolderPath,
    codeFolderPath,
    absoluteLinks,
    omitDemoLink,
  } = assignment;
  indexCell.innerHTML = `<p>${index + 1}.</p>`;
  nameCell.innerHTML = `<p>${name}</p>`;
  if (absoluteLinks) {
    const { demoLink, codeLink } = absoluteLinks;
    demoLinkCell.innerHTML = `<a href="${demoLink}" target="_blank">Demo</a>`;
    codeLinkCell.innerHTML = `<a href="${codeLink}" target="_blank">Code</a>`;
  } else {
    if (omitDemoLink) {
      demoLinkCell.innerHTML = `<p>-</p>`;
    } else {
      demoLinkCell.innerHTML = `<a href="${ROOT_URL_FOR_DEMO}/${relativeFolderPath}" target="_blank">Demo</a>`;
    }
    codeLinkCell.innerHTML = `<a href="${ROOT_URL_FOR_CODE}/tree/${BRANCH_NAME}/${
      codeFolderPath ? codeFolderPath : relativeFolderPath
    }" target="_blank">Code</a>`;
  }
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
