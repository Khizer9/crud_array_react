import React, { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import Employees from "./Array";

const ArrayTable = () => {
    const [deleteEmp, setDeleteEmp] = useState(Employees)
    const [editEmp, setEditEmp] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)

    const handleEdit = (id) => {
        const employeeToEdit = deleteEmp.find((employee) => employee.id === id)
        setEditEmp(employeeToEdit)
        setIsEditMode(true)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setEditEmp(null)
        setShowModal(false) 
    }

    const handleSaveEdit = () => {
        const updatedEmployee = [...deleteEmp]

        const editEmployeeIndex = updatedEmployee.findIndex((employee) => employee.id === editEmp.id)

        if(editEmployeeIndex !== -1){
            updatedEmployee[editEmployeeIndex] = editEmp

            setDeleteEmp(updatedEmployee)
            setEditEmp(null);
            setShowModal(false)
        }
    }

    const handleAdd = () => {
        setEditEmp(null)
        setIsEditMode(false)
        setShowModal(true)
    }

    const handleSave = () => {
        if(isEditMode){
            handleSaveEdit()
        }else{
            handleAddSave()
        }
    }

    const handleAddSave = () => {
        console.log(editEmp, "editEmp")
        if(editEmp){
            const newEmployee = {
                id: 5,
                name: editEmp.name,
                age: editEmp.age,
                designation: editEmp.designation
            }

            setDeleteEmp([...deleteEmp, newEmployee]);
            setEditEmp(null)
            setShowModal(false)

        }
    }

    const handleDelete = (id) => {
        const filteredEmployees = deleteEmp.filter((employee) => employee.id !== id);
        setDeleteEmp(filteredEmployees);
      };
    
  return (
    <div>
         <Button className="my-2" onClick={handleAdd}>Add</Button>
      <Table striped="columns">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deleteEmp.map((res) => (
            <tr key={res.id}>
              <td>{res.id}</td>
              <td>{res.name}</td>
              <td>{res.age}</td>
              <td>{res.designation}</td> 
              <td>
                <Button className="mx-2" onClick={()=> handleEdit(res.id)}>Edit</Button>
                {deleteEmp ? <Button onClick={()=> handleDelete(res.id)}>Delete</Button> : 'No data available'}
              </td> 
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? 'Edit Employee' : 'Add Employee'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
                <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control value={editEmp ? editEmp.name : ''} onChange={(e) => setEditEmp({...editEmp, name: e.target.value})} type="name" placeholder="Enter Your Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control value={editEmp ? editEmp.age : ''} onChange={(e)=> setEditEmp({...editEmp, age: e.target.value})} type="number" placeholder="Enter Your Age" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="designation">
                <Form.Label>Designation</Form.Label>
                <Form.Control value={editEmp ? editEmp.designation : ''} onChange={(e) => setEditEmp({...editEmp, designation: e.target.value})} type="designation" placeholder="Enter Your Designation" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {isEditMode ? 'Update' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ArrayTable;
