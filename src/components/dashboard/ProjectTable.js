import Image from "next/image";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import Moment from "moment";

const ReservationsTable = ({ reservations }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Réservations</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Toutes les réservations de mon restaurant
        </CardSubtitle>
        <div className="table-responsive">
          <Table className="text-nowrap mt-3 align-middle" borderless>
            <thead>
              <tr>
                <th>Nom du client</th>
                <th>Date</th>

                <th>Heure</th>
                <th>Places</th>
                <th>Téléphone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {reservations ? (
                reservations.map((tdata, index) => (
                  <tr key={index} className="border-top">
                    <td>
                      <div className="d-flex align-items-center p-2">
                        {/* <Image
                        src={tdata.emailClient}
                        className="rounded-circle"
                        alt="avatar"Z
                        width="45"
                        height="45"
                      /> */}
                        <div className="ms-3">
                          <h6 className="mb-0">{tdata.nomduClient}</h6>
                          <span className="text-muted">
                            {tdata.prenomClient}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{Moment(tdata.date).format("Do MMMM YYYY")}</td>
                    <td> {Moment(tdata.date).format("hh:mm:ss A")}</td>
                    <td>{tdata.nbrePlaces}</td>
                    <td>{tdata.phoneNumber}</td>
                    <td>{tdata.emailClient}</td>
                  </tr>
                ))
              ) : (
                <Image
                  src="/spinner.gif"
                  width={800}
                  height={500}
                  alt="loader"
                />
              )}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default ReservationsTable;
