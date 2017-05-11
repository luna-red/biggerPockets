import React from 'react'
import Bookmark from './components/bookmark/bookmark'
import ListingForm from './components/listing-form/listing-form'
import { Col } from 'react-bootstrap';
import {
    getListings,
    postListing,
    deleteListing,
    updateListing} from './services/fetch/fetch'
import './App.css'

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            bookmarks: [],
            title: '',
            url: ''
        };
    };
    componentDidMount = () => {
        getListings().then((json) => this.setState({bookmarks: json}));
    };
    eachBookmark = (bookmark) => {
        return (
            <Bookmark url={bookmark.attributes.url}
                      title={bookmark.attributes.title}
                      key={bookmark.id}
                      id={bookmark.id}
                      onChange={this.update.bind(this)}
                      onRemove={this.remove.bind(this)}></Bookmark>
        )
    };
    nextId = () => {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    };
    createBookmark = (newTitle, newUrl) => {
        let self = this;
        postListing(newTitle, newUrl).then((json) => {
            let bookmarks = [
                ...this.state.bookmarks,
                {
                    id: json.id,
                    attributes: {
                        title: json.attributes.title,
                        url: json.attributes.url
                    }
                }
            ];
            self.setState({bookmarks: bookmarks, title: '', url: ''});
        })
    };
    update = (id, newTitle, newUrl) => {
        let self = this;
        updateListing(id, newTitle, newUrl).then(json => {
            let bookmarks = this.state.bookmarks.map(
                bookmark => (bookmark.id !== id) ? bookmark
                    : {...bookmark, attributes: {title: newTitle, url: newUrl} }
            );
            self.setState({bookmarks: bookmarks});
        })
    };
    remove = (id) => {
        deleteListing(id);
        let bookmarks = this.state.bookmarks.filter((bookmark) => bookmark.id !== id);
        this.setState({bookmarks: bookmarks});
    };
    render() {
        return (
            <div>
                <ListingForm onCreate={this.createBookmark} title="this.state.title" url="this.state.url"></ListingForm>
                <Col xs={6} xsOffset={3} md={6} mdOffset={3}>
                    {this.state.bookmarks.map(this.eachBookmark)}
                </Col>
            </div>
        );
    }

}
export default App;
