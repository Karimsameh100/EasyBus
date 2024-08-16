import React from "react";
import p1 from "../logo/aman.jpg";
import p2 from "../logo/مصاري.jpg";
import p3 from "../logo/fawry.jfif";
import p4 from "../logo/vodafon.jfif";
import p5 from "../logo/payment.jfif";
import p6 from "../logo/visa.jfif";
import p7 from "../logo/khales.jfif";
import "./navbar.css"; // تأكد من أن هذا الملف يحتوي على الأنماط الإضافية إذا لزم الأمر

const Payment = () => {
  return (
    <>
      <div style={{ height: "100vh" }}>
        <div
          style={{
            height: "90vh",
            backgroundColor: "white",
            marginTop: "30px",
            marginLeft: "5%", // استخدام النسب المئوية لتسهيل الاستجابة
            marginRight: "5%",
            borderRadius: "15px",
            padding: "20px", // إضافة padding لتوسيع المساحة الداخلية
          }}
        >
          <h1
            className="text-center"
            style={{
              color: "#003366",
              paddingTop: "80px",
            }}
          >
            Secure and Convenient Payment Methods
          </h1>
          <h4
            className="text-center"
            style={{ color: "#003366", marginTop: "5vh" }}
          >
            You can pay using
          </h4>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px", // تقليل المسافة بين الصور للتكيف مع الشاشات الصغيرة
              justifyContent: "center", // توسيط الصور أفقياً
              paddingTop: "20px", // تقليل المسافة بين النص والصور للتكيف مع الشاشات الصغيرة
            }}
          >
            <img
              src={p1}
              style={{ width: "120px", height: "auto" }} // تقليل عرض الصور للتكيف مع الشاشات الصغيرة
              alt="Payment method 1"
            />
            <img
              src={p2}
              style={{ width: "120px", height: "auto" }}
              alt="Payment method 2"
            />
            <img
              src={p3}
              style={{ width: "120px", height: "auto" }}
              alt="Payment method 3"
            />
            <img
              src={p4}
              style={{ width: "120px", height: "auto" }}
              alt="Payment method 4"
            />
            <img
              src={p5}
              style={{ width: "120px", height: "auto" }}
              alt="Payment method 5"
            />
            <img
              src={p6}
              style={{ width: "120px", height: "auto" }}
              alt="Payment method 6"
            />
            <img
              src={p7}
              style={{ width: "120px", height: "auto" }}
              alt="Payment method 7"
            />
          </div>

          <h1
            className="text-center"
            style={{ color: "#003366", marginTop: "8vh" }}
          >
            OR
          </h1>
          <h3
            className="text-center"
            style={{ color: "#003366", marginTop: "5vh" }}
          >
            Reserve your ticket at one of our stations
            <br />
            <button
              id="paymentBTN"
              type="button"
              className="btn btn-outline-light btn-center"
            >
              Find Station
            </button>
          </h3>
        </div>
      </div>
    </>
  );
};

export default Payment;
