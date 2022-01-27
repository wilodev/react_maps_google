import { useRef, useState } from "react";
import { Color } from "../components/Color";
import Input from "../components/Input";
import Label from "../components/Label";
import TextArea from "../components/TextArea";

interface propsFormPolygon {
  handleForm: Function;
}
function FormPolygon({ handleForm }: propsFormPolygon) {
  // Se crea la referencia al Formulario
  const form = useRef<HTMLFormElement>(null);
  // Se crea el estado del color
  const [colorPolygon, setColorPolygon] = useState("#099ccc");
  // Se crea el evento que escucha el envio del formulario
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (form?.current) {
      const formData = new FormData(form.current);
      handleForm({
        polygonName: formData.get("polygonName"),
        polygonDescription: formData.get("polygonDescription"),
        polygonColor: formData.get("polygonColor"),
      });
    }
  };
  return (
    <form ref={form} onSubmit={handleSubmit}>
      <div className="mb-3 row">
        <Label title="Nombre Potrero" />
        <div className="col-sm-10">
          <Input inputName="polygonName" />
        </div>
      </div>
      <div className="mb-3 row">
        <Label title="Descripción del Potrero" />
        <div className="col-sm-10">
          <TextArea textAreaName="polygonDescription" />
        </div>
      </div>
      <div className="mb-3 row">
        <Label title="Seleccione el color del potrero" />
        <div className="col-sm-10">
          <Color
            inputName="polygonColor"
            color={colorPolygon}
            handleChangeColor={setColorPolygon}
          />
        </div>
      </div>
      <button type="button" onClick={handleSubmit} className="btn btn-success">
        Empezar a dibujar Polígono
      </button>
    </form>
  );
}

export default FormPolygon;
