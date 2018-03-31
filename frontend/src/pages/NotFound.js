import React from 'react';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.mainContent}>
      <p>Oops! Something went wrong.</p>
      <Link to="/">
        <Button color="primary" variant="raised">Return Home</Button>
      </Link>
    </div>
  )
}

const styles = {
  mainContent: {
    marginTop: 50,
    textAlign: 'center'
  }
}

export default NotFound;