import React from "react";

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "Homme" ? "selected" : ""
          } `}
        >
          <span className="label-text">Homme</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "Homme"} // Coche la case si le genre sélectionné est "Homme"
            onChange={() => onCheckboxChange("Homme")} // Change le genre sélectionné lorsque la case est cochée
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "Femme" ? "selected" : ""
          }`}
        >
          <span className="label-text">Femme</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "Femme"} // Coche la case si le genre sélectionné est "Femme"
            onChange={() => onCheckboxChange("Femme")} // Change le genre sélectionné lorsque la case est cochée
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
