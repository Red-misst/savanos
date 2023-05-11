import styles from "./styles.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import ShippingInput from "@/components/inputs/shippingInput";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

// import SingularSelect from "@/components/selects/SingularSelect";
import {
  changeActiveAddress,
  deleteAddress,
  saveAddress,
} from "@/requests/user";
import { FaIdCard } from "react-icons/fa";
import { GiPhone } from "react-icons/gi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosRemoveCircleOutline } from "react-icons/io";
const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  area: "",
  residential: "",
  houseNumber: "",
};

export default function Shipping({ user, addresses, setAddresses, profile }) {
  const router = useRouter();
  const [shipping, setShipping] = useState(initialValues);
  const [visible, setVisible] = useState(user?.address.length ? false : true);
  const { firstName, lastName, phoneNumber, area, residential, houseNumber } =
    shipping;
  const validate = Yup.object({
    firstName: Yup.string()
      .required("First name is required.")
      .min(3, "First name must be atleast 3 characters long.")
      .max(20, "First name must be less than 20 characters long."),
    lastName: Yup.string()
      .required("Last name is required.")
      .min(3, "Last name must be atleast 3 characters long.")
      .max(20, "Last name must be less than 20 characters long."),
    phoneNumber: Yup.string()
      .required("Phone number is required.")
      .min(10, "Phone number must be atleast 10 characters long.")
      .max(15, "Phone number must be less than 15 characters long."),
    area: Yup.string()
      .required("Area name is required.")
      .min(2, "Area name should contain 2-60 characters..")
      .max(60, "Area name should contain 2-60 characters."),
    residential: Yup.string()
      .required("Residential is required.")
      .min(2, "Residential should contain 2-60 characters.")
      .max(60, "Residential should contain 2-60 characters."),
    roomNumber: Yup.string()
      .required("room/house is required.")
      .min(2, "room/house should contain 2-30 characters..")
      .max(30, "room/house should contain 2-30 characters."),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
    console.log();
  };
  const saveShippingHandler = async () => {
   console.log(shipping)
    const res = await saveAddress(shipping );
    setAddresses(addresses =>[...addresses, shipping]);
  };
  const changeActiveHandler = async (id) => {
    const res = await changeActiveAddress(id);
    router.refresh();
  };
  const deleteHandler = async (id) => {
    const res = await deleteAddress(id);
    console.log(res)
    setAddresses(addresses =>[...addresses, shipping]);
  };
  return (
    <div className={styles.shipping}>
      {!profile && (
        <div className={styles.header}>
          <h3>Shipping Informations</h3>
        </div>
      )}
      <div className={styles.addresses}>
        {addresses.map((address) => (
          <div style={{ position: "relative" }}>
            <div
              className={styles.address__delete}
              onClick={() => deleteHandler(address._id)}
            >
              <IoIosRemoveCircleOutline />
            </div>
            <div
              className={`${styles.address} ${address.active && styles.active}`}
              key={address._id}
              onClick={() => changeActiveHandler(address._id)}
            >
              <div className={styles.address__side}>
                <img src={profile ? user.user.image : user.image} alt="" />
              </div>
              <div className={styles.address__col}>
                <span>
                  <FaIdCard />
                  {address.firstName.toUpperCase()}{" "}
                  {address.lastName.toUpperCase()}
                </span>
                <span>
                  <GiPhone />
                  {address.phoneNumber}
                </span>
              </div>
              <div className={styles.address__col}>
                <span>
                  {address.area},{address.residential},{address.roomNumber}
                </span>
              </div>
              <span
                className={styles.active__text}
                style={{
                  display: `${!address.active && "none"}`,
                }}
              >
                Active
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className={styles.hide_show} onClick={() => setVisible(!visible)}>
        {visible ? (
          <span>
            <IoMdArrowDropupCircle style={{ fontSize: "2rem", fill: "#222" }} />
          </span>
        ) : (
          <span>
            ADD NEW ADDRESS <AiOutlinePlus />
          </span>
        )}
      </button>
      {visible && (
        <Formik
          enableReinitialize
          initialValues={{
            firstName,
            lastName,
            phoneNumber,
            area,
           residential,
            houseNumber,
          }}
          validator={()=>({validate})}
          
          onSubmit={shipping => {
            console.log(shipping)
            saveShippingHandler(shipping);
          }}
        >
          {(formik) => (
            <Form>
          
              <div className={styles.col}>
                <ShippingInput
                  name="firstName"
                  placeholder="*First Name"
                  onChange={handleChange}
                />
                <ShippingInput
                  name="lastName"
                  placeholder="*Last Name"
                  onChange={handleChange}
                />
              </div>
            
              <ShippingInput
                name="phoneNumber"
                placeholder="*Phone number"
                onChange={handleChange}
              />
              <ShippingInput
                name="area"
                placeholder="*Area"
                onChange={handleChange}
              />
              <ShippingInput
                name="residential"
                placeholder="*Residential"
                onChange={handleChange}
              />
              <ShippingInput
                name="houseNumber"
                placeholder="*House Number"
                onChange={handleChange}
              />
              <button type="submit">Save Address</button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
