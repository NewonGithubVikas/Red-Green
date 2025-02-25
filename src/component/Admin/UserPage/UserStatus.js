import React from 'react';

function UserStatus() {
  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="blockUserId" className="form-label">User ID</label>
          <input 
            type="text" 
            className="form-control" 
            id="blockUserId" 
            placeholder="Enter User ID" 
          />
        </div>
        <button type="submit" className="btn btn-danger mx-2">Block User</button>
        <button type="submit" className="btn btn-success mx-2">Unblock User</button>
        <button type="submit" className="btn btn-primary mx-2">Check User</button>
      </form>
    </div>
  );
}

export default UserStatus;
