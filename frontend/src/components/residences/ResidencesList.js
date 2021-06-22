import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class ResidencesList extends Component {

    constructor(props) {
        super(props);
        this.state = {residences: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/residences')
            .then(response => response.json())
            .then(data => this.setState({residences: data}));
    }
    async remove(id) {
        await fetch(`/residences/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedResidences = [...this.state.residences].filter(i => i.id !== id);
            this.setState({residences: updatedResidences});
        });
    }
    render() {
        const {residences, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const residencesList = residences.map(residence => {
            return <tr key={residence.id}>
                <td style={{whiteSpace: 'nowrap'}}>{residence.zipCode}</td>
                <td>{residence.number}</td>
                <td>{residence.latitude}</td>
                <td>{residence.longitude}</td>
                <td>{residence.residentsNumber}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/residences/" + residence.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(residence.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/residences/new">Add Residence</Button>
                    </div>
                    <h3>Residences</h3>
                    <Table className="mt-4 text-center">
                        <thead>
                        <tr>
                            <th width="10%">Zip Code</th>
                            <th width="5%">Number</th>
                            <th width="25%">Latitude</th>
                            <th width="25%">Longitude</th>
                            <th width="5%" style={{whiteSpace: 'nowrap'}}>Residents Number</th>
                            <th width="30%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {residencesList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
export default ResidencesList;
