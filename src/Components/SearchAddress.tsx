import React from "react";

interface propsSearchAddress {
  value: string;
  handleChange: Function;
  handleSend: Function;
}

const SearchAddress = ({
  value,
  handleChange,
  handleSend,
}: propsSearchAddress) => {
  return (
    <div className="row">
      <div className="col-12">
        <label className="form-label">Buscar Dirección</label>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon3">
            Dirección :
          </span>
          <input
            type="text"
            value={value}
            onChange={(event) => handleChange(event.target.value)}
            onKeyPress={(event) => {
              // Verificamos si di enter
              if (event.code === "Enter") {
                handleSend();
              }
            }}
          />
          <button
            className="input-group-text btn btn-primary"
            onClick={() => handleSend()}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export { SearchAddress };
