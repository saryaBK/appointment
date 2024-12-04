import React, { useEffect, useState } from "react";
import Arabic from "../../assets/Language/arabic/ar.json";
import English from "../../assets/Language/english/en.json";

let lang = window.localStorage.getItem("lang");

export const ISRTL = lang === "ar" ? true : false;

const TransText = ({ id, default_message }) => {
  const [language, setLanguage] = useState();
  const [trans, setTrans] = useState([]);
  const Ar = Arabic;
  const En = English;
  // const texttrans = () => {
  //   return trans[id] || default_message;
  // };
  useEffect(() => {
    let lang = window.localStorage.getItem("lang") || null;
    if (lang && lang === "ar") {
      setTrans(Ar);
    } else if (lang && lang === "en") {
      setTrans(En);
    }
  }, []);

  return <>{trans[id] ? trans[id] : default_message}</>;
};

export default TransText;
