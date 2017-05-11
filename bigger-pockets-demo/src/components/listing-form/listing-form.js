import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button, Col } from 'react-bootstrap';
import './listing-form.css';

class ListingForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            url: ''
        }
    }
    isEnabled = () => {
        var patt = new RegExp(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/);
        var res = patt.test(this.state.url);
        return this.state.title.length > 0 && res;
    }
    validate = () => {
        return (this.isEnabled()) ? true: false
    }
    newBookmark = (e) => {
        e.stopPropagation();
        this.props.onCreate(this.state.title, this.state.url)
        this.setState({title: '', url: ''})
    }
    newName = (e) => {
        this.setState({title: e.target.value})
    }
    newUrl = (e) => {
        this.setState({url: e.target.value})
    }
    render() {
        return (
            <div>
                <header>
                    <h1>Listings</h1>
                </header>
                <Col md={6} mdOffset={3}  className="listing-form">
                    <Form inline>
                        <Col md={10} xs={10}>
                            <FormGroup controlId="formInlineName">
                                {' '}
                                <FormControl type="text"
                                             placeholder="Name"
                                             value={this.state.title}
                                             onChange={this.newName}/>
                            </FormGroup>
                            {' '}
                            <FormGroup controlId="formInlineEmail">
                                {' '}
                                <FormControl type="url"
                                             placeholder="Url"
                                             value={this.state.url}
                                             onChange={this.newUrl}
                                             onBlur={this.validate}/>
                            </FormGroup>
                        </Col>
                    </Form>
                    <Col md={2} xs={2}>
                        <Button bsStyle="primary"
                                type="submit"
                                onClick={this.newBookmark}
                                disabled={!this.isEnabled()}>
                            Enter
                        </Button>
                    </Col>
                </Col>
            </div>
        )
    }
}
export default ListingForm;