import React, { Component } from 'react';
import { Glyphicon, Panel, Form, FormGroup, FormControl, Col, Modal, Button } from 'react-bootstrap';
import './bookmark.css';

class Bookmark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            title: this.props.title,
            url: this.props.url
        }
    }
    edit = () => {
        this.setState({editing: true});
    }
    delete = () => {
        this.props.onRemove(this.props.id)
    }
    save = () => {
        this.props.onChange(this.props.id, this.state.title, this.state.url)
        this.setState({editing: false})
    }
    updateInputName = (e) => {
        this.setState({
            title: e.target.value
        });
    }
    updateInputUrl = (e) => {
        this.setState({
            url: e.target.value
        });
    }
    renderDisplay = () => {
        return (
            <Col md={6} className="bookmark">
                <Panel>
                    <div className="pull-right edit-icons">
                        <Glyphicon glyph="pencil" onClick={this.edit}/>
                        <Glyphicon glyph="trash" onClick={this.delete} />
                    </div>
                    <div>
                    <h4>{this.state.title}</h4>
                    <p>{this.state.url}</p>
                    </div>
                </Panel>
            </Col>
        )
    }
    renderEdit = () => {
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Edit Bookmark</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <FormGroup controlId="formName">
                                {' '}
                                <FormControl type="text" onChange={this.updateInputName} value={this.state.title}/>
                            </FormGroup>
                            {' '}
                            <FormGroup controlId="formUrl">
                                {' '}
                                <FormControl type="url" onChange={this.updateInputUrl} value={this.state.url}/>
                            </FormGroup>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.save}>Save changes</Button>
                    </Modal.Footer>

                </Modal.Dialog>
            </div>
        )
    }
    render = () => {
        return (this.state.editing) ? this.renderEdit()
                                    : this.renderDisplay()
    }
}
export default Bookmark;