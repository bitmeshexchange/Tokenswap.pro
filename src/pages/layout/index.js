'use stict';
import React, { Component } from 'react';
import { Link, Redirect } from 'dva/router';
import styles from './index.less';
import CustomIcon from 'components/icon';
import { jc } from 'src/common/utils';
import { withRouter } from 'dva/router';
import _ from 'i18n';
import Lang from 'components/lang';
import { menu } from 'config';

@withRouter
export default class Layout extends Component {
    constructor(props) {
        super(props);
        const hash = window.location.hash.substr(2);
        let currentMenu = menu[0].key;
        menu.forEach(item => {
            if (item.key === hash) {
                currentMenu = item.key
            }
        })
        if (hash === 'agreement' || hash === 'article') {
            currentMenu = '';
        }
        this.state = {
            currentMenu
        }
    }
    componentDidMount() {
        const key = this.props.match.path.substr(1)
        this.scrollto(key)
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
    }

    scrollto = (anchor) => {
        let anchorElement = document.getElementById(anchor);
        if (anchorElement) {
            window.scrollTo(0, anchorElement.offsetTop - 90);
        }
        else {
            window.scrollTo(0, 0);
        }
    }
    gotoPage = (anchor) => {
        this.props.history.push(`/${anchor}`);
        // this.scrollto(anchor)
    }
    render() {

        const { currentMenu } = this.state;
        return (<section className={styles.container}>
            <header className={styles.header}>
                <div className={styles.header_inner}>
                    <div className={styles.logo}><CustomIcon type="iconhorizontallogo" /></div>
                    <div className={styles.menu}>
                        {menu.map(item => {
                            let cls = jc(styles.menu_item, styles[`menu_item_${item.key}`]);
                            if (item.key === currentMenu) {
                                cls = jc(styles.menu_item, styles.menu_item_selected, styles[`menu_item_${item.key}`]);
                            }
                            if (item.url) {
                                return <a href={item.url} target='_blank' className={cls} key={item.key}>{item.label}</a>
                            }
                            return <span className={cls} onClick={() => this.gotoPage(item.key)} key={item.key}>{item.label}</span>
                        })}
                        <Lang style={{ fontSize: 14, cursor: 'pointer', minWidth: 75, marginLeft: 30 }} />
                    </div>
                </div>
            </header>
            {this.props.children}
            <footer className={styles.footer}>
                <div className={styles.footer_base}>
                    <span className={styles.logo}><CustomIcon type="iconhorizontallogo" /></span>
                    <span className={styles.line}>|</span>
                    <span className={styles.footer_title}>{_('footer_title')}</span>
                    <span className={styles.links}>
                        <span><a href='https://twitter.com/Voltfinance' target='_blank'><CustomIcon type='iconicon-twitter' style={{ color: '#fff', marginLeft: 12 }} /></a></span>
                        <span style={{ marginLeft: 10 }}><a href='https://t.me/volt_id' target='_blank'><CustomIcon type='iconicon-telegram' style={{ color: '#fff', marginLeft: 12 }} /></a></span>
                        
                        <span style={{ marginLeft: 23 }} className={styles.support}>{_('support')}:  support@volt.id</span>
                        <span className={styles.contact}>{_('contact')}:  contact@volt.id</span>
                    </span>
                    <span className={styles.privacy_policy}>
                        <Link style={{ marginLeft: 30 }} to='/agreement'>{_('privacy_policy')}</Link>
                        <span className={styles.line1}>|</span>
                        <span>©2020 Volt</span>
                    </span>
                </div>

            </footer>
        </section>)
    }
};