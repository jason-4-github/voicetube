import React from 'react';
import { Card, Col, Button } from 'antd';
import TextEllipsis from 'react-text-ellipsis';

class VideoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCaptionsIndex: 0,
      imgWid: 300,
      imgHei: 240,
      imgMargin: '0px',
    }
    this.captionsClick = this.captionsClick.bind(this);
  }

  // control caption's click
  captionsClick = () => {
    const { videos } = this.props;
    const { currentCaptionsIndex } = this.state;
    const captionsCount = videos.captions.length;
    const nextIndex = currentCaptionsIndex < captionsCount - 1 ? currentCaptionsIndex + 1 : 0;

    this.setState({ currentCaptionsIndex : nextIndex })

  }
  render() {
    const { videos } = this.props;
    const { currentCaptionsIndex, imgWid, imgMargin, imgHei } = this.state;
    const captionsControl = {'cht':'中文', 'ja':'日文', 'vi':'越南文','en':'英文'};
    const levelControl = ['初級', '中級', '中高級', '高級'];
    const durationMinutes = parseInt(videos.duration / 60, 10);
    const durationSeconds = videos.duration % 60;
    const durationTotal = `${durationMinutes < 10 ? 0 : ''}${durationMinutes}:`+
      `${durationSeconds < 10 ? 0 : ''}${durationSeconds}`;
    return (
      <Card
        className="cards"
        style={{ minWidth: 300, width: 300, height: 386 }}
        hoverable
        onMouseOver={()=>{ this.setState({ imgWid: 330, imgHei: 264, imgMargin: '-15px' }) }}
        onMouseLeave={()=>{ this.setState({ imgWid: 300, imgHei: 240, imgMargin: '0px' }) }}
        cover={
          <div style={{ maxHeight: 240 }}>
            <img style={{ width: imgWid, height: imgHei, marginLeft: imgMargin }} alt="example" src={videos.thumbnail} />
            <div className="timeCube">{durationTotal}</div>
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
          <Button id="levelButton" type="primary">{levelControl[videos.level - 1]}</Button>
        </Col>
      </Card>
    );
  }
}

export default VideoCard ;