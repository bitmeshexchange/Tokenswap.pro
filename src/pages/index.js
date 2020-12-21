'use stict';
import React, { Component } from 'react';
import { Link, Redirect } from 'dva/router';
import _ from 'i18n';
import styles from './index.less';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (<div className={styles.container}>
            <div className={styles.logo}></div>
            <div className={styles.intro}>
                <div className={styles.title}>{_('home_title')}</div>
                <div className={styles.content}>{_('home_content')}</div>
                <div className={styles.twitter}>{_('twitter_url')}</div>
                <div className={styles.twitter}>{_('email')}</div>
            </div>

        </div>)
    }
};