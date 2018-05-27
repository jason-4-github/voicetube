import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Row, Col, Radio } from 'antd';

import VideoCards from './../component/VideoCard';
import { fetchVideoApi } from './../actions';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderRadio: 'publish',
      timeRadio: 'default',
    };

    // call api as loading page first time
    const { fetchVideoApi } = this.props;
    fetchVideoApi();

    this.orderRadioOnChange = this.orderRadioOnChange.bind(this);
    this.timeRadioOnChange = this.timeRadioOnChange.bind(this);
  }
  displayVideoLists = (data) => {
    // default order
    const { orderRadio, timeRadio } = this.state;
    let processedData = _.orderBy(data, [orderRadio], ['asc', 'desc'] ).reverse();

    const videoLists = [];
    const cardWid = 300;
    const screenWid = window.innerWidth;
    const countsOnRow = parseInt(screenWid / cardWid, 10) - (((screenWid / cardWid) -parseInt(screenWid / cardWid, 10))> 0.4 ? 0 : 1)
    const cuttingOnRow = 24 / countsOnRow;
    let cardPaddingPx = (screenWid - (20 * 2) - (300 * parseInt(screenWid / cardWid, 10))) / (2 * parseInt(screenWid / cardWid, 10));
    cardPaddingPx = cardPaddingPx >= 10 ? cardPaddingPx : 10;
    console.log((screenWid / cardWid));
    _.map(processedData, (value, index) => {

      // setting conditions of filter types
      if(timeRadio === 'fourMinutes' && value.duration >= 300) return;
      else if(timeRadio === 'tenMinutes' && (value.duration >= 600 || value.duration < 300)) return;
      else if(timeRadio === 'overTenMinutes' && value.duration < 600) return;

      videoLists.push(
        <Col key={value.id} style={{ textAlign: 'center', padding: `5px ${cardPaddingPx}px` }} span={cuttingOnRow}>
          <VideoCards key={`card${index}`} videos={value} />
        </Col>
      );
    });

    // if search nothing, show no result
    if(videoLists.length === 0 && timeRadio !== 'default') {
      return(<h2 style={{ textAlign: 'center' }}>沒有篩選結果</h2>);
    }

    return(videoLists);
  }

  // filter onchange function
  orderRadioOnChange(e) { this.setState({ orderRadio: e.target.value }); }
  timeRadioOnChange(e) { this.setState({ timeRadio: e.target.value }); }

  render() {
    const { orderRadio, timeRadio } = this.state;
    console.log(orderRadio, timeRadio)
    return(
      <Row id="homepage">
        <Row id="filterRow">
          <Col className="filterCol" xs={24} sm={24} md={10} lg={8} xl={8}>
            <RadioGroup
              key="orderRadio"
              onChange={this.orderRadioOnChange}
              value={orderRadio}
              defaultValue="a"
            >
            <b className="filterTitle">排序</b>
              <RadioButton value="publish">發佈時間</RadioButton>
              <RadioButton value="views">觀看次數</RadioButton>
              <RadioButton value="collectCount">收藏次數</RadioButton>
            </RadioGroup>
          </Col>
          <Col className="filterCol" xs={24} sm={24} md={14} lg={16} xl={16}>
            <RadioGroup
              key="timeRadio"
              onChange={this.timeRadioOnChange}
              value={timeRadio}
              defaultValue="a"
            >
              <b className="filterTitle">長度</b>
              <RadioButton value="default">不限</RadioButton>
              <RadioButton value="fourMinutes">4分鐘以下</RadioButton>
              <RadioButton value="tenMinutes">5-10分鐘</RadioButton>
              <RadioButton value="overTenMinutes">超過10分鐘</RadioButton>
            </RadioGroup>
          </Col>
          <Col span={24}>
            <hr style={{ width: '95%' }}/>
          </Col>
        </Row>
        <Row id="cardsRow">
          {this.displayVideoLists(this.props.videos)}
        </Row>
      </Row>
    );
  }
 }

const mapStateToProps = (state) => {
  return (
    { ...state.admin }
  );
};

export default connect(
  mapStateToProps,
  { fetchVideoApi },
)(Homepage);