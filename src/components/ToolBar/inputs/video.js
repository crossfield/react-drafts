import React, { PropTypes, Component } from 'react';
import Modal from '../../shared/modal';

class VideoInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      src: '',
      error: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(event) {
    const parser = new DOMParser();
    const html = parser.parseFromString(event.target.value, 'text/html');
    const iframe = html.getElementsByTagName('iframe')[0];

    if (!iframe || !iframe.getAttribute('src')) {
      this.setState({ error: "Please make sure that you're posting the full embed code." });
      return;
    }

    this.setState({
      src: iframe.getAttribute('src'),
      error: null
    });
  }

  handleConfirm() {
    // Need to parse out info we need from embed html
    const { src } = this.state;
    this.props.onAddVideo({ src });
  }

  handleCancel() {
    this.setState({
      src: '',
      error: null
    });
  }

  render() {
    const { src, error } = this.state;

    return (
      <Modal onCloseClick={this.props.onCloseClick}>
        <div className="csfd-content-editor__input video">
          {
            src ? ([
              <div key="preview" className="csfd-content-editor__input-preview">
                <iframe src={src} frameBorder="0" allowFullScreen={false} />
              </div>,
              <div key="controls" className="csfd-content-editor__input-controls">
                <button className="cancel" onClick={this.handleCancel}>Cancel</button>
                <button className="confirm" onClick={this.handleConfirm}>Add video</button>
              </div>
            ]) : (
              <div>
                <input
                  value={src}
                  placeholder="Paste video embed code (YouTube, etc)"
                  onChange={this.handleChange}
                />
                { error && <p className="input-error">{error}</p> }
              </div>
            )
          }
        </div>
      </Modal>
    );
  }
}

VideoInput.propTypes = {
  onAddVideo: PropTypes.func,
  onCloseClick: PropTypes.func
};

export default VideoInput;
