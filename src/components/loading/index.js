'use strict';
import React, { Component } from 'react';
import { Spin, Icon } from 'antd';
import styles from './index.less';

export default class PageLoading extends Component {
  render() {
    return (<div className={styles.loading_container}>
      <Spin size="large" indicator={<Icon type="loading" style={{ fontSize: 40 }} spin />} />
    </div>);
  }
}
