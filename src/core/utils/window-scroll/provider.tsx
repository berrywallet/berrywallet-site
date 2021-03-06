import React from 'react';
import PropTypes from 'prop-types';
import {WindowScrollService} from './service';

export interface IWindowScrollProviderProps {
    windowScrollService: WindowScrollService;
}

export interface IWindowScrollProviderChildContext {
    windowScrollService: WindowScrollService;
}

export class WindowScrollProvider extends React.Component<IWindowScrollProviderProps, object> {
    public static readonly propTypes: PropTypes.ValidationMap<object> = {
        windowScrollService: PropTypes.object.isRequired,
    };

    public static readonly childContextTypes: PropTypes.ValidationMap<object> = {
        windowScrollService: PropTypes.object.isRequired,
    };

    private readonly _windowScrollService: WindowScrollService;

    public constructor(props: IWindowScrollProviderProps) {
        super(props);
        this._windowScrollService = props.windowScrollService;
    }

    public getChildContext(): IWindowScrollProviderChildContext {
        return {
            windowScrollService: this._windowScrollService,
        };
    }

    public render(): JSX.Element {
        return React.Children.only(this.props.children);
    }
}
