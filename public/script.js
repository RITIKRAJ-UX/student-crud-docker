let editId = null;


// Add Student OR Update Student

async function saveStudent() {

    const name = document.getElementById("name").value;

    const age = document.getElementById("age").value;

    const course = document.getElementById("course").value;


    if (editId) {

        // UPDATE

        await fetch(`/students/${editId}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                name,

                age,

                course

            })

        });

        editId = null;

    }

    else {

        // CREATE

        await fetch("/students", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                name,

                age,

                course

            })

        });

    }


    clearFields();

    loadStudents();

}



// READ ALL STUDENTS

async function loadStudents() {

    const response = await fetch("/students");

    const students = await response.json();

    const table = document.getElementById("studentTable");


    table.innerHTML = "";


    students.forEach(student => {


        table.innerHTML += `

        <tr>

        <td>${student.id}</td>

        <td>${student.name}</td>

        <td>${student.age}</td>

        <td>${student.course}</td>

        <td>

        <button onclick="editStudent(

        ${student.id},

        '${student.name}',

        ${student.age},

        '${student.course}')">

        Edit

        </button>


        <button onclick="deleteStudent(${student.id})">

        Delete

        </button>

        </td>

        </tr>

        `;

    });

}



// EDIT STUDENT

function editStudent(id, name, age, course) {

    editId = id;

    document.getElementById("name").value = name;

    document.getElementById("age").value = age;

    document.getElementById("course").value = course;

}



// DELETE STUDENT

async function deleteStudent(id) {

    await fetch(`/students/${id}`, {

        method: "DELETE"

    });

    loadStudents();

}



// CLEAR INPUT BOXES

function clearFields() {

    document.getElementById("name").value = "";

    document.getElementById("age").value = "";

    document.getElementById("course").value = "";

}



// Load students when page opens

loadStudents();