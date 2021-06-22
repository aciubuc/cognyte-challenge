import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { AlgoliaProvider } from 'leaflet-geosearch';
import 'bootstrap/dist/css/bootstrap.min.css';

class ResidenceForm extends Component {

    emptyResidence = {
        zipCode: '',
        number: '',
        latitude: '',
        longitude: '',
        residentsNumber: ''
    };
    algoliaProvider = {};
    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyResidence,
            errors: {},
            geocodingString: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.algoliaProvider = new AlgoliaProvider();

    }
    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const residence = await (await fetch(`/residences/${this.props.match.params.id}`)).json();
            this.setState({item: residence});
        }
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }
    handleGeocodeStringChange = (event) => {
        this.setState({geocodingString: event.target.value});
    }
    handleGeocoding = async (event) => {
        try {
            const results = await this.algoliaProvider.search({ query: this.state.geocodingString });
            if(results && results.length > 0){
                //get the first suggestion result
                const firstSuggestion = results[0];
                if(firstSuggestion){
                    //use the spread operator for immutability
                    let suggestedResidence = {...this.state.item};
                    if(firstSuggestion.raw && firstSuggestion.raw.postcode && Array.isArray(firstSuggestion.raw.postcode)){
                        if(firstSuggestion.raw.postcode.length > 0){
                            suggestedResidence.zipCode = firstSuggestion.raw.postcode[0];
                        }
                    }
                    if(firstSuggestion.y){
                        suggestedResidence.latitude = firstSuggestion.y;
                    }
                    if(firstSuggestion.x){
                        suggestedResidence.longitude = firstSuggestion.x;
                    }
                    this.setState({item: suggestedResidence})
                }
            }
        } catch(err) {
            console.log(err)
        }
    }
    async handleSubmit(event) {
        event.preventDefault();
        if(this.handleValidation()){
            const {item} = this.state;

            await fetch('/residences' + (item.id ? '/' + item.id : ''), {
                method: (item.id) ? 'PUT' : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });
            this.props.history.push('/residences');
        }
    }
    handleValidation = () => {
        let fields = this.trimFields({...this.state.item});
        let errors = {};
        let formIsValid = true;

        //zipCode
        if(!fields.zipCode){
            formIsValid = false;
            errors["zipCode"] = "Can't be empty";
        }else if(!fields.zipCode.match(/^[a-zA-Z0-9]+$/)){
            formIsValid = false;
            errors["zipCode"] = "Only letters and numbers";
        }
        //number
        if(!fields.number){
            formIsValid = false;
            errors["number"] = "Can't be empty";
        }else if (!this.isPositiveInteger(fields.number) || !this.isNonZeroJavaInteger(fields.number)){
            errors["number"] = "Only positive numbers";
        }
        //latitude
        if(!fields.latitude){
            formIsValid = false;
            errors["latitude"] = "Can't be empty";
        }else if (!this.isLatitudeValid(fields.latitude)){
            errors["latitude"] = "Only valid latitude values between -90.0 and 90.0";
        }
        //longitude
        if(!fields.longitude){
            formIsValid = false;
            errors["longitude"] = "Can't be empty";
        }else if (!this.isLongitudeValid(fields.longitude)){
            errors["longitude"] = "Only valid longitude values between -180.0 and 180.0";
        }
        //residentsNumber
        if(!fields.residentsNumber){
            formIsValid = false;
            errors["residentsNumber"] = "Can't be empty";
        }else if (!this.isPositiveInteger(fields.residentsNumber) || !this.isNonZeroJavaInteger(fields.residentsNumber)){
            errors["residentsNumber"] = "Only positive numbers";
        }
        this.setState({errors: errors, item: fields});
        return formIsValid;
    }
    trimFields = (fields) => {
        try{
            if(fields){
                fields.zipCode = fields.zipCode ? fields.zipCode.trim() : '';
                fields.number = fields.number ? fields.number.trim() : '';
                fields.latitude = fields.latitude ? fields.latitude.trim() : '';
                fields.longitude = fields.longitude ? fields.longitude.trim() : '';
                fields.residentsNumber = fields.residentsNumber ? fields.residentsNumber.trim() : '';
            }
        }catch (err) {}
        return fields;
    }
    isPositiveInteger = (value) => {
        return /^\d+$/.test(value);
    }
    isNonZeroJavaInteger = (value) => {
        try{
            value = parseInt(value);
        }catch (err) {
            value = 0;
        }
        return value > 0 && value <= (Math.pow(2, 31) - 1)
    }
    isLatitudeValid = (value) => {
        let isValid = false;
        if(!isNaN(value)){
            const floatValue = parseFloat(value);
            if(floatValue > -90.0 && floatValue < 90.0){
                isValid = true;
            }
        }
        return isValid;
    }
    isLongitudeValid  = (value) => {
        let isValid = false;
        if(!isNaN(value)){
            const floatValue = parseFloat(value);
            if(floatValue > -180.0 && floatValue < 180.0){
                isValid = true;
            }
        }
        return isValid;
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Residence' : 'Add Residence'}</h2>;

        return (
            <div>
                <Container>
                    <section>
                        <h5>Geocode Helper</h5>
                        <Label for="geocodeField">Enter a query to geocode</Label>
                        <input type="text" name="geocodeField" id="geocodeField" onChange={this.handleGeocodeStringChange}/>{' '}
                        <button onClick={this.handleGeocoding} className="btn btn-primary">
                            Geocode
                        </button>
                    </section>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup className="col-md-7">
                            <Label for="zipCode">Zip Code</Label>
                            <div>
                            <Input type="text" name="zipCode" id="zipCode" value={item.zipCode || ''}
                                   onChange={this.handleChange} className="d-inline w-50"/>{' '}
                            {this.state.errors["zipCode"] ?
                                <span className="alert alert-danger d-inline p-2">{this.state.errors["zipCode"]}</span>
                                : ''
                            }
                            </div>
                        </FormGroup>
                        <FormGroup className="col-md-7">
                            <Label for="number">Number</Label>
                            <div>
                            <Input type="text" name="number" id="number" value={item.number || ''}
                                   onChange={this.handleChange} className="d-inline w-50"/>{' '}
                            {this.state.errors["number"] ?
                                <span className="alert alert-danger d-inline p-2">{this.state.errors["number"]}</span>
                                : ''
                            }
                            </div>
                        </FormGroup>
                        <FormGroup className="col-md-7">
                            <Label for="latitude">Latitude</Label>
                            <div>
                            <Input type="text" name="latitude" id="latitude" value={item.latitude || ''}
                                   onChange={this.handleChange} className="d-inline w-50"/>{' '}
                            {this.state.errors["latitude"] ?
                                <span className="alert alert-danger d-inline p-2">{this.state.errors["latitude"]}</span>
                                : ''
                            }
                            </div>
                        </FormGroup>
                        <FormGroup className="col-md-7">
                            <Label for="longitude">Longitude</Label>
                            <div>
                            <Input type="text" name="longitude" id="longitude" value={item.longitude || ''}
                                   onChange={this.handleChange} className="d-inline w-50"/>{' '}
                            {this.state.errors["longitude"] ?
                                <span className="alert alert-danger d-inline p-2">{this.state.errors["longitude"]}</span>
                                : ''
                            }
                            </div>
                        </FormGroup>
                        <FormGroup className="col-md-7">
                            <Label for="residentsNumber">Residents Number</Label>
                            <div>
                            <Input type="text" name="residentsNumber" id="residentsNumber" value={item.residentsNumber || ''}
                                   onChange={this.handleChange} className="d-inline w-50"/>{' '}
                            {this.state.errors["residentsNumber"] ?
                                <span className="alert alert-danger d-inline p-2">{this.state.errors["residentsNumber"]}</span>
                                : ''
                            }
                            </div>
                        </FormGroup>
                        <FormGroup className="col-md-7">
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/residences">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }
}
export default withRouter(ResidenceForm);
