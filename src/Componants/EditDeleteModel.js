import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';

const EditTripModal = ({ trip, onClose, onUpdateTrip, formData, handleChange, handleSubmit }) => {
  return (
    <Modal id="edit-trip-modal" show={true} onHide={onClose}>
      <ModalHeader closeButton>
        <ModalTitle>Edit Trip</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <form id="edit-trip-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Trip Number:</label>
            <input
              type="text"
              name="tripNumber"
              value={formData.tripNumber}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Trip Date:</label>
            <input
              type="date"
              name="tripDate"
              value={formData.tripDate}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Available Places:</label>
            <input
              type="number"
              name="availablePlaces"
              value={formData.availablePlaces}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Departure Station:</label>
            <input
              type="text"
              name="departureStation"
              value={formData.departureStation}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Arrived Station:</label>
            <input
              type="text"
              name="arrivedStation"
              value={formData.arrivedStation}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Departure Time:</label>
            <input
              type="time"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Arrived Time:</label>
            <input
              type="time"
              name="arrivedTime"
              value={formData.arrivedTime}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </form>
      </ModalBody>
    </Modal>
  );
};

const DeleteTripModal = ({ trip, onClose, onDeleteTrip, confirmDelete, cancelDelete }) => {
  return (
    <Modal id="delete-trip-modal" show={true} onHide={onClose}>
      <ModalHeader closeButton>
        <ModalTitle>Delete Trip</ModalTitle>
      </ModalHeader>
      <ModalBody>
        Are you sure you want to delete this trip?
      </ModalBody>
      <ModalFooter>
        <button type="button" className="btn btn-danger" onClick={confirmDelete}>
          Delete
        </button>
        <button type="button" className="btn btn-secondary" onClick={cancelDelete}>
          Cancel
        </button>
      </ModalFooter>
    </Modal>
  );
};

export { EditTripModal, DeleteTripModal };