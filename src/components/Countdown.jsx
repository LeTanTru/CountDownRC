import { useState, useEffect } from "react";
import "../assets/styles/style.css";
import logoReact from "../assets/images/logo-react.png";

const CountdownTimer = () => {
   const [date, setDate] = useState(new Date());
   const [day, setDay] = useState(0);
   const [hour, setHour] = useState(0);
   const [minute, setMinute] = useState(0);
   const [second, setSecond] = useState(0);
   const [isFocused, SetIsFocused] = useState(false);

   useEffect(() => {
      window.addEventListener("load", () => {
         const storedDate = localStorage.getItem("date");
         setDate(new Date(storedDate));
      });
   }, []);
   useEffect(() => {
      const interval = setInterval(() => {
         const currentDate = new Date();
         const comingDate = new Date(date);
         const difference = comingDate.getTime() - currentDate.getTime();

         if (difference <= 0) {
            clearInterval(interval); // Dừng interval khi comingDate <= currentDate
            setDay(0);
            setHour(0);
            setMinute(0);
            setSecond(0);
         } else {
            const day = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hour = Math.floor(
               (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minute = Math.floor(
               (difference % (1000 * 60 * 60)) / (1000 * 60)
            );
            const second = Math.floor((difference % (1000 * 60)) / 1000);

            setDay(day);
            setHour(hour);
            setMinute(minute);
            setSecond(second);
         }
      }, 1000);

      return () => clearInterval(interval);
   }, [date]);

   useEffect(() => {
      const colorInterval = setInterval(() => {
         const randomColorCode = () => Math.floor(Math.random() * 256);
         const randomColor = () =>
            `rgb(${randomColorCode()},${randomColorCode()},${randomColorCode()})`;

         document.documentElement.style.setProperty(
            "--countdown-color-day",
            randomColor()
         );

         document.documentElement.style.setProperty(
            "--countdown-color-hour",
            randomColor()
         );

         document.documentElement.style.setProperty(
            "--countdown-color-minute",
            randomColor()
         );

         document.documentElement.style.setProperty(
            "--countdown-color-second",
            randomColor()
         );
      }, 1000);

      return () => clearInterval(colorInterval);
   }, []);

   const isValidDate = (date) => {
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      return regex.test(date);
   };

   const handleSetDate = () => {
      const input = document.querySelector(".input-date");

      const date = input.value;

      if (!isValidDate(date)) {
         alert("Invalid date.\nFormat MM/dd/yyyy.");
         return;
      }
      setDate(date ? new Date(date) : new Date());
      localStorage.setItem("date", date);
      input.value = "";
   };

   const handleKeyDown = (e) => {
      if (e.key == "Enter") {
         handleSetDate();
      }
   };

   const handleOnBlur = () => {
      SetIsFocused(false);
   };

   return (
      <>
         <div className="wrapper">
            <img className="wrapper-image" src={logoReact} alt="error" />
         </div>
         <div className="countdown">
            <div
               className="countdown-css day"
               style={{ color: "var(--countdown-color-day)" }}
            >
               {day >= 0 && day < 10 ? `0${day}` : day}d
            </div>
            <div
               className="countdown-css hour"
               style={{ color: "var(--countdown-color-hour)" }}
            >
               {hour >= 0 && hour < 10 ? `0${hour}` : hour}h
            </div>
            <div
               className="countdown-css minute"
               style={{ color: "var(--countdown-color-minute)" }}
            >
               {minute >= 0 && minute < 10 ? `0${minute}` : minute}m
            </div>
            <div
               className="countdown-css second"
               style={{ color: "var(--countdown-color-second)" }}
            >
               {second >= 0 && second < 10 ? `0${second}` : second}s
            </div>
            <div className="input-area">
               <input
                  className="input-date"
                  autoFocus={isFocused}
                  type="text"
                  onKeyDown={handleKeyDown}
                  onBlur={handleOnBlur}
               />
               <p className="top-up-placeholder">Enter date (MM/dd/yyyy): </p>
               <button onClick={handleSetDate} className="btn-submit">
                  Submit
               </button>
            </div>
         </div>
      </>
   );
};

export default CountdownTimer;
