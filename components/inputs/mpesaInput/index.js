import styles from "./styles.module.scss";
import { MdMobileScreenShare } from "react-icons/md";

import { ErrorMessage, useField } from "formik";

export default function MpesaInput({  placeholder, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div
      className={`${styles.input} ${
        meta.touched && meta.error ? styles.error : ""
      }`}
    >
     
        < MdMobileScreenShare />
    
      <input
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div className={styles.error_popup}>
          <span></span>
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  );
}
