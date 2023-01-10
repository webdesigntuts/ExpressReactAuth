import React from "react";
import styles from "./NotFound.module.scss";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <span>404 This Page Doesn't Exist</span>
      <Link to='/'>Home</Link>
    </div>
  );
};

export default NotFound;
