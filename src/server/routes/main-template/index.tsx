import React from 'react';
import serialize from 'serialize-javascript';
import fs from 'fs';
import path from 'path';
import {Helmet} from 'react-helmet';
import {config} from '../../config';

import {GTM} from '../../utils/gtm';
import {OpenGraph} from '../../utils/open-graph';

interface IProps {
    data?: any;
}

const gtmKey = config.get('app.gtmKey');
const gtmObserver = new GTM(gtmKey);

const criticalCSS: string = fs.readFileSync(
    path.resolve('dist/css/critical.css'),
    'utf-8'
);

export class MainTemplate extends React.Component<IProps> {

    protected readonly version: string;

    protected constructor(props: IProps) {
        super(props);

        this.version = process.env.npm_package_version as string;
    }

    protected renderApplication(): JSX.Element {
        const {children} = this.props;
        if (typeof children === 'string') {
            return <div id="app" dangerouslySetInnerHTML={{__html: children}}/>;
        }

        return <div id="app">{children}</div>;
    }

    protected static getCriticalCss(): string {
        try {
            return criticalCSS;
        } catch (error) {
            console.error('Cannot load Critical CSS', error);

            return '';
        }
    }

    protected renderStaticFiles(): JSX.Element {
        const mainCssAttribute = {
            href: `/css/main.css?v=${this.version}`,
            async: true,
            rel: 'stylesheet',
            type: 'text/css'
        };

        const mainJsAttribute = {
            src: `/main.bundle.js?v=${this.version}`,
            defer: true,
            async: true
        };

        return (
            <React.Fragment>
                <script {...mainJsAttribute}/>
                <link {...mainCssAttribute}/>
            </React.Fragment>
        );
    };

    public render(): JSX.Element {
        const {data = null} = this.props;

        const frontApplication = this.renderApplication();
        const helmet = Helmet.renderStatic();

        return (
            <html lang="en">
            <head>
                <meta httpEquiv="Content-type" content="text/html; charset=utf-8"/>
                <meta name="Content-language" content="en"/>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui"/>
                <meta name="format-detection" content="telephone=no"/>
                {helmet.title.toComponent()}
                {helmet.meta.toComponent()}

                <OpenGraph/>

                <style dangerouslySetInnerHTML={{__html: MainTemplate.getCriticalCss()}}/>
                <script dangerouslySetInnerHTML={{__html: `window.__INITIAL_DATA__=${serialize(data)};`}}
                        type="application/javascript"
                />
                <link rel="shortcut icon" type="image/png" href="/favicon.ico"/>
                <link rel="chrome-webstore-item"
                      href="https://chrome.google.com/webstore/detail/boidgcdefidhoojfljngigkjffbodjmn"/>

                {gtmObserver.renderHead()}
            </head>
            <body>
            {gtmObserver.renderBody()}
            {frontApplication}
            {this.renderStaticFiles()}
            </body>
            </html>
        );
    }
}
