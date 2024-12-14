import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {

  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [City, setCity] = useState('');
  const [Salary, setSalary] = useState('');
  const [Designation, setDesignation] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const storedEmp = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmp);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Name || !Email || !Password || !City || !Salary || !Designation) {
      alert('All fields required!');
      return;
    }

    const newEmployee = {
      id: employees.length + 1,
      name: Name,
      email: Email,
      password: Password,
      city: City,
      salary: Salary,
      designation: Designation,
    };

    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));

    setName('');
    setEmail('');
    setPassword('');
    setCity('');
    setSalary('');
    setDesignation('');
  };

  const handleDelete = (id) => {
    const updatedEmployees = employees.filter((emp) => emp.id !== id);
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  const handleUpdate = (id) => {
    const employeeToEdit = employees.find((emp) => emp.id === id);
    setName(employeeToEdit.name);
    setEmail(employeeToEdit.email);
    setPassword(employeeToEdit.password);
    setCity(employeeToEdit.city);
    setSalary(employeeToEdit.salary);
    setDesignation(employeeToEdit.designation);
    handleDelete(id);
  };

  return (
    <div className="container">
      <h2>Employee Management System With LocalStorage</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="emp_name" className="form-label">Employee Name</label>
          <input
            type="text"
            id="emp_name"
            className="form-control"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="emp_email" className="form-label">Employee Email</label>
          <input
            type="email"
            id="emp_email"
            className="form-control"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="emp_password" className="form-label">Employee Password</label>
          <input
            type="password"
            id="emp_password"
            className="form-control"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="emp_city" className="form-label">City</label>
          <input
            type="text"
            id="emp_city"
            className="form-control"
            value={City}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="emp_salary" className="form-label">Salary</label>
          <input
            type="number"
            id="emp_salary"
            className="form-control"
            value={Salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="emp_designation" className="form-label">Designation</label>
          <input
            type="text"
            id="emp_designation"
            className="form-control"
            value={Designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {Name ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>

      <h3 className="mt-5">Employee Records</h3>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Salary</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.city}</td>
              <td>{employee.salary}</td>
              <td>{employee.designation}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleUpdate(employee.id)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;