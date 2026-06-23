const API_URL = "/api/students";
let editingId = null;

// ── On Page Load ────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  loadStudents();
});

// ── Fetch All Students ───────────────────────────────────────────────────────
async function loadStudents() {
  showLoading();

  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error("Server returned an error");
    }

    const students = await res.json();
    renderStudents(students);
    updateDashboard(students);
  } catch (err) {
    showErrorState();
  }
}

// ── Render Students Table ────────────────────────────────────────────────────
function renderStudents(students) {
  const tbody = document.getElementById("studentTableBody");
  const tableWrap = document.getElementById("tableWrap");
  const emptyState = document.getElementById("emptyState");
  const loadingState = document.getElementById("loadingState");
  const listCount = document.getElementById("listCount");

  loadingState.classList.add("hidden");

  listCount.textContent = students.length + " student" + (students.length !== 1 ? "s" : "");

  if (students.length === 0) {
    tableWrap.style.display = "none";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  tableWrap.style.display = "block";

  tbody.innerHTML = students.map((student, index) => `
    <tr id="row-${student._id}">
      <td class="td-num">${index + 1}</td>
      <td><strong>${escapeHtml(student.name)}</strong></td>
      <td>${escapeHtml(student.email)}</td>
      <td><span class="course-pill">${escapeHtml(student.course)}</span></td>
      <td class="td-date">${formatDate(student.createdAt)}</td>
      <td>
        <div class="td-actions">
          <button class="btn btn-edit" onclick="startEdit('${student._id}', '${escapeJs(student.name)}', '${escapeJs(student.email)}', '${escapeJs(student.course)}')">
            Edit
          </button>
          <button class="btn btn-delete" onclick="deleteStudent('${student._id}')">
            Delete
          </button>
        </div>
      </td>
    </tr>
  `).join("");
}

// ── Dashboard Stats ──────────────────────────────────────────────────────────
function updateDashboard(students) {
  document.getElementById("totalCount").textContent = students.length;

  const uniqueCourses = new Set(students.map(s => s.course.toLowerCase()));
  document.getElementById("courseCount").textContent = uniqueCourses.size;

  const today = new Date().toDateString();
  const addedToday = students.filter(s => new Date(s.createdAt).toDateString() === today);
  document.getElementById("todayCount").textContent = addedToday.length;
}

// ── Add or Update Student ────────────────────────────────────────────────────
async function submitForm() {
  const name   = document.getElementById("name").value.trim();
  const email  = document.getElementById("email").value.trim();
  const course = document.getElementById("course").value.trim();

  clearInputErrors();

  if (!name || !email || !course) {
    if (!name)   document.getElementById("name").classList.add("input-error");
    if (!email)  document.getElementById("email").classList.add("input-error");
    if (!course) document.getElementById("course").classList.add("input-error");
    showAlert("All fields are required.", "error");
    return;
  }

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = true;
  submitBtn.textContent = "Saving...";

  const body = JSON.stringify({ name, email, course });

  try {
    let res;

    if (editingId) {
      res = await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body,
      });
    } else {
      res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
    }

    const data = await res.json();

    if (!res.ok) {
      showAlert(data.message || "Something went wrong.", "error");
      return;
    }

    showAlert(editingId ? "✅ Student updated successfully!" : "✅ Student added successfully!", "success");
    cancelEdit();
    loadStudents();
  } catch (err) {
    showAlert("❌ Network error. Could not reach the server.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = editingId ? "Update Student" : "＋ Add Student";
  }
}

// ── Edit ─────────────────────────────────────────────────────────────────────
function startEdit(id, name, email, course) {
  editingId = id;

  document.getElementById("name").value   = name;
  document.getElementById("email").value  = email;
  document.getElementById("course").value = course;

  document.getElementById("formHeading").textContent = "Edit Student";
  document.getElementById("submitBtn").textContent   = "Update Student";
  document.getElementById("cancelBtn").style.display = "inline-block";
  document.getElementById("formSection").classList.add("edit-active");

  clearInputErrors();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function cancelEdit() {
  editingId = null;

  document.getElementById("name").value   = "";
  document.getElementById("email").value  = "";
  document.getElementById("course").value = "";

  document.getElementById("formHeading").textContent = "Add New Student";
  document.getElementById("submitBtn").textContent   = "＋ Add Student";
  document.getElementById("cancelBtn").style.display = "none";
  document.getElementById("formSection").classList.remove("edit-active");

  clearInputErrors();
}

// ── Delete ────────────────────────────────────────────────────────────────────
async function deleteStudent(id) {
  if (!confirm("Are you sure you want to delete this student?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      showAlert(data.message || "Delete failed.", "error");
      return;
    }

    showAlert("🗑️ Student deleted successfully.", "success");
    loadStudents();
  } catch (err) {
    showAlert("❌ Network error. Could not delete student.", "error");
  }
}

// ── UI Helpers ────────────────────────────────────────────────────────────────
function showAlert(message, type) {
  const alert = document.getElementById("alert");
  alert.textContent = message;
  alert.className = `alert ${type}`;
  setTimeout(() => {
    alert.className = "alert hidden";
  }, 4000);
}

function showLoading() {
  document.getElementById("loadingState").classList.remove("hidden");
  document.getElementById("emptyState").classList.add("hidden");
  document.getElementById("errorState").classList.add("hidden");
  document.getElementById("tableWrap").style.display = "none";
  document.getElementById("listCount").textContent = "Loading...";
}

function showErrorState() {
  document.getElementById("loadingState").classList.add("hidden");
  document.getElementById("errorState").classList.remove("hidden");
  document.getElementById("listCount").textContent = "Error";
}

function clearInputErrors() {
  document.getElementById("name").classList.remove("input-error");
  document.getElementById("email").classList.remove("input-error");
  document.getElementById("course").classList.remove("input-error");
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeJs(str) {
  return String(str).replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"');
}

// ── Enter Key Support ─────────────────────────────────────────────────────────
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.tagName === "INPUT") {
    submitForm();
  }
});
