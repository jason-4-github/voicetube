import React from 'react';
import { Card, Col, Button } from 'antd';
import TextEllipsis from 'react-text-ellipsis';

class VideoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCaptionsIndex: 0,
    }
    this.captionsClick = this.captionsClick.bind(this);
  }
  captionsClick = () => {
    const { videos } = this.props;
    const { currentCaptionsIndex } = this.state;
    const captionsCount = videos.captions.length;
    const nextIndex = currentCaptionsIndex < captionsCount - 1 ? currentCaptionsIndex + 1 : 0;

    this.setState({ currentCaptionsIndex : nextIndex })

  }
  render() {
    const { videos } = this.props;
    const { currentCaptionsIndex } = this.state;
    const captionsControl = {'cht':'中文', 'ja':'日文', 'vi':'越南文','en':'英文'};
    const levelControl = ['初級', '中級', '中高級', '高級'];
    return (
      <Card
        hoverable
        style={{ minWidth: 300, width: 300, height: 370 }}
        cover={
          <div style={{ maxHeight: 240 }}>
            <img style={{ width: 300, height: 240 }} alt="example" src={videos.thumbnail} />
          </div>
        }
      >
        <Col span={24}>
          <TextEllipsis
            lines={2}
            tag={'p'}
            ellipsisChars={'...'}
          >
            {videos.title}
          </TextEllipsis>
        </Col>
        <Col span={8} style={{ display: 'flex' }}>
          <i className="material-icons">headset</i>
          {videos.views}
        </Col>
        <Col span={16}>
          <Button onClick={this.captionsClick} type="primary">{captionsControl[videos.captions[currentCaptionsIndex]]}</Button>
          <Button style={{ backgroundColor: '#0ee0b0', borderColor: '#0ee0b0' }}type="primary">{levelControl[videos.level - 1]}</Button>
        </Col>
      </Card>
    );
  }
}

export default VideoCard ;