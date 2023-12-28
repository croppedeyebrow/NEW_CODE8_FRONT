import React from "react";

const ModalComponent = ({ onConfirm, onCancel, children }) => {
  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    zIndex: "1000",
    display: "flex",
    flexDirection: "column",
    alignitems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    borderRadius: "10px", // 모서리를 둥글게 만듭니다.
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // 그림자를 추가합니다.
    width: "20rem", // 모달창의 너비를 조절합니다.
    height: "14rem", // 모달창의 높이를 조절합니다.
  };

  const overlayStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, .7)",
    zIndex: "1000",
  };

  return (
    <>
      <div style={overlayStyle} />
      <div style={modalStyle}>
        {children}
        {/* <button onClick={onConfirm}>확인</button>
        <button onClick={onCancel}>취소</button> */}
      </div>
    </>
  );
};

export default ModalComponent;
