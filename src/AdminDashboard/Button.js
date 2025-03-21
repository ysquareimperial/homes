import React from "react";

export default function Button({
  onClick,
  btnText,
  icon,
  style,
  loading,
  loadingText,
}) {
  return (
    <div>
      <button
        className="action-btn btnbtn shadow"
        style={style}
        onClick={onClick}
      >
        {loading ? (
          loadingText
        ) : (
          <>
            {icon} {btnText}
          </>
        )}
      </button>
    </div>
  );
}
