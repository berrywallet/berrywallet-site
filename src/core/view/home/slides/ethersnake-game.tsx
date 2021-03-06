import React from 'react';
import cn from 'classnames';
import {ISlideProps} from '../utils';
import {Container, ContainerSlide, Topic} from '../../../ui';

export class EthersnakeGameSlide extends React.Component<ISlideProps> {
    public render(): JSX.Element {
        return (
            <Container>
                <ContainerSlide className={this.props.isActive ? '-is-active' : undefined}>
                    <Topic
                        topicTitle={<span>Play a Game and <br/>Win 1 Ethereum</span>}
                        subtitle={<span>
                            Don’t just take our word for it.<br/>
                            Download and check this shit out!
                        </span>}
                    />
                </ContainerSlide>

                <div className={cn('slide-sticky', {'-is-active': this.props.isActive})}>
                    <h1>Play a Game and <br/>Win 1 Ethereum</h1>
                </div>
            </Container>
        );
    }
}
