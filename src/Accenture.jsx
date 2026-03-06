import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const data = [
  {
    id: 1,
    solicitante: "Marco Ramos",
    sala: "Sala A",
    fecha: "2026-03-05",
    horaInicio: "10:00",
    horaFin: "11:00",
    motivo: "Reunion de seguimiento",
  },
  {
    id: 2,
    solicitante: "Fernanda Santana",
    sala: "Sala B",
    fecha: "2026-03-06",
    horaInicio: "12:00",
    horaFin: "13:00",
    motivo: "Entrevista",
  },
  {
    id: 3,
    solicitante: "Ulises",
    sala: "Sala C",
    fecha: "2026-03-07",
    horaInicio: "09:00",
    horaFin: "10:00",
    motivo: "Demo cliente",
  },
];

class Accenture extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      solicitante: "",
      sala: "",
      fecha: "",
      horaInicio: "",
      horaFin: "",
      motivo: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;

    arreglo.map((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador].solicitante = dato.solicitante;
        arreglo[contador].sala = dato.sala;
        arreglo[contador].fecha = dato.fecha;
        arreglo[contador].horaInicio = dato.horaInicio;
        arreglo[contador].horaFin = dato.horaFin;
        arreglo[contador].motivo = dato.motivo;
      }
      contador++;
      return null;
    });

    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm(
      "Estas seguro que deseas eliminar la reserva " + dato.id
    );

    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;

      arreglo.map((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
        return null;
      });

      this.setState({ data: arreglo });
    }
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;

    var lista = this.state.data;
    lista.push(valorNuevo);

    this.setState({ modalInsertar: false, data: lista });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <>
        <Container style={{ marginTop: "40px" }}>
          <h2 style={{ marginBottom: "25px", fontWeight: "700", color: "#5a2ea6" }}>
            Sistema de Reservas Accenture
          </h2>

          <Button
            color="success"
            size="lg"
            style={{ marginBottom: "20px" }}
            onClick={() => this.mostrarModalInsertar()}
          >
            Nueva Reserva
          </Button>

          <Table
            striped
            bordered
            hover
            responsive
            style={{
              background: "white",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
          >
            <thead
              style={{
                background: "linear-gradient(90deg,#6a11cb,#2575fc)",
                color: "white",
                fontWeight: "bold",
              }}
            >
              <tr>
                <th>ID</th>
                <th>Solicitante</th>
                <th>Sala</th>
                <th>Fecha</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Motivo</th>
                <th>Accion</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.solicitante}</td>
                  <td>{dato.sala}</td>
                  <td>{dato.fecha}</td>
                  <td>{dato.horaInicio}</td>
                  <td>{dato.horaFin}</td>
                  <td>{dato.motivo}</td>
                  <td>
                    <Button
                      color="info"
                      size="sm"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => this.eliminar(dato)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader>
              <div>
                <h3>Nueva Reserva</h3>
              </div>
            </ModalHeader>

            <ModalBody>
              <FormGroup>
                <label>ID</label>
                <input
                  className="form-control"
                  readOnly
                  value={this.state.data.length + 1}
                />
              </FormGroup>

              <FormGroup>
                <label>Solicitante</label>
                <input
                  className="form-control"
                  name="solicitante"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup>
                <label>Sala</label>
                <input
                  className="form-control"
                  name="sala"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup>
                <label>Fecha</label>
                <input
                  type="date"
                  className="form-control"
                  name="fecha"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup>
                <label>Hora inicio</label>
                <input
                  type="time"
                  className="form-control"
                  name="horaInicio"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup>
                <label>Hora fin</label>
                <input
                  type="time"
                  className="form-control"
                  name="horaFin"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup>
                <label>Motivo</label>
                <input
                  className="form-control"
                  name="motivo"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <Button color="primary" onClick={() => this.insertar()}>
                Insertar
              </Button>
              <Button color="danger" onClick={() => this.cerrarModalInsertar()}>
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.modalActualizar}>
            <ModalHeader>
              <div>
                <h3>Editar Reserva</h3>
              </div>
            </ModalHeader>

            <ModalBody>
              <FormGroup>
                <label>ID</label>
                <input
                  className="form-control"
                  readOnly
                  value={this.state.form.id}
                />
              </FormGroup>

              <FormGroup>
                <label>Solicitante</label>
                <input
                  className="form-control"
                  name="solicitante"
                  onChange={this.handleChange}
                  value={this.state.form.solicitante}
                />
              </FormGroup>

              <FormGroup>
                <label>Sala</label>
                <input
                  className="form-control"
                  name="sala"
                  onChange={this.handleChange}
                  value={this.state.form.sala}
                />
              </FormGroup>

              <FormGroup>
                <label>Fecha</label>
                <input
                  type="date"
                  className="form-control"
                  name="fecha"
                  onChange={this.handleChange}
                  value={this.state.form.fecha}
                />
              </FormGroup>

              <FormGroup>
                <label>Hora inicio</label>
                <input
                  type="time"
                  className="form-control"
                  name="horaInicio"
                  onChange={this.handleChange}
                  value={this.state.form.horaInicio}
                />
              </FormGroup>

              <FormGroup>
                <label>Hora fin</label>
                <input
                  type="time"
                  className="form-control"
                  name="horaFin"
                  onChange={this.handleChange}
                  value={this.state.form.horaFin}
                />
              </FormGroup>

              <FormGroup>
                <label>Motivo</label>
                <input
                  className="form-control"
                  name="motivo"
                  onChange={this.handleChange}
                  value={this.state.form.motivo}
                />
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <Button color="primary" onClick={() => this.editar(this.state.form)}>
                Editar
              </Button>
              <Button color="danger" onClick={() => this.cerrarModalActualizar()}>
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      </>
    );
  }
}

export default Accenture;