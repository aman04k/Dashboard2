import React, { useState } from "react";
import ReactPaginate from "react-paginate";
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
    {
      id: 3,
      name: "Ronald Richards",
      date: "2024-12-27",
      salary: "$2,800.00",
      day: "Friday",
      image: "https://i.pinimg.com/originals/f3/04/e4/f304e4f2e3771ab866380746bf7e0d5d.jpg",
    },
  ]);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formMode, setFormMode] = useState(""); // "add" or "edit"
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    salary: "",
    day: "",
    image: null,
  });

  const [viewEmployee, setViewEmployee] = useState(null); // For viewing details
  const [pageNumber, setPageNumber] = useState(0);
  const employeesPerPage = 3;
  const pageVisited = pageNumber * employeesPerPage;

  const displayEmployees = employees.slice(
    pageVisited,
    pageVisited + employeesPerPage
  );

  const pageCount = Math.ceil(employees.length / employeesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      date: "",
      salary: "",
      day: "",
      image: null,
    });
    setImagePreview(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleAddClick = () => {
    resetForm();
    setFormMode("add");
    setIsFormVisible(true);
    setViewEmployee(null);
  };

  const handleEditClick = (employee) => {
    setFormData(employee);
    setImagePreview(employee.image);
    setFormMode("edit");
    setCurrentEmployee(employee);
    setIsFormVisible(true);
    setViewEmployee(null);
  };

  const handleViewClick = (employee) => {
    setViewEmployee(employee);
    setIsFormVisible(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formMode === "add") {
      const newId = employees.length ? employees[employees.length - 1].id + 1 : 1;
      setEmployees([
        { id: newId, ...formData, image: imagePreview || formData.image },
        ...employees, // Add the new employee at the top of the list
      ]);
    } else if (formMode === "edit") {
      setEmployees(
        employees.map((emp) =>
          emp.id === currentEmployee.id
            ? { ...currentEmployee, ...formData, image: imagePreview || currentEmployee.image }
            : emp
        )
      );
    }
    resetForm();
    setIsFormVisible(false);
    setFormMode("");
  };

  const handleRemove = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  return (
    <div>
      <Navbar />
      <h1>Team Members</h1>

      {!isFormVisible && !viewEmployee && (
        <>
          <button className="add-employee-btn" onClick={handleAddClick}>
            Add Employee
          </button>
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
              {displayEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <img
                      src={employee.image}
                      alt={employee.name}
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
                      onClick={() => handleViewClick(employee)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="action-btn update-btn"
                      onClick={() => handleEditClick(employee)}
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
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination-link"}
            nextLinkClassName={"pagination-link"}
            disabledClassName={"pagination-disabled"}
            activeClassName={"pagination-active"}
          />
        </>
      )}

      {viewEmployee && (
        <div className="view-employee">
          <h2>Employee Details</h2>
          <img
            src={viewEmployee.image}
            alt={viewEmployee.name}
            className="employee-image"
          />
          <p><strong>Name:</strong> {viewEmployee.name}</p>
          <p><strong>Date:</strong> {viewEmployee.date}</p>
          <p><strong>Salary:</strong> {viewEmployee.salary}</p>
          <p><strong>Day:</strong> {viewEmployee.day}</p>
          <button
            className="close-btn"
            onClick={() => setViewEmployee(null)}
          >
            Close
          </button>
        </div>
      )}

      {isFormVisible && (
        <div className="form-container">
          <h2>{formMode === "add" ? "Add Employee" : "Edit Employee"}</h2>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="salary"
              placeholder="Enter Salary"
              value={formData.salary}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="day"
              placeholder="Enter Day"
              value={formData.day}
              onChange={handleInputChange}
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
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {formMode === "add" ? "Add Employee" : "Save Changes"}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  resetForm();
                  setIsFormVisible(false);
                  setFormMode("");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Team;
