import React, { useState } from "react";
import Navbar from "../pages/Navbar";
import "../functionality/Team.css";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

function Team() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Devon Lane",
      date: "2024-12-25",
      salary: "$2,540.00",
      day: "Wednesday",
      image: "https://wallpapercave.com/wp/wp7479006.jpg",
    },
    {
      id: 2,
      name: "Courtney Henry",
      date: "2024-12-26",
      salary: "$3,100.00",
      day: "Thursday",
      image: "https://w0.peakpx.com/wallpaper/479/722/HD-wallpaper-ms-dhoni-india-world-cup-cricket.jpg",
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [viewingEmployee, setViewingEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    date: "",
    salary: "",
    day: "",
  });

  const toggleAddForm = () => {
    setIsAdding(!isAdding);
    setNewEmployee({
      name: "",
      date: "",
      salary: "",
      day: "",
    });
    setImagePreview(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const newId = employees.length ? employees[employees.length - 1].id + 1 : 1;
    setEmployees([...employees, { id: newId, ...newEmployee, image: imagePreview }]);
    toggleAddForm();
  };

  const handleView = (employee) => {
    setViewingEmployee(employee);
    setIsViewing(true);
  };

  const handleRemove = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  const handleUpdate = (employee) => {
    setEditingEmployee(employee);
    setImagePreview(employee.image); // Preserve the current image
    setIsEditing(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const updatedEmployees = employees.map((employee) =>
      employee.id === editingEmployee.id
        ? { ...editingEmployee, image: imagePreview || editingEmployee.image }
        : employee
    );
    setEmployees(updatedEmployees);
    setIsEditing(false);
    setEditingEmployee(null);
    setImagePreview(null); // Clear preview after saving
  };

  const closeViewPopup = () => {
    setIsViewing(false);
    setViewingEmployee(null);
  };

  const closeEditPopup = () => {
    setIsEditing(false);
    setEditingEmployee(null);
    setImagePreview(null);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingEmployee((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <Navbar />
      <h1>Team Members</h1>
      <button className="add-employee-btn" onClick={toggleAddForm}>
        Add Employee
      </button>

      {isAdding && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Employee</h2>
            <form onSubmit={handleAddEmployee}>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={newEmployee.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="date"
                name="date"
                value={newEmployee.date}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="salary"
                placeholder="Enter Salary"
                value={newEmployee.salary}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="day"
                placeholder="Enter Day"
                value={newEmployee.day}
                onChange={handleInputChange}
                required
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" className="preview-img" />
                </div>
              )}
              <div className="modal-actions">
                <button type="submit" className="submit-btn">
                  Add Employee
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={toggleAddForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isViewing && (
        <div className="modal">
          <div className="modal-content">
            <h2>Employee Details</h2>
            <div>
              <img
                src={viewingEmployee.image}
                alt={`${viewingEmployee.name}`}
                className="employee-image"
              />
              <p><strong>Name:</strong> {viewingEmployee.name}</p>
              <p><strong>Date:</strong> {viewingEmployee.date}</p>
              <p><strong>Salary:</strong> {viewingEmployee.salary}</p>
              <p><strong>Day:</strong> {viewingEmployee.day}</p>
            </div>
            <button onClick={closeViewPopup} className="close-btn">Close</button>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Employee</h2>
            <form onSubmit={handleUpdateSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={editingEmployee.name}
                onChange={handleEditInputChange}
                required
              />
              <input
                type="date"
                name="date"
                value={editingEmployee.date}
                onChange={handleEditInputChange}
                required
              />
              <input
                type="text"
                name="salary"
                placeholder="Enter Salary"
                value={editingEmployee.salary}
                onChange={handleEditInputChange}
                required
              />
              <input
                type="text"
                name="day"
                placeholder="Enter Day"
                value={editingEmployee.day}
                onChange={handleEditInputChange}
                required
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange} 
              />
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" className="preview-img" />
                </div>
              )}
              <div className="modal-actions">
                <button type="submit" className="submit-btn">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeEditPopup}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={isAdding || isEditing ? "table-disabled" : ""}>
        <table className="team-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Date</th>
              <th>Salary</th>
              <th>Day</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <img
                    src={employee.image}
                    alt={`${employee.name}`}
                    className="employee-image"
                  />
                </td>
                <td>{employee.name}</td>
                <td>{employee.date}</td>
                <td>{employee.salary}</td>
                <td>{employee.day}</td>
                <td>
                  <button
                    className="action-btn view-btn"
                    onClick={() => handleView(employee)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="action-btn update-btn"
                    onClick={() => handleUpdate(employee)}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="action-btn remove-btn"
                    onClick={() => handleRemove(employee.id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Team;
